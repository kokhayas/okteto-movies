require('./server.js');

const express = require('express');
const { listen, get } = express();

const visit = (url, resMock) => {
  const [, cb] = get.mock.calls.find(([endpoint]) => endpoint === url);
  cb(undefined, resMock);
}

describe('server.js', () => {
  it('should listen on port 8080', () => {
    expect(listen).toHaveBeenCalledWith(8080, expect.any(Function));
  });

  it('should have a health check endpoint', () => {
    const sendStatus = jest.fn();

    visit('/api/healthz', { sendStatus });

    expect(sendStatus).toHaveBeenCalledWith(200);
  });

  it('should have a movies endpoint', async () => {
    const json = jest.fn();

    visit('/api/movies', { json });

    await new Promise(process.nextTick);

    expect(json).toHaveBeenCalledWith([{ title: 'The Matrix' }]);
  });

  it('should have a watching endpoint', async () => {
    const json = jest.fn();

    visit('/api/watching', { json });

    await new Promise(process.nextTick);

    expect(json).toHaveBeenCalledWith([{ title: 'The Godfather' }]);
  });

  it('should be a teapot', () => {
    const sendStatus = jest.fn();

    visit('/api', { sendStatus });

    expect(sendStatus).toHaveBeenCalledWith(418);
  });
});
