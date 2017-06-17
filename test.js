const save = require('./')
const uri2b = require('data-uri-to-buffer')
const ab2b = require('arraybuffer-to-buffer')
const b2ab = require('buffer-to-arraybuffer')
const isBrowser = require('is-browser')

let flag = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAAe0lEQVR42qTSMQoDMQwEwF2fIOnumpR5YL6QJ+VHaY4Uac+QA4NlhJU3WN5+EMuK7o5QWmsJE5nC8vnmZeEoI1mryuP5Wrdr72PNU0rnWeTIVVsfxyylynv/kRzvS+8md8tACLsx3y4BTEDdZXUNjERAHWJg7LJNPsl/APPXM48wIF0VAAAAAElFTkSuQmCC`


save(flag, 'flag-uri.jpg')
save(uri2b(flag), 'flag-buf.jpg')
save(b2ab(uri2b(flag)), 'flag-abuf.jpg')

if (isBrowser) {
	//file
	save(new File([b2ab(uri2b(flag))], 'flag-file.jpg'))

	//blob
	save(new Blob([b2ab(uri2b(flag))]), 'flag-blob.jpg')
}
