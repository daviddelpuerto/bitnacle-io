# bitnacle-io

[![Build Status](https://travis-ci.org/daviddelpuerto/bitnacle-io.svg?branch=master)](https://travis-ci.org/daviddelpuerto/bitnacle-io)
![David](https://img.shields.io/david/daviddelpuerto/bitnacle-io)
![David](https://img.shields.io/david/dev/daviddelpuerto/bitnacle-io)
![npm](https://img.shields.io/npm/v/bitnacle-io)

```bitnacle-io``` is a dead simple middleware logger to use with [socket.io](https://www.npmjs.com/package/socket.io).

## Installation

```
npm i bitnacle-io
```

## Quick start

```javascript
const io = require('socket.io')();
const bitnacleIo = require('bitnacle-io');

io.on('connection', socket => { 
    
    socket.use(bitnacleIo()); // use default "simple" format

    ...

});

io.listen(3000);
```

If you want to **skip** some events, you can do it by passing an array of event names to ```bitnacle-io``` and they won't be logged:

```javascript
socket.use(bitnacleIo({
    exclude: [
        'event_name',
        'another_event_name',
        'yet_another_event_name'
    ]
}));
```


## Formats

```bitnacle-io``` uses 2 formats, ```simple``` (default) and ```json```.

```javascript
socket.use(bitnacleIo({
    format: 'json' // optional: default is "simple"
}));
```

### ```simple``` format output:

```
[2019-08-25T20:01:11:130+0200] ["some_event",{"someKey":"someValue"}]
```

### ```json``` format output:

```json
{"time":"2019-08-25T20:02:43:125+0200","eventData":["some_event",{"someKey":"someValue"}]}
```