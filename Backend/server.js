require('dotenv').config()
const exp = require('constants')
const express = require('express')
require('./Database/conn')
const authRoute = require('./routes/authRoutes')

const app = express()



app.use(express.json());
app.use('/api/auth',authRoute);

app.get('/', (req,res) => {
    res.send('Welcome socket app')
})


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})