const save = require('../')
const flag = require('./flag')
const data2buf = require('data-uri-to-buffer')
const ab2b = require('arraybuffer-to-buffer')
const b2ab = require('buffer-to-arraybuffer')

save(flag, 'flag-uri.jpg')
save(data2buf(flag), 'flag-buf.jpg')
save(b2ab(data2buf(flag)), 'flag-abuf.jpg')
