import { Message } from "@/src/model/User.model";
import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/model/User.model";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // 1. Safe JSON parsing
    const body = await request.json();
    const { content, username } = body;

    if (!content || !username) {
      return Response.json(
        { success: false, message: "Content and username are required" },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // 2. Check accepting status
    if (!user.isAcceptingMessages) {
      return Response.json(
        { success: false, message: "User is not accepting messages" },
        { status: 403 },
      );
    }

    if (!user.messages) {
      user.messages = [] as any;
    }

    // 3. Construct and Push message
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage as Message);

    // 4. Save with error logging
    await user.save();
    revalidatePath("/dashboard");

    return Response.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    // THIS IS THE MOST IMPORTANT PART:
    // It prints the ACTUAL error to your VS Code terminal
    console.error("Error in /api/send-message:", error.message);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message, // Sending error to frontend helps debugging
      },
      { status: 500 },
    );
  }
}
