const request = require('supertest');
const app = require('../app');

describe('Task Manager API', () => {
  it('GET /api/health يرجع status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /api/tasks يرجع array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/tasks من غير title يرجع خطأ 400', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.statusCode).toBe(400);
  });
});