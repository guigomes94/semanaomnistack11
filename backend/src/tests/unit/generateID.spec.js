const generateID = require('../../utils/generateID');

describe('Generate ID', () => {
  it('should generate an unique ID', () => {
    const id = generateID();

    expect(id).toHaveLength(8);
  })
})