const { expect } = require('chai');
const { stdout, stderr } = require('test-console');
const bitnacleIo = require('../index');

describe('#bitnacleIo()', function() {

    it('should return a function', function() {
        expect(bitnacleIo()).to.be.a('function');
    });

    it('should throw if options is not an object', function() {
        expect(() => bitnacleIo('')).to.throw();
    });

    it('should throw if not initialized correctly', function() {
        expect(() => bitnacleIo({
            constructor: {
                name: ''
            }
        })).to.throw();
    });

});