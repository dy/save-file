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
module.exports.sync = saveSync

function save (data, filename, write) {
	if (!isBuffer(data)) {
		data = Buffer.from(ab(data) || data)
	}

	if (!write) write = writeFile
	return write(filename, data)
}

function saveSync (data, filename) {
	return save(data, filename, writeFile.sync)
}
