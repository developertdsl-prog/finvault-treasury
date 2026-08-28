const request = require('supertest');
const app = require('../server');

describe('E2E Treasury Management Platform Test Suite', () => {
  test('GET /api/v1/ping returns optimal status and ISO compliance flag', async () => {
    const res = await request(app).get('/api/v1/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OPTIMAL');
    expect(res.body.isoCompliant).toBe(true);
  });

  test('GET /health returns basic system liveness', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });
});
