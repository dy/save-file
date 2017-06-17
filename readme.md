# save-file [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges) [![Build Status](https://img.shields.io/travis/dfcreative/save-file.svg)](https://travis-ci.org/dfcreative/save-file) [![Greenkeeper badge](https://badges.greenkeeper.io/dfcreative/save-file.svg)](https://greenkeeper.io/)

Save file in node/browser. In browser it prompts save file dialog, in node it creates a file.

* Provides common interface for both node/browser.
* Fixes dialog race in browser − when multiple save-files are called at the same time.
* Handles any types of input data − _Buffer_, _ArrayBuffer_, _ArrayBufferView_, _File_, _Blob_, data-uri string, _ImageData_ etc.
* Resolves relative paths in node to the directory of caller module.

## Usage

[![npm install save-file](https://nodei.co/npm/save-file.png?mini=true)](https://npmjs.org/package/save-file/)

```js
const save = require('save-file')

save(data, 'example.mp3', (err, data) => {
	if (err) throw err;

	//file is saved at this point, data is arrayBuffer with actual saved data
})
.then(() => save(otherData, 'example2.mp3'))

```

## API

### `promise = save(data, filename, done?)`

`data` type can be _Buffer_, _ArrayBuffer_, _ArrayBufferView_, _File_, _Blob_, dataURI string, _ImageData_, _TypedArray_, _DataView_, [ndarray](https://github.com/scijs/ndarray) etc., see [to-array-buffer](https://github.com/dfcreative/to-array-buffer). It does not encode, like audio/image codecs or string encoding.

`filename` should include extension, e.g. `picture.jpg`. In node file will be placed to the directory of caller module. To redefine path, use `__dirname + '/file.jpg'` or alike.

`done` callback is fired when file is saved or window got focus back in browser. Also returned `promise` does the same.

Usually file savers offer MIME-type option, but here MIME-type is detected from the `filename` via [simple-mime](https://npmjs.org/package/simple-mime). To set custom MIME-type, create _Blob_: `save(new Blob([data], {type: 'application/octet-binary}))`.


## Credits & related

* [file-saver](https://npmjs.org/package/file-saver) − create download file dialog in browser.
* [write](https://npmjs.org/package/write) − write file in node, create directories if none.
* [to-array-buffer](https://github.com/dfcreative/to-array-buffer) — turn anything into ArrayBuffer.
* [simple-mime](https://npmjs.org/package/simple-mime) — tiny mime types detector.
