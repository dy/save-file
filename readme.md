# save-file [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Save file in node/browser. In browser it prompts save file dialog, in node it creates file.

* Provides common interface for both node/browser.
* Fixes dialog race in browser − when multiple save files are called at the same time.
* Handles any types of input data − _Buffer_, _ArrayBuffer_, _Blob_, dataURI string, _ImageData_, _TypedArray_ etc.
* Resolves relative paths in node to the directory of caller module.

## Usage

[![npm install save-file](https://nodei.co/npm/save-file.png?mini=true)](https://npmjs.org/package/save-file/)

```js
const save = require('save-file')

save(data, 'example.mp3', (err) => {
	if (err) throw err;
	//file is saved at this point
})
.then(() => save(otherData, 'example2.mp3'))

```

## API

### `promise = save(data, filename, done?)`

`data` type can be _Buffer_, _ArrayBuffer_, _Blob_, dataURI string, [_AudioBuffer_](https://github.com/audiohs/audio-buffer), _ImageData_, _TypedArray_, _DataView_, [ndarray](https://github.com/scijs/ndarray) etc., see [to-array-buffer](https://github.com/dfcreative/to-array-buffer). It does not do encoding though, like wav, image codecs etc.

`filename` should include extension, e.g. `picture.jpg`. In node file will be placed to the directory of caller module. To redefine path, use `__dirname + '/file.jpg'` or alike.

`done` callback is called when file is saved or window got focus back in browser. Also returned `promise` does the same.

Usually file savers offer MIME-type option, but here MIME-type is detected from the `filename` via [simple-mime](https://npmjs.org/package/simple-mime). To set custom MIME-type, create _Blob_: `save(new Blob([data], {type: 'application/octet-binary}))`.


## Credits & related

* [file-saver](https://npmjs.org/package/file-saver) − create download file dialog in browser.
* [write-file](https://npmjs.org/package/write-file) − write file in node, create directories if none.
* [to-array-buffer](https://github.com/dfcreative/to-array-buffer) — turn anything into ArrayBuffer.
* [simple-mime](https://npmjs.org/package/simple-mime) — tiny mime types detector.
