/**
 * Save file in browser
 *
 * @module save-file/browser
 */
'use strict'

var saveAs = require('file-saver').saveAs
var toBlob = require('./src/to-blob')

var planned = null

module.exports = save
module.exports.save = save
module.exports.saveSync = saveSync

function save (data, filename) {
	// swap data/filename
	if (typeof data === 'string') {
		// writing string to string - take the lengthier
		if (typeof filename !== 'string' || filename.length > data.length) {
			var x = filename
			filename = data
			data = x
		}
	}

	var blob = toBlob(data, filename)

	if (planned) {
		return planned.then(function () {
			planned = save(data, filename)
			return planned
		})
	}
	else {
		planned = new Promise(function (ok, nok) {

			saveAs(blob, filename)

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

function saveSync (data, filename) {
	return saveAs(toBlob(data, filename), filename)
}
