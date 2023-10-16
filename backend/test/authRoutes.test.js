const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('Auth API Routes', () => {
  describe('POST /auth/signup', () => {
    it('should create a new user', (done) => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
        Phone: '1234567890',
        password: 'password123',
      };

      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('User created successfully');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a user with valid credentials', (done) => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123',
      };

      chai.request(app)
        .post('/auth/login')
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('email').to.equal(credentials.email);
          done();
        });
    });

    it('should reject login with invalid credentials', (done) => {
      const invalidCredentials = {
        email: 'invalid@example.com',
        password: 'invalidpassword',
      };

      chai.request(app)
        .post('/auth/login')
        .send(invalidCredentials)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('Invalid credentials');
          done();
        });
    });
  });

  describe('POST /auth/passengersignup', () => {
    it('should create a new passenger', (done) => {
      const newPassenger = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        Phone: '9876543210',
        password: 'passengerpassword',
      };

      chai.request(app)
        .post('/auth/passengersignup')
        .send(newPassenger)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Passenger created successfully');
          done();
        });
    });
  });

  describe('POST /auth/passengerlogin', () => {
    it('should log in a passenger with valid credentials', (done) => {
      const credentials = {
        email: 'jane@example.com',
        password: 'passengerpassword',
      };

      chai.request(app)
        .post('/auth/passengerlogin')
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('email').to.equal(credentials.email);
          done();
        });
    });

    it('should reject login with invalid credentials', (done) => {
      const invalidCredentials = {
        email: 'invalidpassenger@example.com',
        password: 'invalidpassword',
      };

      chai.request(app)
        .post('/auth/passengerlogin')
        .send(invalidCredentials)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('Invalid credentials');
          done();
        });
    });
  });
});
