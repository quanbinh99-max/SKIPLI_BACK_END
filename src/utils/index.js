import twilio from "twilio";
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);