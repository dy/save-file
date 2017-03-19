# save-file [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Save file in node/browser. In browser it prompts save file dialog, in node it creates a file.

* Provides common interface for both node/browser
* Fixes dialog race in browser
* Handles different types of input data
* Resolves relative paths in node

## Usage

[![npm install save-file](https://nodei.co/npm/save-file.png?mini=true)](https://npmjs.org/package/save-file/)

```js
const save = require('save-file')

save(data, 'example.mp3', (err) => {
	if (err) throw err;
	//file is saved at this point
}).then(() => save(otherData, 'example2.mp3'))

```

## API

### `promise = save(data, filename, done?)`

`data` can be any binary-like data (see [to-array-buffer](https://github.com/dfcreative/to-array-buffer) module): _Buffer_, _ArrayBuffer_, _Blob_, dataURI string, [_AudioBuffer_](https://github.com/audiohs/audio-buffer), _ImageData_, _TypedArray_, _DataView_ etc. Note though that you may need to encode the data manually beforehead, that is wav file, image codecs etc, otherwise `save-file` will just output raw binary sequence.

`filename` should include desired extension, e.g. `picture.jpg`. In node it will place file into the directory of caller module. You may want to define absolute path as `__dirname + 'file.jpg'`.

MIME-type is detected automatically from the `filename` via [simple-mime](https://npmjs.org/package/simple-mime). If you need custom MIME-type, create and pass _Blob_: `save(new Blob([data], {type: 'application/octet-binary}))`.

`done` callback is invoked once file is saved, that is when window got focus in browser. Alternately, use returned promise object for async sequence.


## Credits & related

* [file-saver](https://npmjs.org/package/file-saver) − create download file dialog in browser.
* [write-file](https://npmjs.org/package/write-file) − write file in node, create directories if none.
* [to-array-buffer](https://github.com/dfcreative/to-array-buffer) — turn anything into ArrayBuffer.
* [simple-mime](https://npmjs.org/package/simple-mime) — tiny mime types detector.
