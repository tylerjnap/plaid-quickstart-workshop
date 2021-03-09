# Plaid Quickstart Workshop

## Local Development

This repo runs on node `12.20.1`. Use [nvm](https://github.com/creationix/nvm) for node versioning and to use `12.20.1`:

```
$ nvm use 12.20.1
```

This repo utilizes [npm](https://www.npmjs.com/) to build, run, and test the application. To get started, use npm to install the dependencies and bootstrap any necessary resources:

```
$ npm install
```

Create a `.env` in the root directory of this repo and add your client ID and secret found [here in Plaid's dashboard](https://dashboard.plaid.com/team/keys)

```
CLIENT_ID = 'INSERT_CLIENT_ID'
SECRET = 'INSERT_SECRET'
```

Start app and navigate to `localhost:3000`:

```
npm start
```