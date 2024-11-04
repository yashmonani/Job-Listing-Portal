import request from 'supertest';
import app from '../../index.js'; // Your Express app
import { Company } from '../../models/company.model.js'; // Mock the Company model
import cloudinary from '../../utils/cloudinary.js'; // Mock Cloudinary
import getDataUri from '../../utils/datauri.js'; // Mock dataUri

jest.mock('../../models/company.model.js');
jest.mock('../../utils/cloudinary.js');
jest.mock('../../utils/datauri.js');

// Optional mock for authentication middleware if necessary
jest.mock('../../middlewares/isAuthenticated.js', () => (req, res, next) => {
  req.id = 'adminId123'; // Mock logged-in user ID
  next();
});

beforeEach(() => {
  jest.clearAllMocks(); // Reset mocks before each test
});

describe('Company Controller Tests', () => {

  describe('POST /api/v1/company/register', () => {
    it('should register a company and return 201 status', async () => {
      const mockCompany = {
        _id: 'companyId123',
        name: 'Test Company',
        UserId: 'adminId123'
      };

      // Mock the Company model behavior
      Company.findOne.mockResolvedValue(null); // No existing company
      Company.create.mockResolvedValue(mockCompany); // Create a company

      const res = await request(app)
        .post('/api/v1/company/register')
        .send({
          companyName: 'Test Company'
        })
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.company.name).toEqual('Test Company');
    });

    it('should return 400 if company name is missing', async () => {
      const res = await request(app)
        .post('/api/v1/company/register')
        .send({})
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Company name is required.');
    });

    it('should return 400 if the company already exists', async () => {
      Company.findOne.mockResolvedValue({ name: 'Test Company' });

      const res = await request(app)
        .post('/api/v1/company/register')
        .send({
          companyName: 'Test Company'
        })
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual("You can't register same company");
    });
  });

  describe('GET /api/v1/company', () => {
    it('should return all companies for the logged-in user and return 200 status', async () => {
      const mockCompanies = [
        { _id: 'companyId123', name: 'Test Company', UserId: 'adminId123' }
      ];

      Company.find.mockResolvedValue(mockCompanies); // Mock Company.find

      const res = await request(app)
        .get('/api/v1/company')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.companies.length).toEqual(1);
    });

    it('should return 404 if no companies found', async () => {
      Company.find.mockResolvedValue(null); // No companies found

      const res = await request(app)
        .get('/api/v1/company')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Company not found');
    });
  });

  describe('GET /api/v1/company/:id', () => {
    it('should return a company by ID and return 200 status', async () => {
      const mockCompany = { _id: 'companyId123', name: 'Test Company' };

      Company.findById.mockResolvedValue(mockCompany); // Mock Company.findById

      const res = await request(app)
        .get('/api/v1/company/companyId123')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.company.name).toEqual('Test Company');
    });

    it('should return 404 if company is not found', async () => {
      Company.findById.mockResolvedValue(null); // Company not found

      const res = await request(app)
        .get('/api/v1/company/nonexistentId')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Company not found');
    });
  });

  describe('PUT /api/v1/company/:id', () => {
    it('should update a company and return 200 status', async () => {
      const mockFile = { originalname: 'logo.png' };
      const mockCompany = { _id: 'companyId123', name: 'Updated Company' };

      // Mock file handling
      getDataUri.mockReturnValue({ content: 'dataUriContent' });

      // Mock cloudinary upload
      cloudinary.uploader.upload.mockResolvedValue({
        secure_url: 'https://cloudinary.com/logo.png'
      });

      // Mock Company update
      Company.findByIdAndUpdate.mockResolvedValue(mockCompany);

      const res = await request(app)
        .put('/api/v1/company/companyId123')
        .set('Authorization', 'Bearer token')
        .attach('file', mockFile)
        .field('name', 'Updated Company')
        .field('description', 'Updated description')
        .field('website', 'https://example.com')
        .field('location', 'New York');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Copany information updated');
    });

    it('should return 400 if company is not found during update', async () => {
      Company.findByIdAndUpdate.mockResolvedValue(null); // Company not found

      const res = await request(app)
        .put('/api/v1/company/nonexistentId')
        .set('Authorization', 'Bearer token')
        .send({
          name: 'Updated Company'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Company not found.');
    });
  });
});
