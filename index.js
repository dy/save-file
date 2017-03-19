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
var callerPath = require('caller-path')
var path = require('path')

module.exports = function save (data, filename, done) {
	if (!isBuffer(data)) {
		data = Buffer.from(ab(data))
	}

	if (isRelative(filename)) {
		filename = path.dirname(callerPath()) + path.sep + filename
	}

	return new Promise(function (ok, nok) {
		writeFile(filename, data, function (err) {
			if (err) {
				nok(err)
			}
			else {
				process.stdout.write(filename + ' created\n')
				done && done(err)
				ok()
			}
		})
	})

}
