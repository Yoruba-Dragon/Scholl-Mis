const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routers/auth.routes')



require('dotenv').config()


const app =express()

app.use(express.json())
app.use('/api/auth', authRoutes)

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
