const fs = require('fs');
const { expect } = require('chai');
const bitnacleIo = require('../index');

const LOG_FILE = './test/sample.log';

fs.writeFileSync(LOG_FILE);

describe('#bitnacleIo()', () => {
  it('should return a function', () => {
    expect(bitnacleIo()).to.be.a('function');
  });

  it('should throw if options is not an object', () => {
    expect(() => bitnacleIo('')).to.throw();
  });

  it('should throw if not initialized correctly', () => {
    expect(() => bitnacleIo({
      constructor: {
        name: '',
      },
    })).to.throw();
  });

  it('should throw if options.streams includes non writable streams', () => {
    expect(() => bitnacleIo({
      streams: ['Invalid stream'],
    })).to.throw();

    const readableStream = fs.createReadStream(LOG_FILE);

    expect(() => bitnacleIo({
      streams: [readableStream],
    })).to.throw();

    readableStream._write = () => {};
    readableStream._writableState = 'fake prop';

    expect(() => bitnacleIo({
      streams: [readableStream],
    })).to.throw();
  });
});
