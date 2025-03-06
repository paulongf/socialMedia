import express from "express";
import { getComment } from "../controllers/comment.js";

const router = express.Router()

router.get("/find/:commentId", getComment )

export default router
