const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const itemRoute = require('./src/routes/items')
app.use('/items', itemRoute)

const categoryRoute = require('./src/routes/category')
app.use('/category', categoryRoute)

const variantRoute = require('./src/routes/variant')
app.use('/variant', variantRoute)

app.listen(6969, () => {
  console.log('running 6969')
})
