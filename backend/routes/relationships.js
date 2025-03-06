import express from "express";
import { getRelationships } from "../controllers/relationship.js";

const router = express.Router()

router.get("/find/:likeId", getRelationships )


export default router