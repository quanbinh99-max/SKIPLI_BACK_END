import { Router } from "express";
import { createNewAccessCode, getUserByPhoneNumber, reSendOtp, validateAccessCode } from "../controllers/authController.js";
import { findGithubUserProfile, getUserProfile, likeGithubUser, searchGithubUsers } from "../controllers/githubController.js";

const router = Router();

router.post("/create-new-access-code", createNewAccessCode);
router.post("/validate-access-code", validateAccessCode);
router.get("/resend-otp", reSendOtp);
router.get("/get-user-by-phone-number", getUserByPhoneNumber);
router.get("/search-github-users", searchGithubUsers);
router.get("/find-github-user-profile/:id", findGithubUserProfile);
router.post("/like-github-user", likeGithubUser);
router.get("/get-user-profile", getUserProfile);

export default router;