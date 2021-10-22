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
		env: plaid.environments.sandbox
	})

	app.get('/create-link-token', async(req, res)=>{
		//rename link_token to linkToken
		const {link_token: linkToken} = await plaidClient.createLinkToken({
			user: {
				client_user_id: process.env.CLIENT_ID
			},
			client_name: 'App of Olympia',
			products: ['auth', 'identity'],
			country_codes: ['US'],
			language: 'en'
		})
		res.json({linkToken})
	})


	app.post('/token-exchange', async(req, res) =>{
		//grab public token
		const { publicToken} = req.body;
		//exchange public token for access token
		const {access_token:accessToken} = await plaidClient.exchangePublicToken(publicToken)
		const authResponse = await plaidClient.getAuth(accessToken)
		console.log('----------------')
		console.log('Auth response: ')
		console.log(util.inspect(authResponse, false, null, true))

		const identityResponse = await plaidClient.getIdentity(accessToken)
		console.log('----------------')
		console.log('Identity response: ')
		console.log(util.inspect(identityResponse, false, null, true))

		const balanceResponse = await plaidClient.getBalance(accessToken)
		console.log('----------------')
		console.log('Balance response: ')
		console.log(util.inspect(balanceResponse, false, null, true))

		res.sendStatus(200)

	})


	app.get('/', async(req, res)=> {
		res.sendFile(path.join(__dirname, 'index.html'))
	})

	app.listen(PORT, ()=>{ //callback function
		console.log('listening on port: ', PORT)
	})