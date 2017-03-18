/**
 * Save file in browser
 *
 * @module save-file/browser
 */
'use strict'

const saveAs = require('file-saver')

module.exports = function save (data, filename) {
	//TODO: convert buffer/arrayBuffer/array/blob/file to proper format
	saveAs(data, filename)
}

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
window.requestFileSystem(window.TEMPORARY, arrayBuffer.byteLength, function(fs) {
fs.root.getFile(fileName, {create: true}, function(fileEntry) {
	fileEntry.createWriter(function(writer) {
		var dataView = new DataView(arrayBuffer);
		var blob = new Blob([dataView], {type: 'font/opentype'});
		writer.write(blob);

		writer.addEventListener('writeend', function() {
			// Navigating to the file will download it.
			location.href = fileEntry.toURL();
		}, false);
	});
	});
},
function(err) {
	throw new Error(err.name + ': ' + err.message);
});
