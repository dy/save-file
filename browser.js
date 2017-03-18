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

module.exports = function save (data, filename, mime) {
	data = ab(data)
	if (mime == null) mime = getMimeType(filename)
	var blob = new Blob([data], {type: mime})

	saveAs(blob, filename, mime)
}
