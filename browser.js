/**
 * Save file in browser
 *
 * @module save-file/browser
 */
'use strict'

var saveAs = require('file-saver').saveAs
var ab = require('to-array-buffer')
var getMimeType = require('simple-mime')('application/octect-stream');
var isBlob = require('is-blob')

var planned = null

module.exports = function save (data, filename, done) {
	if (planned) {
		return planned.then(function () {
			planned = save(data, filename, done)
			return planned
		})
	}
	else {
		planned = new Promise(function (ok, nok) {
			//create blob, if not already
			if (!isBlob(data)) {
				data = ab(data)
				var mime = getMimeType(filename)
				var blob = new Blob([data], {type: mime})
			}

			saveAs(blob, filename)

			//prompt next dialog only when window got focus back
			window.addEventListener('focus', function resolve() {
				planned = null
				window.removeEventListener('focus', resolve)
				done && done()
				ok()
			})
		})

		return planned
	}
}
