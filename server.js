const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://127.0.0.1:27017/login-app-db').then(()=> {console.log('Mongoose connected')}).catch(err => console.log(err))
//ds
const app = express()
app.use('/', express.static(path.join(__dirname,'static')))
app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
    
    //console.log('Log message of /api/register:', req.body)
    const {username, password: plainTextPassword} = req.body
    if(!username || typeof username !== 'string')
    {
        return res.json({status: 'error', error: 'Invalid username datatype'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string')
    {
        return res.json({status: 'error', error: 'Invalid password datatype'})
    }
    if(plainTextPassword.length < 5)
    {
        return res.json({status: 'error', error: 'Invalid Password length'})
    }
    const password =  await bcrypt.hash(plainTextPassword, 10)
    try{
        const response = await User.create({
            username,
            password
        })
        console.log('User created succesfully:', response)
    }catch(error){
        if(error.code === 11000)
        {
            return res.json({status: 'error', error: 'Duplicate key'})
        }
        throw error
        //console.log(JSON.stringify(error))
       // return res.json({status: 'error'})
    }

    res.json({ status : 'ok' })
})

app.listen(9999, ()=> {
    console.log('Server up at 9999')
})

