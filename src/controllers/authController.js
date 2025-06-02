import admin from "firebase-admin";
import { db } from "../dbs/index.js";
import { client, generateOTP } from "../utils/index.js";
export const createNewAccessCode = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    const message = await client.verify.v2.services(process.env.TWILIO_SERVICE)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' })
      .then(verification => console.log(verification.sid));

    await db.collection('users').doc(phoneNumber).set({
      verified: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
}

export const validateAccessCode = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE)
      .verificationChecks
      .create({ to: phoneNumber, code: otp });

    if (verificationCheck.status === 'approved') {
      await db.collection('users').doc(phoneNumber).set({
        verified: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP code'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: error.message
    });
  }
};

export const reSendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }
    await db.collection('users').doc(phoneNumber).update({
      otp: generateOTP(),
      expiryTime: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 5 * 60 * 1000)),
      verified: false,
    });

    const message = await client.verify.v2.services(process.env.TWILIO_SERVICE)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' })
      .then(verification => console.log(verification.sid));

    res.json({
      success: true,
      message: 'OTP sent successfully',
      messageSid: message.sid
    })
  } catch (error) {

  }
}

export const getUserByPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.query;
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }
    const userDoc = await db.collection('users').doc(phoneNumber).get();
    res.json(userDoc.data());
  } catch (error) {
    console.log(error)
  }
}