# save-file [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges) [![Build Status](https://img.shields.io/travis/dy/save-file.svg)](https://travis-ci.org/dy/save-file) [![Greenkeeper badge](https://badges.greenkeeper.io/dy/save-file.svg)](https://greenkeeper.io/)

Save file in node/browser. In browser it prompts save file dialog, in node it creates a file.

* Provides common interface for both node/browser.
* Fixes dialog race in browser − when multiple save-files are called at the same time.
* Handles any types of input data − _Buffer_, _ArrayBuffer_, _ArrayBufferView_, _File_, _Blob_, data-uri string, _ImageData_ etc.

## Usage

[![npm install save-file](https://nodei.co/npm/save-file.png?mini=true)](https://npmjs.org/package/save-file/)

```js
// const save = require('save-file')
import { save } from 'save-file'

await save(data, 'example.mp3')

const saveSync = require('save-file/sync')
saveSync(otherData, 'example2.mp3')
```

## API

### `await save(data|filename, filename|data)`

Save `data` source to the `filename` destination, return actual saved _ArrayBuffer_. `saveSync` performs synchronous call.

`data` type can be:
* _Buffer_, _ArrayBuffer_
* _File_, _Blob_
* dataURI, base64 string
* _TypedArray_, _Array_
* _ImageData_, _AudioBuffer_
* _Object_
* [ndarray](https://github.com/scijs/ndarray)
* etc.

See [to-array-buffer](https://github.com/dy/to-array-buffer) for the full list. The data is expected to be encoded to target format, for that purpose see [image-encode](https://ghub.io/image-encode), [audio-encode](https://ghub.io/audio-encode) etc.

Mime type is detected from the file extension/data type automatically.


## Credits & related

* [file-saver](https://npmjs.org/package/file-saver) − create download file dialog in browser.
* [write](https://npmjs.org/package/write) − write file in node, create directories if none.
* [to-array-buffer](https://github.com/dy/to-array-buffer) — turn anything into ArrayBuffer.
* [simple-mime](https://npmjs.org/package/simple-mime) — tiny mime types detector.

## Copyright

© Dmitry Yv 2018. MIT Licensed.
