import { UserModel } from "@/src/model/User.model";
import { sendVerificationEmail } from "@/src/utils/sendVerificationEmail";
import dbConnect from "@/src/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const verifiedUserByusename = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (verifiedUserByusename) {
      return Response.json(
        {
          success: true,
          message: "Use with this username is already exists ",
        },
        {
          status: 400,
        },
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 999999).toString();

    const verifiedUserByemail = await UserModel.findOne({
      email,
    });

    if (verifiedUserByemail) {
      if (verifiedUserByemail.isVerified) {
        return Response.json({
          success: false,
          message: "User with this email is already present",
        });
      } else {
        const hashedPassowrd = await bcrypt.hash(password, 10);

        verifiedUserByemail.password = hashedPassowrd;
        verifiedUserByemail.verifyCode = verifyCode;
        verifiedUserByemail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await verifiedUserByemail.save();
      }
    } else {
      const hashedPassowrd = await bcrypt.hash(password, 10);
      const expiryCode = new Date();
      expiryCode.setHours(expiryCode.getHours() + 1);

      const registeredUser = new UserModel({
        username,
        email,
        isVerified: false,
        password: hashedPassowrd,
        verifyCode: verifyCode,
        isAcceptingMessages: true,
        verifyCodeExpiry: expiryCode,
        messages: [],
      });

      await registeredUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      username,
      email,
      verifyCode,
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Email sent succesfully",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error while registering the user", error);

    return Response.json(
      {
        success: false,
        message: "Error while user is registered",
      },
      {
        status: 500,
      },
    );
  }
}
