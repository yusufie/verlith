import { createTransport } from "nodemailer";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import clientPromise from "@/utils/mongodb";

async function customizeAndSaveUser(user: any) {
    // Customize the user object here as needed
    const customizedUser = {
      ...user,
      username: `@${user.email.split("@")[0]}`, // Add "@" prefix to username
      tier: "gold", // Set a default tier if needed
      role: "user", // Set a default role if needed
    };
  
    try {
      const client = await clientPromise;
      const db = client.db();
  
      // Update or save the customized user to the database
      const updatedUser = await db.collection("users").updateOne(
        { email: user.email },
        { $set: customizedUser },
        { upsert: true } // Create a new user if not found
      );
  
      return updatedUser;
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }

export async function sendVerificationRequest(
	params: SendVerificationRequestParams
) {
	const { identifier, url, provider } = params;
	const { host } = new URL(url);

	const transport = createTransport(provider.server);

    try {
        // Implement a custom getUser function for the email provider
        const user = await getUserByEmail(identifier);
    
        if (!user) {
          throw new Error("User not found");
        }

        const result = await transport.sendMail({
            to: identifier,
            from: provider.from,
            subject: `Verlith - Verify your email`,
            text: text({ url, host }),
            html: html({ url }),
        });

        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
            throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }

        await customizeAndSaveUser(user); // Customize and save the user

        console.log("Verification email sent successfully.");
      } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
      }
}

function html(params: { url: string }) {
	const { url } = params;

	const color = {
		mailBg: "#fff",
		cardBg: "#000",
		primary: "#959595",
		accent: "#959595",
		text: "#fff",
	};

	return `
    <body style="background: ${color.mailBg}; margin: 0; padding: 0;">
        <div style="background: ${color.cardBg}; border: 2px solid ${color.primary}; max-width: 600px; margin: auto; border-radius: 10px; text-align: center;">

            <div style="padding: 20px 0;">
              <strong style="font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Sign in to Verlith</strong>
            </div>

            <div style="border-radius: 5px;" bgcolor="${color.cardBg}">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.text}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 2px solid ${color.accent}; display: inline-block; font-weight: bold;">
              Go to App
              </a>
            </div>

            <div style="padding: 10px 0px 20px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
              If you did not request this email you can safely ignore it.
            </div>

        </div>
    </body>
    `;
}

function text({ url, host }: { url: string; host: string }) {
	return `Sign in to ${host}\n${url}\n\n`;
}

// Implement a custom function to fetch the user by email
async function getUserByEmail(email: string) {
    // Implement logic to fetch user by email from your database
    // Example:
    // const client = await clientPromise;
    // const db = client.db();
    // const user = await db.collection("users").findOne({ email });
    // return user;
  
    // For now, return a dummy user as an example
    return {
      email,
      // Add other user properties as needed
    };
  }