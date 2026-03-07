import EmailTemplateVerification from "@/emails/verification";
import { resend } from "../lib/resend";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "syedsaadaliaskari@gmail.com",
      subject: "Verification Email",
      react: <EmailTemplateVerification username={username} otp={verifyCode} />,
    });

    return { success: true, message: "Email sent successfully !" };
  } catch (emailError) {
    console.error("Error while sending the email", emailError);
    return { success: false, message: "Error while sending gmail" };
  }
}
