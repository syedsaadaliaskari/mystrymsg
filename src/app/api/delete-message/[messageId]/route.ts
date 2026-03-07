import { auth } from "@/src/auth";
import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/model/User.model";
import { User } from "next-auth";
import { NextRequest } from "next/server";

interface RouteContext {
  params: Promise<{ messageId: string }>;
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { messageId } = await context.params;
  await dbConnect();

  const session = await auth();
  const user = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized user",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const updatedUser = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } },
    );

    if (updatedUser.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
