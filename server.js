const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/login-app-db')

const app = express()
app.use('/', express.static(path.join(__dirname,'static')))
app.use(bodyParser.json())

app.post('/api/register', (req, res) => {
    
    console.log(req.body)
    const {username, password: plainTextPassword} = req.body
    
    const password =  bcrypt.hash(password, 10)
    //console.log(bcrypt.hash(password, 10))
    res.json({ status : 'ok' })
})

app.listen(9996, ()=> {
    console.log('Server up at 9999')
})

