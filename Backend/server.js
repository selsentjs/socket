require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
// database
require('./Database/conn')

// routes
const authRoute = require('./routes/authRoutes')
const messageRoute = require('./routes/messageRoutes');

const userRoute = require('./routes/userRoutes');

const app = express()

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoute);
app.use('/api/message',messageRoute);
app.use('/api/users',userRoute)

app.get('/', (req,res) => {
    res.send('Welcome socket app')
})


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})