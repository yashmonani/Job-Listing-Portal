import { mockingoose } from 'mockingoose';
import mongoose from 'mongoose';
import { Job } from '../../models/job.model';  // Adjust this import based on your file structure

describe('Job Model Test', () => {

  it('should validate a job with correct data', async () => {
    const validJob = new Job({
      title: 'Software Engineer',
      description: 'Develop and maintain web applications.',
      requirements: ['JavaScript', 'Node.js', 'MongoDB'],
      salary: 70000,
      experienceLevel: 3,
      location: 'New York, NY',
      jobType: 'Full-time',
      position: 1,
      company: new mongoose.Types.ObjectId(),
      created_by: new mongoose.Types.ObjectId(),
      applications: [new mongoose.Types.ObjectId()]
    });

    const error = validJob.validateSync();
    expect(error).toBeUndefined();  // Validation should pass with no errors
  });

  it('should throw validation errors for missing required fields', async () => {
    const invalidJob = new Job({
      description: 'Develop and maintain web applications.',
      requirements: ['JavaScript', 'Node.js', 'MongoDB'],
      salary: 70000,
      experienceLevel: 3,
      jobType: 'Full-time',
      position: 1,
      company: new mongoose.Types.ObjectId(),
      created_by: new mongoose.Types.ObjectId()
    });

    let error;
    try {
      await invalidJob.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors['title']).toBeDefined();  // Title is required
    expect(error.errors['location']).toBeDefined();  // Location is required
  });

  it('should create a job using mockingoose without connecting to a real database', async () => {
    const mockJob = {
      _id: '507f1f77bcf86cd799439011',
      title: 'Backend Developer',
      description: 'Work on backend services and APIs.',
      requirements: ['Node.js', 'Express', 'MongoDB'],
      salary: 80000,
      experienceLevel: 2,
      location: 'Remote',
      jobType: 'Full-time',
      position: 1,
      company: new mongoose.Types.ObjectId(),
      created_by: new mongoose.Types.ObjectId(),
      applications: []
    };

    mockingoose(Job).toReturn(mockJob, 'save');

    const job = new Job(mockJob);
    const savedJob = await job.save();

    expect(savedJob._id).toBeDefined();
    expect(savedJob.title).toBe('Backend Developer');
    expect(savedJob.salary).toBe(80000);
  });

  it('should throw an error if salary is not a number', async () => {
    const invalidJob = new Job({
      title: 'Frontend Developer',
      description: 'Work on frontend development.',
      requirements: ['React', 'JavaScript'],
      salary: 'high',  // Invalid salary
      experienceLevel: 3,
      location: 'San Francisco, CA',
      jobType: 'Full-time',
      position: 1,
      company: new mongoose.Types.ObjectId(),
      created_by: new mongoose.Types.ObjectId()
    });

    let error;
    try {
      await invalidJob.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors['salary']).toBeDefined();
    expect(error.errors['salary'].message).toBe('Cast to Number failed for value "high" at path "salary"');
  });

  it('should default timestamps to the current date', async () => {
    const job = new Job({
      title: 'UI/UX Designer',
      description: 'Design intuitive user interfaces.',
      requirements: ['Figma', 'Sketch'],
      salary: 60000,
      experienceLevel: 2,
      location: 'Remote',
      jobType: 'Contract',
      position: 1,
      company: new mongoose.Types.ObjectId(),
      created_by: new mongoose.Types.ObjectId()
    });

    expect(job.createdAt).toBeUndefined();  // `createdAt` not set until saved
    await job.save();
    expect(job.createdAt).toBeDefined();  // `createdAt` should be set now
  });
});
