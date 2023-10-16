const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path to your server file
const { expect } = chai;

chai.use(chaiHttp);

describe('Bus API Routes', () => {
  let fakeId = '123456789012345678901234'; // A fake ID for testing
  
  describe('GET /Bus/statistics', () => {
    it('should get bus statistics', (done) => {
      chai.request(app)
        .get('/Bus/statistics')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('totalBuses');
          expect(res.body).to.have.property('averageTimePeriods');
          done();
        });
    });
  });

  describe('POST /Bus/add', () => {
    it('should add a new bus', (done) => {
      const newBus = {
        busNo: 'Bus123',
        start_route: 'Start',
        end_route: 'End',
        driver: 'Driver Name',
        conductor: 'Conductor Name',
        conductor_username: 'conductor_username',
        conductor_password: 'conductor_password',
        timePeriods: ['Morning', 'Afternoon']
      };

      chai.request(app)
        .post('/Bus/add')
        .send(newBus)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Bus added successfully');
          done();
        });
    });
  });

  describe('GET /Bus', () => {
    it('should get all buses', (done) => {
      chai.request(app)
        .get('/Bus')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /Bus/:id', () => {
    it('should get a single bus by ID', (done) => {
      chai.request(app)
        .get(`/Bus/${fakeId}`) // Using the fake ID here
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /Bus/:id', () => {
    it('should delete a bus by ID', (done) => {
      chai.request(app)
        .delete(`/Bus/${fakeId}`) // Using the fake ID here
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Bus deleted successfully');
          done();
        });
    });
  });

  describe('PUT /Bus/:id', () => {
    it('should update a bus by ID', (done) => {
      const updatedBusData = {
        // Provide updated data for the bus
      };

      chai.request(app)
        .put(`/Bus/${fakeId}`) // Using the fake ID here
        .send(updatedBusData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Bus updated successfully');
          done();
        });
    });
  });
});
const app = require('../server'); 

chai.use(chaiHttp);
