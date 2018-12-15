'use strict'

var ab = require('to-array-buffer')
var getMimeType = require('simple-mime')('application/octect-stream')
var isBlob = require('is-blob')

module.exports = function toBlob (data, filename) {
	//create blob, if not already
	if (!isBlob(data) && !(data instanceof File)) {
		data = ab(data)
		var mime = getMimeType(filename || '')
		data = new Blob([data], {type: mime})
	}

	return data
}
