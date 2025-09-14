const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routers/auth.routes')
const profileRoutes= require('./routers/person.routes')
const facultyRoutes = require('./routers/faculty.routes')
const departmentRoutes = require('./routers/department.routes')
const cookieParser= require('cookie-parser')
const bodyParser = require('body-parser');


require('dotenv').config()


const app =express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());


app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/department', departmentRoutes)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'myschool'
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})



app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
