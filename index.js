const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

const path = require('path')
const util = require('util')

app.get('/', async(req, res)=> {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, ()=>{ //callback function
    console.log('listening on port: ', PORT)
})