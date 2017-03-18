/**
 * Save file in browser
 *
 * @module save-file/browser
 */
'use strict'

var saveAs = require('file-saver').saveAs
var ab = require('to-array-buffer')
var isBuffer = require('is-buffer')
var getMimeType = require('simple-mime')('application/octect-stream');
var isBlob = require('is-blob')

var planned = null

module.exports = function save (data, filename, mime) {
	if (planned) {
		return planned.then(function () {
			planned = save(data, filename, mime)
			return planned
		})
	}
	else {
		planned = new Promise(function (ok, nok) {
			if (!isBlob(data)) {
				data = ab(data)
				if (mime == null) mime = getMimeType(filename)
				var blob = new Blob([data], {type: mime})
			}
			else {
				mime = data.type
			}

			saveAs(blob, filename, mime)

			//prompt next dialog only when window got focus back
			window.addEventListener('focus', function resolve() {
				planned = null
				window.removeEventListener('focus', resolve)
				ok()
			})
		})

		return planned
	}
}
