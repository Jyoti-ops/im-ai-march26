const { describe, it } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

process.env.DATABASE_PATH = ':memory:';

const app = require('../../app');

describe('POST /timer/start', () => {
  it('creates a time entry and redirects to /timer', async () => {
    const res = await request(app)
      .post('/timer/start')
      .type('form')
      .send({ project_id: '1' });
    assert.strictEqual(res.status, 302);
    assert.ok(res.headers.location === '/timer' || res.headers.location === '/timer/');
  });

  it('shows the new entry on the entries page', async () => {
    await request(app)
      .post('/timer/start')
      .type('form')
      .send({ project_id: '1' });
    const entriesRes = await request(app).get('/entries');
    assert.strictEqual(entriesRes.status, 200);
    assert.ok(entriesRes.text.includes('No Project'), 'entries page should show No Project');
  });
});
