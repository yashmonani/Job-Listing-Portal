

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminjobs, getALLJob, getJobById, postJob } from "../controllers/job.controller.js";
const router = express.Router();
router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getALLJob);
router.route("/getadminjobs").get(isAuthenticated,getAdminjobs);
router.route("/get/:id").get(isAuthenticated,getJobById);

export default router;