const request = require('supertest');
const app = require('../../app');
const conn = require('../../database/conn');

describe('ONG', () => {
  beforeEach(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  })

  afterAll(async () => {
    await conn.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app).post('ongs').send({
      name: "APAD2",
      email: "contato",
      whatsapp: "45998877651",
      city: "Gotham",
      uf: "SP"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

  })
})