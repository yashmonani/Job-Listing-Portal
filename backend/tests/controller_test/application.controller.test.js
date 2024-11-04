import request from 'supertest';
import app from '../../index.js'; // Your Express app
import { Application } from '../../models/application.model.js'; // Mock Application model
import { Job } from '../../models/job.model.js'; // Mock Job model

jest.mock('../../models/application.model.js');
jest.mock('../../models/job.model.js');

// Optional mock for authentication middleware if necessary
jest.mock('../../middlewares/isAuthenticated.js', () => (req, res, next) => {
  req.id = 'userId123'; // Mock logged-in user ID
  next();
});

beforeEach(() => {
  jest.clearAllMocks(); // Reset mocks before each test
});

describe('Application Controller Tests', () => {
  describe('POST /api/v1/application/apply/:id', () => {
    it('should allow a user to apply for a job and return 201 status', async () => {
      const mockJob = { _id: 'jobId123', applications: [] };

      // Mock job existence
      Job.findById.mockResolvedValue(mockJob);

      // Mock application existence (no existing application)
      Application.findOne.mockResolvedValue(null);

      // Mock application creation
      const mockApplication = { _id: 'applicationId123', job: 'jobId123', applicant: 'userId123' };
      Application.create.mockResolvedValue(mockApplication);

      // Mock job update
      Job.findByIdAndUpdate.mockResolvedValue({ ...mockJob, applications: [mockApplication._id] });

      const res = await request(app)
        .post('/api/v1/application/apply/jobId123')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Job applied successfully');
    });

    it('should return 400 if the user has already applied for the job', async () => {
      Application.findOne.mockResolvedValue({ job: 'jobId123', applicant: 'userId123' });

      const res = await request(app)
        .post('/api/v1/application/apply/jobId123')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('You have Already applied for this Job');
    });

    it('should return 404 if the job does not exist', async () => {
      Job.findById.mockResolvedValue(null); // Job not found

      const res = await request(app)
        .post('/api/v1/application/apply/nonexistentJobId')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Job not found');
    });
  });

  describe('GET /api/v1/application', () => {
    it('should return the list of jobs the user has applied for', async () => {
      const mockApplications = [
        {
          _id: 'applicationId123',
          job: { _id: 'jobId123', title: 'Software Engineer', company: { _id: 'companyId123', name: 'TechCorp' } }
        }
      ];

      Application.find.mockResolvedValue(mockApplications);

      const res = await request(app)
        .get('/api/v1/application')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.application.length).toEqual(1);
      expect(res.body.application[0].job.title).toEqual('Software Engineer');
    });

    it('should return 404 if no applications are found', async () => {
      Application.find.mockResolvedValue(null); // No applications found

      const res = await request(app)
        .get('/api/v1/application')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('No applications');
    });
  });

  describe('GET /api/v1/application/:id/applicants', () => {
    it('should return a list of applicants for a job', async () => {
      const mockJob = {
        _id: 'jobId123',
        applications: [
          { _id: 'applicationId123', applicant: { _id: 'applicantId123', name: 'John Doe' } }
        ]
      };

      Job.findById.mockResolvedValue(mockJob);

      const res = await request(app)
        .get('/api/v1/application/jobId123/applicants')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.job.applications.length).toEqual(1);
      expect(res.body.job.applications[0].applicant.name).toEqual('John Doe');
    });

    it('should return 404 if the job is not found', async () => {
      Job.findById.mockResolvedValue(null); // Job not found

      const res = await request(app)
        .get('/api/v1/application/nonexistentJobId/applicants')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Job not found');
    });
  });

  describe('PUT /api/v1/application/status/:id/update', () => {
    it('should update the status of an application and return 200 status', async () => {
      const mockApplication = { _id: 'applicationId123', status: 'pending' };

      Application.findOne.mockResolvedValue(mockApplication); // Mock finding the application

      const res = await request(app)
        .put('/api/v1/application/status/applicationId123/update')
        .send({ status: 'accepted' })
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Status updated successfully');
    });

    it('should return 404 if the application is not found', async () => {
      Application.findOne.mockResolvedValue(null); // Application not found

      const res = await request(app)
        .put('/api/v1/application/status/nonexistentApplicationId/update')
        .send({ status: 'accepted' })
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Application not found.');
    });

    it('should return 400 if the status is missing', async () => {
      const res = await request(app)
        .put('/api/v1/application/status/applicationId123/update')
        .send({})
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Status is required');
    });
  });
});
