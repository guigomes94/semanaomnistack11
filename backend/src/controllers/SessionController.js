const conn = require('../database/conn');

module.exports = {
  async create(req, res) {
    const { id } = req.body;
    
    const ong = await conn('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return res.status(400).json({ error: 'NOT FOUND!' });
    }

    return res.json(ong);
  }
}