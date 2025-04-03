const express = require('express')
const {sampleGet, samplePost} = require('./controllers')
const router = express.Router()

router.get('/', sampleGet)

router.post('/login', samplePost)
module.exports = router