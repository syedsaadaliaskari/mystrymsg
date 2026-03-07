import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/model/User.model";

export async function POST(request: Request) {
  // 1. Ensure DB is connected first
  try {
    await dbConnect();
  } catch (dbError) {
    console.error("Database connection failed:", dbError);
    return Response.json(
      { success: false, message: "Database connection failed" },
      { status: 500 },
    );
  }

  try {
    // 2. Safely parse the body
    const body = await request.json().catch(() => null);
    if (!body || !body.username || !body.code) {
      return Response.json(
        { success: false, message: "Missing username or code" },
        { status: 400 },
      );
    }

    const { username, code } = body;
    const decodedUsername = decodeURIComponent(username);

    // 3. Find the user
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // 4. Check logic
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Use findOneAndUpdate to bypass potential "save()" middleware issues
      await UserModel.findOneAndUpdate(
        { username: decodedUsername },
        { isVerified: true },
      );

      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 },
      );
    }

    if (!isCodeNotExpired) {
      return Response.json(
        { success: false, message: "OTP expired, please sign up again!" },
        { status: 400 },
      );
    }

    return Response.json(
      { success: false, message: "Invalid verification code" },
      { status: 400 },
    );
  } catch (error: any) {
    // THIS LOG IS KEY: Check your VS Code terminal for this output!
    console.error("CRITICAL VERIFICATION ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        errorType: error.name,
        errorMessage: error.message,
      },
      { status: 500 },
    );
  }
}
