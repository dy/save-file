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
var path = require('path')
var callsites = require('callsites')
var str2buf = require('data-uri-to-buffer')
var arr2buf = require('typedarray-to-buffer')

module.exports = function save (data, filename, done) {
	if (!isBuffer(data)) {
		try {
			if (typeof data === 'string') {
				data = str2buf(data)
			}
			else if (ArrayBuffer.isView(data)) {
				data = arr2buf(data)
			}
			else {
				data = Buffer.from(ab(data))
			}
		}
		catch (e) {
			data = Buffer.from(data)
		}
	}

	if (isRelative(filename)) {
		var callerPath = callsites()[1].getFileName()
		filename = path.dirname(callerPath) + path.sep + filename
	}

	return new Promise(function (ok, nok) {
		writeFile(filename, data, function (err) {
			if (err) {
				done && done(err)
				nok(err)
			}
			else {
				process.stdout.write(filename + ' created\n')
				done && done(null, data)
				ok()
			}
		})
	})

}
