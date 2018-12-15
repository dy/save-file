'use strict'

var save = require('./')
var writeFile = require('write')

module.exports = function saveSync (data, filename) {
	return save(data, filename, writeFile.sync)
}
