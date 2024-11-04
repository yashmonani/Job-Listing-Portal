import { mockingoose } from 'mockingoose';
import mongoose from 'mongoose';
import { Application } from '../../models/application.model'; // Adjust this import path as needed

describe('Application Model Test', () => {

  it('should validate an application with correct data', async () => {
    const validApplication = new Application({
      job: new mongoose.Types.ObjectId(),
      applicant: new mongoose.Types.ObjectId(),
      status: 'pending'
    });

    const error = validApplication.validateSync();
    expect(error).toBeUndefined();  // Validation should pass with no errors
  });

  it('should throw validation errors for missing required fields', async () => {
    const invalidApplication = new Application({
      status: 'accepted'
    });

    let error;
    try {
      await invalidApplication.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors['job']).toBeDefined();      // Job reference is required
    expect(error.errors['applicant']).toBeDefined();  // Applicant reference is required
  });

  it('should throw an error for invalid status value', async () => {
    const invalidApplication = new Application({
      job: new mongoose.Types.ObjectId(),
      applicant: new mongoose.Types.ObjectId(),
      status: 'in progress'  // Invalid status
    });

    let error;
    try {
      await invalidApplication.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors['status']).toBeDefined();
    expect(error.errors['status'].message).toBe('`in progress` is not a valid enum value for path `status`.');
  });

  it('should create an application using mockingoose without connecting to a real database', async () => {
    const mockApplication = {
      _id: '507f191e810c19729de860ea',
      job: new mongoose.Types.ObjectId(),
      applicant: new mongoose.Types.ObjectId(),
      status: 'pending'
    };

    mockingoose(Application).toReturn(mockApplication, 'save');

    const application = new Application(mockApplication);
    const savedApplication = await application.save();

    expect(savedApplication._id).toBeDefined();
    expect(savedApplication.status).toBe('pending');
  });

  it('should default status to "pending" if not provided', async () => {
    const applicationWithoutStatus = new Application({
      job: new mongoose.Types.ObjectId(),
      applicant: new mongoose.Types.ObjectId()
    });

    const error = applicationWithoutStatus.validateSync();
    expect(error).toBeUndefined();  // Validation should pass
    expect(applicationWithoutStatus.status).toBe('pending');  // Status should default to 'pending'
  });

});
