'use strict'

const save = require('./')
const saveSync = save.saveSync
const uri2b = require('data-uri-to-buffer')
const ab2b = require('arraybuffer-to-buffer')
const b2ab = require('buffer-to-arraybuffer')
const isBrowser = require('is-browser')
var del = require('del')
var exists = require('path-exists')
var t = require('tape')

let flag = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAAe0lEQVR42qTSMQoDMQwEwF2fIOnumpR5YL6QJ+VHaY4Uac+QA4NlhJU3WN5+EMuK7o5QWmsJE5nC8vnmZeEoI1mryuP5Wrdr72PNU0rnWeTIVVsfxyylynv/kRzvS+8md8tACLsx3y4BTEDdZXUNjERAHWJg7LJNPsl/APPXM48wIF0VAAAAAElFTkSuQmCC`

t('async', async t => {
	await Promise.all([
		save(flag, 'flag-uri.jpg'),
		save(uri2b(flag), 'flag-buf.jpg'),
		save(b2ab(uri2b(flag)), 'flag-abuf.jpg'),
		save(b2ab(uri2b(flag)), 'flag-abuf')
	])

	if (!isBrowser) {
		t.ok(await exists('./flag-uri.jpg'))
		t.ok(await exists('./flag-buf.jpg'))
		t.ok(await exists('./flag-abuf.jpg'))
		t.ok(await exists('./flag-abuf'))

		await del('./flag-uri.jpg')
		await del('./flag-buf.jpg')
		await del('./flag-abuf.jpg')
		await del('./flag-abuf')
	}

	t.end()
})

t('sync', async t => {
	saveSync(flag, 'flag-uri.jpg'),
	saveSync(uri2b(flag), 'flag-buf.jpg'),
	saveSync(b2ab(uri2b(flag)), 'flag-abuf.jpg'),
	saveSync(b2ab(uri2b(flag)), 'flag-abuf')

	if (!isBrowser) {
		t.ok(await exists('./flag-uri.jpg'))
		t.ok(await exists('./flag-buf.jpg'))
		t.ok(await exists('./flag-abuf.jpg'))
		t.ok(await exists('./flag-abuf'))

		await del('./flag-uri.jpg')
		await del('./flag-buf.jpg')
		await del('./flag-abuf.jpg')
		await del('./flag-abuf')
	}

	t.end()
})

t('file, blob', t => {
	if (!isBrowser) return t.end()
	//file
	save(new File([b2ab(uri2b(flag))], 'flag-file.jpg'), (err, data) => t.ok(data))

	//blob
	save(new Blob([b2ab(uri2b(flag))]), 'flag-blob.jpg', (err, data) => t.ok(data))

	t.end()
})

t('ArrayBuffer, Uint8Array etc inputs')
