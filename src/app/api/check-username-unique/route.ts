import { UserModel } from "@/src/model/User.model";
import z from "zod";
import dbConnect from "@/src/lib/dbConnect";
import { usernameValidation } from "@/src/schemas/signUpSchema";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const query = {
      username: searchParams.get("username"),
    };

    const result = usernameQuerySchema.safeParse(query);

    console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid username parameters",
        },
        {
          status: 401,
        },
      );
    }

    const { username } = result.data;

    const existedVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existedVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available and unique",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("Error checking username ");

    return Response.json(
      {
        success: false,
        message: "Error while checkng the username",
      },
      {
        status: 500,
      },
    );
  }
}
