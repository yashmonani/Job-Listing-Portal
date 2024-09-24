import { UserContext } from "@/Store/user-store";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Badge } from "../Components/ui/badge";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

const JobDescription = () => {
  const { user, singleJob, setSingleJob } = useContext(UserContext);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log("Data Passing", res.data);
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        setSingleJob(updateSingleJob);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.respnose.data.message);
    }
  };
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        setSingleJob(res.data.job);
        setIsApplied(
          res.data.job.applications.some(
            (application) => application.applicant === user?._id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, user?._id]);
  return (
    <>
      <div className="description-section">
        <div className="description-head">
          <h1>{singleJob?.title}</h1>
          <h3>{singleJob?.company?.name}</h3>
          <div className="head-content">
            <div className="content">{singleJob?.position}</div>
            <div className="content">
              {singleJob?.salary}
              <span>LPA</span>
            </div>
            <div className="content">{singleJob?.jobType}</div>
          </div>
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
        <div className="job-details">
          <h2>Job Description</h2>
          <div>
            <div>Role:{singleJob?.title}</div>
            <div>Role-description:{singleJob?.description}</div>
            <div>Employmnet Type:{singleJob?.jobType}</div>
            <div>Location:{singleJob?.location}</div>
            <div>Experience:{singleJob?.experienceLevel}Yrs.</div>
            <div>
              Key Skills:{" "}
              {singleJob?.requirements.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))}
            </div>
            <div>Total Applicants:{singleJob?.applications?.length}</div>
            <div>Posted Date:{singleJob?.createdAt.split("T")[0]}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
