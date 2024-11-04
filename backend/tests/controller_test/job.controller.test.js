import request from 'supertest';
import app from '../../index.js'; // import the app
import { Job } from '../../models/job.model.js'; // import the Job model

jest.mock('../../models/job.model.js'); // Mock the Job model

// Optionally mock the auth middleware if needed
jest.mock('../../middlewares/isAuthenticated.js', () => (req, res, next) => {
  req.id = 'adminId123'; // Mock the user ID for authenticated requests
  next();
});

beforeEach(() => {
  jest.clearAllMocks(); // Reset all mocks before each test
});

describe('Job Controller Tests', () => {

  describe('POST /api/v1/job/post', () => {
    it('should create a job and return 201 status', async () => {
      const mockJob = {
        _id: 'jobId123',
        title: 'Software Developer',
        description: 'Job description',
        requirements: ['JavaScript', 'Node.js'],
        salary: 60000,
        location: 'New York',
        jobType: 'Full-time',
        experienceLevel: 2,
        position: 1,
        company: 'companyId123',
        created_by: 'adminId123'
      };

      Job.create.mockResolvedValue(mockJob); // Mock Job.create

      const res = await request(app)
        .post('/api/v1/job/post')
        .set('Authorization', 'Bearer token')
        .send({
          title: 'Software Developer',
          description: 'Job description',
          requirements: 'JavaScript,Node.js',
          salary: 60000,
          location: 'New York',
          jobType: 'Full-time',
          experience: 2,
          position: 1,
          companyId: 'companyId123'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.job.title).toEqual('Software Developer');
      expect(Job.create).toHaveBeenCalledTimes(1); // Ensure the method was called once
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/job/post')
        .set('Authorization', 'Bearer token')
        .send({
          description: 'Job description',
          salary: 60000,
          location: 'New York',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Something is missing.');
      expect(Job.create).not.toHaveBeenCalled(); // Ensure Job.create was not called
    });
  });

  describe('GET /api/v1/job/get', () => {
    it('should return all jobs and return 200 status', async () => {
      const mockJobs = [
        {
          title: 'Software Developer',
          description: 'Job description',
          requirements: ['JavaScript', 'Node.js'],
          salary: 60000,
          location: 'New York',
          jobType: 'Full-time',
          experienceLevel: 2,
          position: 1,
          company: 'companyId123'
        },
      ];

      Job.find.mockResolvedValue(mockJobs); // Mock Job.find

      const res = await request(app)
        .get('/api/v1/job/get')
        .set('Authorization', 'Bearer token')
        .query({ Keyword: 'Software' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.jobs.length).toEqual(1);
      expect(res.body.jobs[0].title).toEqual('Software Developer');
      expect(Job.find).toHaveBeenCalledTimes(1);
    });

    it('should return 404 if no jobs are found', async () => {
      Job.find.mockResolvedValue(null); // No jobs found

      const res = await request(app)
        .get('/api/v1/job/get')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Jobs not found');
    });
  });

  describe('GET /api/v1/job/get/:id', () => {
    it('should return a job by ID and return 200 status', async () => {
      const mockJob = {
        _id: 'jobId123',
        title: 'Software Developer',
        description: 'Job description',
        applications: [],
      };

      Job.findById.mockResolvedValue(mockJob); // Mock Job.findById

      const res = await request(app)
        .get('/api/v1/job/get/jobId123')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.job.title).toEqual('Software Developer');
      expect(Job.findById).toHaveBeenCalledTimes(1);
    });

    it('should return 404 if job not found', async () => {
      Job.findById.mockResolvedValue(null); // Job not found

      const res = await request(app)
        .get('/api/v1/job/get/nonexistentJobId')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Jobs not found');
    });
  });

  describe('GET /api/v1/job/getadminjobs', () => {
    it('should return all admin jobs and return 200 status', async () => {
      const mockAdminJobs = [
        {
          _id: 'jobId123',
          title: 'Software Developer',
          created_by: 'adminId123'
        },
      ];

      Job.find.mockResolvedValue(mockAdminJobs); // Mock Job.find

      const res = await request(app)
        .get('/api/v1/job/getadminjobs')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.jobs.length).toEqual(1);
      expect(res.body.jobs[0].title).toEqual('Software Developer');
      expect(Job.find).toHaveBeenCalledTimes(1);
    });

    it('should return 404 if no admin jobs are found', async () => {
      Job.find.mockResolvedValue(null); // No jobs found

      const res = await request(app)
        .get('/api/v1/job/getadminjobs')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Jobs not found');
    });
  });
});
