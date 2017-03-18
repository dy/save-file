# save-file [![Build Status](https://travis-ci.org/audiojs/save-file.svg?branch=master)](https://travis-ci.org/audiojs/save-file) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Save file in node/browser. In browser it prompts save file dialog, in node it creates a file.

* Provides common interface for both node/browser
* Fixes dialog race in browser
* Handles different data-types
* Resolves relative paths in node

## Usage

[![npm install save-file](https://nodei.co/npm/save-file.png?mini=true)](https://npmjs.org/package/save-file/)

```js
var save = require('save-file')

save(data, 'example.mp3')
```

### `save(data, filename, mime?)`

`data` can be any binary-like data (see [to-array-buffer](https://github.com/dfcreative/to-array-buffer) module): _Buffer_, _ArrayBuffer_, _Blob_, dataURI string, [_AudioBuffer_](https://github.com/audiohs/audio-buffer), _ImageData_, _TypedArray_, _DataView_ etc. Note though that you may need to encode the data manually beforehead, that is wav file, image codecs etc, otherwise `save-file` will just output raw binary sequence.

`filename` should include desired extension, e.g. `picture.jpg`. In node it will place file into the directory of caller module.

`mime` type is automatically detected from the file name via [simple-mime](https://npmjs.org/package/simple-mime), but you may want to point it manually or detect via comprehensive [mime-types](https://npmjs.org/package/mime-types) or from data via [file-type](https://npmjs.org/package/file-type).


## Credits & related

* [file-saver](https://npmjs.org/package/file-saver) − create download file dialog in browser.
* [write-file](https://npmjs.org/package/write-file) − write file in node, create directories if none.
* [to-array-buffer](https://github.com/dfcreative/to-array-buffer) — turn anything into ArrayBuffer.
* [simple-mime](https://npmjs.org/package/simple-mime) — tiny mime types detector.
