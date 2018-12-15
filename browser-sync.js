'use strict'

var saveAs = require('file-saver').saveAs
var toBlob = require('./src/to-blob')

module.exports = saveSync

function saveSync (data, filename) {
	return saveAs(toBlob(data, filename), filename)
}
