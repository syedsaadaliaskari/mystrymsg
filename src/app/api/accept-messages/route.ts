import { auth } from "@/src/auth";
import { config } from "../auth/[...nextAuth]/options";
import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/model/User.model";
import { User } from "next-auth";

export async function POST(request: Request) {
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

  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true },
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user",
        },
        {
          status: 500,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "User updated successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("unauthorized user pls login first");
    return Response.json(
      {
        success: false,
        message: "unauthorized user pls login first",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: Request) {
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

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
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
        message: "User is found and accepting the messages",
        isAcceptingMessages: foundUser.isAcceptingMessages,
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
