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
var detectType = require('file-type')

var planned = null

module.exports = save
module.exports.sync = saveSync

function save (data, filename, done) {
	if (typeof filename === 'function') {
		done = filename
		filename = null
	}

	var blob = toBlob(data, filename)

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

function saveSync (data, filename) {
	return saveAs(toBlob(data, filename), filename)
}

function toBlob (data, filename) {
	//create blob, if not already
	if (!isBlob(data) && !(data instanceof File)) {
		data = ab(data)
		var mime = getMimeType(filename || '')
		data = new Blob([data], {type: mime})
	}

	return data
}
