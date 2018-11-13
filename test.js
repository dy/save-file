'use strict'

const save = require('./')
const uri2b = require('data-uri-to-buffer')
const ab2b = require('arraybuffer-to-buffer')
const b2ab = require('buffer-to-arraybuffer')
const isBrowser = require('is-browser')
const a = require('assert')
var del = require('del')
var exists = require('path-exists')

let flag = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAAe0lEQVR42qTSMQoDMQwEwF2fIOnumpR5YL6QJ+VHaY4Uac+QA4NlhJU3WN5+EMuK7o5QWmsJE5nC8vnmZeEoI1mryuP5Wrdr72PNU0rnWeTIVVsfxyylynv/kRzvS+8md8tACLsx3y4BTEDdZXUNjERAHWJg7LJNPsl/APPXM48wIF0VAAAAAElFTkSuQmCC`

;(async () => {

await Promise.all([
	save(flag, 'flag-uri.jpg', (err, data) => a.ok(data)),
	save(uri2b(flag), 'flag-buf.jpg', (err, data) => a.ok(data)),
	save(b2ab(uri2b(flag)), 'flag-abuf.jpg', (err, data) => a.ok(data)),
	save(b2ab(uri2b(flag)), 'flag-abuf', (err, data) => a.ok(data))
])

a.ok(await exists('./flag-uri.jpg'))
a.ok(await exists('./flag-buf.jpg'))
a.ok(await exists('./flag-abuf.jpg'))
a.ok(await exists('./flag-abuf'))

del('./flag-uri.jpg')
del('./flag-buf.jpg')
del('./flag-abuf.jpg')
del('./flag-abuf')

})()


if (isBrowser) {
	//file
	save(new File([b2ab(uri2b(flag))], 'flag-file.jpg'), (err, data) => a.ok(data))

	//blob
	save(new Blob([b2ab(uri2b(flag))]), 'flag-blob.jpg', (err, data) => a.ok(data))
}
