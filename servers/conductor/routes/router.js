const Router = require('express')
const router = new Router()
const text_inputRouter = require('./text_inputRouter')


router.use('/text_input', text_inputRouter)

module.exports = router
