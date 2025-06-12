import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API || "");

  try {
    const data = await resend.emails.send({
      from: "Luxora Finance-Manager <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("failed to sent email" ,error)
     return {success :false , error}
  }
}
