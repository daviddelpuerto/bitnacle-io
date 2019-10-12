const { bitnacleTimer } = require('bitnacle-helpers');

function isEventExcluded(eventName, options) {
  if (!eventName) return false;
  if (options && options.exclude && options.exclude.includes(eventName)) return true;
  return false;
}

module.exports = (options = {}) => {
  if (options !== undefined && typeof options !== 'object') {
    throw new Error('Invalid argument type, you must pass an object to bitnacleIo');
  }

  if (options.constructor.name !== 'Object') {
    throw new Error('It seems you are using bitnacleIo middleware this way "app.use(binacleIo)", but it should be used "app.use(bitnacleIo())".');
  }

  return (eventData, next) => {
    if (options && options.exclude && !Array.isArray(options.exclude)) {
      throw new Error('Invalid argument type, exclude property must be an array');
    }

    const eventName = Object.values(eventData)[0];
    if (isEventExcluded(eventName, options)) return;

    const time = bitnacleTimer.getRequestTime();

    if (options.format && options.format === 'json') {
      process.stdout.write(`${JSON.stringify({ time, eventData })}\n`);
    } else {
      process.stdout.write(`[${time}] ${JSON.stringify(eventData)}\n`);
    }

    next();
  };
};
