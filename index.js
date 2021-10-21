const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config();

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

const path = require('path')
const util = require('util')

const plaid = require('plaid')

// console.log(process.env.CLIENT_ID)
// console.log(process.env.SECRET)

const plaidClient = new plaid.Client({
	clientID: process.env.CLIENT_ID,
	secret: process.env.SECRET,
	env: plaid.environments.development
})

app.get('/create-link-token', async(req, res)=>{
	//rename link_token to linkToken
	const {link_token: linkToken} = await plaidClient.createLink({
		user: {
			client_user_id: ''
		},
		client_name: 'App of Olympia',
		products: ['auth', 'identity'],
		country_codes: ['US'],
		language: 'en'
	})
	res.json({linkToken})
})


app.get('/', async(req, res)=> {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, ()=>{ //callback function
    console.log('listening on port: ', PORT)
})