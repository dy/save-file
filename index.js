/**
 * Save file in node
 *
 * @module save-file
 */
'use strict'

var writeFile = require('write')
var ab = require('to-array-buffer')
var isBuffer = require('is-buffer')
var isRelative = require('is-relative')
var st = require('stack-trace')
var path = require('path')

module.exports = function save (data, filename) {
	if (!isBuffer(data)) {
		data = Buffer.from(ab(data))
	}

	if (isRelative(filename)) {
		var stack = st.get()

		filename = path.dirname(stack[1].getFileName()) + path.sep + filename
	}

	writeFile.sync(filename, data)

	console.log(filename + ' created')
}
