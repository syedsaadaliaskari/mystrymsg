import { auth } from "@/src/auth";
import { config } from "../auth/[...nextAuth]/options";
import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/model/User.model";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await auth();
  const user = session?.user as User;

  if (!session || !user?._id) {
    return Response.json(
      { success: false, message: "Not Authenticated or User ID missing" },
      { status: 401 },
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" }, // We only unwind if there ARE messages
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      const userExists = await UserModel.findById(userId);
      if (!userExists) {
        return Response.json(
          { success: false, message: "User not found" },
          { status: 404 },
        );
      }
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized user",
      },
      {
        status: 500,
      },
    );
  }
}
