const { readFile } = require('../index.js');

describe('#readFile', () => {
  test('read file and fetch values', async () => {
    const response = await readFile();
    expect(response).not.toBe(null);
  })
})