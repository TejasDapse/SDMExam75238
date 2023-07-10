const express = require('express')
const cors = require('cors')
const config = require('config');

const empsRelatedRoutes = require('./routes/emps');


const app = express()
app.use(cors('*'))

app.use(express.json());

// app.get('/', (request, response) => {
//   response.send('This is Exam')
// })

app.use('/emps',empsRelatedRoutes)

app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000')
})