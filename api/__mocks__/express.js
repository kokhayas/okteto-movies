const listen = jest.fn((_port, cb) => cb());
const get = jest.fn();

const express = () => ({ listen, get });

module.exports = express
