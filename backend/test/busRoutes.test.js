const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const { expect } = chai;

chai.use(chaiHttp);

describe('Bus API Routes', () => {
    let validBusId; 
    before(async () => {
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
    
        const response = await chai.request(app).post('/Bus/add').send(newBus);
        validBusId = response.body.bus._id;
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
        .get(`/Bus/${validBusId}`) 
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
        .delete(`/Bus/${validBusId}`) // Use the valid bus ID here
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
            busNo: 'UpdatedBus123',
            start_route: 'UpdatedStart',
            end_route: 'UpdatedEnd',
            driver: 'UpdatedDriverName',
            conductor: 'UpdatedConductorName',
            conductor_username: 'updated_conductor_username',
            conductor_password: 'updated_conductor_password',
            timePeriods: ['Evening']
          };

      chai.request(app)
        .put(`/Bus/${validBusId}`) 
        .send(updatedBusData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Bus updated successfully');
          done();
        });
    });
  });
});

chai.use(chaiHttp);
