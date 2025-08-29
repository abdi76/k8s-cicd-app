const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

describe('K8s CI/CD App Tests', () => {
  let server;

  before((done) => {
    server = app.listen(3001, done);
  });

  after((done) => {
    server.close(done);
  });

  describe('GET /', () => {
    it('should return welcome message with 200 status', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Hello, Kubernetes CI/CD!');
          expect(res.body).to.have.property('version');
          expect(res.body).to.have.property('timestamp');
          done();
        });
    });
  });

  describe('GET /health', () => {
    it('should return health status', (done) => {
      chai.request(server)
        .get('/health')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal('healthy');
          expect(res.body).to.have.property('uptime');
          done();
        });
    });
  });

  describe('GET /api/users', () => {
    it('should return users array', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('email');
          done();
        });
    });
  });

  describe('GET /metrics', () => {
    it('should return Prometheus metrics', (done) => {
      chai.request(server)
        .get('/metrics')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.text).to.include('# HELP');
          expect(res.text).to.include('http_requests_total');
          done();
        });
    });
  });
});
