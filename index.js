/**
 * Save file in node
 *
 * @module save-file
 */
'use strict'

var writeFile = require('write')
var ab = require('to-array-buffer')
var isBuffer = require('is-buffer')

module.exports = save
module.exports.save = save

function save (data, filename, write) {
	// swap data/filename
	if (typeof data === 'string') {
		// writing string to string - take the lengthier
		if (typeof filename !== 'string' || filename.length > data.length) {
			var x = filename
			filename = data
			data = x
		}
	}

	if (!isBuffer(data)) {
		data = Buffer.from(ab(data) || data)
	}

	if (!write) write = writeFile
	return write(filename, data)
}

module.exports.saveSync = function saveSync (data, filename) {
	return save(data, filename, writeFile.sync)
}
