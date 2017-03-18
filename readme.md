# save-file [![Build Status](https://travis-ci.org/audiojs/save-file.svg?branch=master)](https://travis-ci.org/audiojs/save-file) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Save/download blob/buffer/datauri in node/browser. In browser it prompts save file dialog, in node it creates a file.

## Usage

[![npm install save-file](https://nodei.co/npm/save-file.png?mini=true)](https://npmjs.org/package/save-file/)

```js
var saveAs = require('save-file')

var buffer = data.toBuffer()

saveAs(buffer, 'example.mp3')
```

Data can be almost anything (see [to-array-buffer](https://github.com/dfcreative/to-array-buffer) module): _Buffer_, _ArrayBuffer_, dataURI string, [_AudioBuffer_](https://github.com/audiohs/audio-buffer), _ImageData_, _TypedArray_, _DataView_ etc. Note though that you may need to encode the data manually beforehead, that is wav file, image codecs etc, otherwise `save-file` will just output raw binary sequence. The purpose of `save-file` is just providing handy interface for node and browser to save files.

## Credits & related

* [file-saver](https://npmjs.org/package/file-saver) − create download file dialog in browser.
* [write-file](https://npmjs.org/package/write-file) − write file in node, create directories if none.
* [to-array-buffer](https://github.com/dfcreative/to-array-buffer) — turn anything into ArrayBuffer.
