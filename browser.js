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
	if (typeof filename === 'function') {
		done = filename
		filename = null
	}

	//create blob, if not already
	if (!isBlob(data) && !(data instanceof File)) {
		data = ab(data)
		var mime = getMimeType(filename)
		var blob = new Blob([data], {type: mime})
	}
	else {
		blob = data
	}

	if (planned) {
		return planned.then(function () {
			planned = save(data, filename, done)
			return planned
		}, function (err) {
			done && done(err)
		})
	}
	else {
		planned = new Promise(function (ok, nok) {

			saveAs(blob, filename)

			//prompt next dialog only when window got focus back
			window.addEventListener('focus', function resolve() {
				planned = null
				window.removeEventListener('focus', resolve)
				done && done(null, data)
				ok()
			})
		})

		return planned
	}
}
