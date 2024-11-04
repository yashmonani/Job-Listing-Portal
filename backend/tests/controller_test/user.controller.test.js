import request from 'supertest';
import app from '../../index.js';
import { User } from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../../utils/cloudinary.js';
import getDataUri from '../../utils/datauri.js';

jest.mock('../../models/user.model.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../utils/cloudinary.js');
jest.mock('../../utils/datauri.js');

// Mock middleware for authentication
jest.mock('../../middlewares/isAuthenticated.js', () => (req, res, next) => {
  req.id = 'userId123'; // Mock userId extracted from the token
  next();
});

beforeEach(() => {
  jest.clearAllMocks(); // Reset mocks before each test
});

describe('User Controller Tests', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const mockFile = { originalname: 'profile.jpg' };
      const mockCloudinaryResponse = { secure_url: 'cloudinary_url' };
      const mockUser = { _id: 'userId123', email: 'test@example.com' };

      getDataUri.mockReturnValue({ content: 'file-content' });
      cloudinary.uploader.upload.mockResolvedValue(mockCloudinaryResponse);
      User.findOne.mockResolvedValue(null); // User does not exist
      bcrypt.hash.mockResolvedValue('hashed_password');
      User.create.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/v1/auth/register')
        .attach('file', mockFile)
        .field('fullname', 'John Doe')
        .field('email', 'test@example.com')
        .field('phoneNumber', '1234567890')
        .field('password', 'password123')
        .field('role', 'user');

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Account created successfully');
    });

    it('should return 400 if the user already exists', async () => {
      const mockUser = { email: 'test@example.com' };
      User.findOne.mockResolvedValue(mockUser); // User already exists

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          fullname: 'John Doe',
          email: 'test@example.com',
          phoneNumber: '1234567890',
          password: 'password123',
          role: 'user',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('User already exists with this email.');
    });

    it('should return 400 if any required field is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          fullname: 'John Doe',
          email: 'test@example.com',
          password: 'password123',
          role: 'user', // phoneNumber is missing
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Something is missing');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should log in successfully with correct credentials', async () => {
      const mockUser = {
        _id: 'userId123',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'user',
        fullname: 'John Doe',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true); // Password matches
      jwt.sign.mockReturnValue('mocked_token');

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'password123', role: 'user' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Welcome back John Doe');
      expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should return 400 if the email is not found', async () => {
      User.findOne.mockResolvedValue(null); // User not found

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'password123', role: 'user' });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Incorrect email or password.');
    });

    it('should return 400 if the password is incorrect', async () => {
      const mockUser = {
        _id: 'userId123',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'user',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false); // Password doesn't match

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword', role: 'user' });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Incorrect email or password.');
    });

    it('should return 400 if the role does not match', async () => {
      const mockUser = {
        _id: 'userId123',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'user',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true); // Password matches

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'password123', role: 'admin' }); // Role doesn't match

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual("Account doesn't exist with the current role");
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should log out successfully', async () => {
      const res = await request(app)
        .post('/api/v1/auth/logout')
        .set('Authorization', 'Bearer token');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Logged out successfully.');
    });
  });

  describe('PUT /api/v1/auth/profile', () => {
    it('should update user profile successfully', async () => {
      const mockFile = { originalname: 'resume.pdf' };
      const mockCloudinaryResponse = { secure_url: 'cloudinary_resume_url' };
      const mockUser = {
        _id: 'userId123',
        fullname: 'John Doe',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        profile: {
          bio: 'Old bio',
          skills: ['JS', 'Node'],
        },
      };

      User.findById.mockResolvedValue(mockUser);
      getDataUri.mockReturnValue({ content: 'file-content' });
      cloudinary.uploader.upload.mockResolvedValue(mockCloudinaryResponse);

      const res = await request(app)
        .put('/api/v1/auth/profile')
        .attach('file', mockFile)
        .field('fullname', 'Jane Doe')
        .field('email', 'new_email@example.com')
        .field('phoneNumber', '9876543210')
        .field('bio', 'New bio')
        .field('skills', 'React,Node,Express');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Profile updated successfully.');
      expect(res.body.user.fullname).toEqual('Jane Doe');
      expect(res.body.user.email).toEqual('new_email@example.com');
      expect(res.body.user.profile.bio).toEqual('New bio');
      expect(res.body.user.profile.skills).toEqual(['React', 'Node', 'Express']);
    });

    it('should return 400 if the user is not found', async () => {
      User.findById.mockResolvedValue(null); // User not found

      const res = await request(app)
        .put('/api/v1/auth/profile')
        .send({
          fullname: 'Jane Doe',
          email: 'new_email@example.com',
          phoneNumber: '9876543210',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('User not found.');
    });
  });
});
