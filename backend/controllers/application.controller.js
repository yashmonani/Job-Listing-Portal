import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res) => {
    try {
        const UserId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required.",
                success: false
            })
        };
        //check if the user has alredy applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: UserId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have Already applied for this Job",
                success: false
            });
        }
        //check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        //create a new Application
        const newApplication = await Application.create({
            job:jobId,
            applicant:UserId
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        }) 
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) =>{
    try {
        const UserId = req.id;
        const application = await Application.find({applicant:UserId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No applications",
                success:false
            })
        };
        return res.status(200).json({
             application,
             success:true
        })
    } catch (error) {
        console.log(error);
    }
}
//Admin can see how many user have applied
export const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        });
        if(!job){
           return res.status(404).json({
                message:"Job not found",
                success:false
            })  
        };
        return res.status(200).json({
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
        
    }
}
export const  updateStatus = async (req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(404).json({
                message:"Status is required",
                success:false
            })  
        }
        //find the application by applicant id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}