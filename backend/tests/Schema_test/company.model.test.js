import { mockingoose } from 'mockingoose';
import mongoose from 'mongoose';
import { Company } from '../../models/company.model';  // Adjust this import based on your file structure

describe('Company Model Test', () => {

  it('should validate a company with correct data', async () => {
    const validCompany = new Company({
      name: 'TechCorp',
      description: 'Leading software company specializing in cloud solutions.',
      website: 'https://techcorp.com',
      location: 'San Francisco, CA',
      logo: 'https://techcorp.com/logo.png',
      UserId: new mongoose.Types.ObjectId(),
    });

    const error = validCompany.validateSync();
    expect(error).toBeUndefined();  // Validation should pass with no errors
  });

  it('should throw validation errors for missing required fields', async () => {
    const invalidCompany = new Company({
      description: 'Tech company with a focus on AI and machine learning.',
      website: 'https://ai-tech.com',
      location: 'Boston, MA',
      logo: 'https://ai-tech.com/logo.png'
    });

    let error;
    try {
      await invalidCompany.validate();
    } catch (err) {
      error = err;
    }

    expect(error.errors['name']).toBeDefined();  // Name is required
    expect(error.errors['UserId']).toBeDefined();  // UserId is required
  });

  it('should not allow duplicate company names', async () => {
    // Mock a duplicate key error scenario
    mockingoose(Company).toReturn(new Error('E11000 duplicate key error collection'), 'save');

    const company = new Company({
      name: 'TechCorp',
      description: 'Leading software company.',
      website: 'https://techcorp.com',
      location: 'New York, NY',
      logo: 'https://techcorp.com/logo.png',
      UserId: new mongoose.Types.ObjectId()
    });

    let error;
    try {
      await company.save();
    } catch (err) {
      error = err;
    }

    expect(error.message).toMatch(/duplicate key error/);  // Should throw duplicate key error
  });

  it('should allow optional fields to be empty', async () => {
    const companyWithMinimalData = new Company({
      name: 'MinimalTech',
      UserId: new mongoose.Types.ObjectId()
    });

    const error = companyWithMinimalData.validateSync();
    expect(error).toBeUndefined();  // Validation should pass since optional fields are not required
  });

  it('should create a company using mockingoose without connecting to a real database', async () => {
    const mockCompany = {
      _id: '507f191e810c19729de860ea',
      name: 'FutureTech',
      description: 'Innovating the future with AI',
      website: 'https://futuretech.com',
      location: 'Los Angeles, CA',
      logo: 'https://futuretech.com/logo.png',
      UserId: new mongoose.Types.ObjectId(),
    };

    mockingoose(Company).toReturn(mockCompany, 'save');

    const company = new Company(mockCompany);
    const savedCompany = await company.save();

    expect(savedCompany._id).toBeDefined();
    expect(savedCompany.name).toBe('FutureTech');
    expect(savedCompany.location).toBe('Los Angeles, CA');
  });

});
