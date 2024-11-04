// Import the necessary modules
import mockingoose from 'mockingoose';
import mongoose from 'mongoose';
import { User } from '../../models/user.model';  

describe('User Model Test', () => {
  it('should validate a user with correct data', async () => {
    const validUser = new User({
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: 1234567890,
      password: 'securepassword123',
      role: 'student',
      profile: {
        bio: 'Software Developer',
        skills: ['JavaScript', 'Node.js'],
        resume: 'resume.pdf',
        resumeOriginalName: 'resume_john_doe.pdf',
        company: new mongoose.Types.ObjectId(),
        profilePhoto: 'profile.jpg'
      }
    });

    const error = validUser.validateSync();
    expect(error).toBeUndefined();  // Validation should pass
  });

  it('should throw validation errors for missing required fields', async () => {
    const invalidUser = new User({
      email: 'johndoe@example.com',
      phoneNumber: 1234567890,
      password: 'securepassword123',
      role: 'student'
    });

    let error;
    try {
      await invalidUser.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors.fullname).toBeDefined();  // fullname is required
  });

  it('should not allow duplicate emails', async () => {
    // Mock a scenario where the email already exists in the database
    mockingoose(User).toReturn(new Error('E11000 duplicate key error collection'), 'save');
    
    const user = new User({
      fullname: 'John Doe',
      email: 'duplicate@example.com',
      phoneNumber: 1234567890,
      password: 'securepassword123',
      role: 'student',
    });

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error.message).toMatch(/duplicate key error/);
  });

  it('should enforce enum validation on the role field', async () => {
    const invalidUser = new User({
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: 1234567890,
      password: 'securepassword123',
      role: 'admin',  // Invalid role, should be either 'student' or 'recruiter'
    });

    let error;
    try {
      await invalidUser.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors['role']).toBeDefined();
    expect(error.errors['role'].message).toBe('`admin` is not a valid enum value for path `role`.');
  });

  it('should set default value for profilePhoto', async () => {
    const validUser = new User({
      fullname: 'Jane Doe',
      email: 'janedoe@example.com',
      phoneNumber: 9876543210,
      password: 'anotherpassword123',
      role: 'recruiter'
    });

    expect(validUser.profile.profilePhoto).toBe('');  // Default value should be an empty string
  });
});
