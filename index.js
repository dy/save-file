/**
 * Save file in node
 *
 * @module save-file
 */
'use strict'

var writeFile = require('write')
var ab = require('to-array-buffer')
var isBuffer = require('is-buffer')

module.exports = function save (data, filename) {
	if (!isBuffer(data)) {
		data = Buffer.from(ab(data))
	}

	writeFile.sync(filename, data)

	console.log(filename + ' created')
}
