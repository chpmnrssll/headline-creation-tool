# [**M**ongo](https://www.mongodb.com/) [**E**xpress](https://expressjs.com/) [**V**ueJS](https://vuejs.org/) [**N**ode](https://nodejs.org/en/) stack.

## A2 Hosting Setup

1. [Get SSH access](https://www.a2hosting.com/kb/getting-started-guide/accessing-your-account/using-ssh-secure-shell)
2. [Install Node.js](https://www.a2hosting.com/kb/installable-applications/manual-installations/installing-node-js-on-managed-hosting-accounts)

3. Install MongoDB from SSH:
```
$ cd ~
$ wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel62-4.0.5.tgz
$ tar xvf mongodb-linux-x86_64-rhel62-4.0.5.tgz
$ cp mongodb-linux-x86_64-rhel62-4.0.5/bin/* ~/bin
```

4. Create ~/mongod.conf with the following:
```
bind_ip = 127.0.0.1
quiet = true
dbpath = db
logpath = logs/mongod.log
logappend = true
```

5. Start mongod in the background with:
```
$ nohup mongod --config ~/mongod.conf &
```

6. Edit/Create /home/username/public_html/.htaccess with the following:
```
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:XXXXX/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:XXXXX/$1 [P,L]
```
In both RewriteRule lines, replace XXXXX with the port on which your Node.js application listens.

**A2 Hosting requires using a port between 30000 and 50000 (inclusive)**

**Subdomains can be redirected to the correct port from CPanel**

## Installation

```
$ git clone https://github.com/chpmnrssll/mevn-stack.git <dir name>
$ cd <dir name>
$ npm install
$ cp .env.example .env
```
Then edit your environment variables in .env as needed.

**A2 Hosting requires using a port between 30000 and 50000 (inclusive)**

**Changing the PORT variable in the .env will require you to change it in the `views/config/http.js` file.**

5. Build and start the Node.js app in the background with:
```
$ npm run build
$ nohup npm start &
```

### Local Setup/Development

Edit your environment variables in .env as needed.

To develop using this project you can run

`npm run dev:serve`

and

`npm run dev:client`

in seperate terminal instances. This will allow hot reloading of both changes to the server and changes to the client.

The server will require you to be running a local instance of [MongoDB](https://www.mongodb.com/).

`npm run static` will build the client-side JavaScript and start the hot reloading of the server environment. `npm run dev:serve` can also be used to just start the API if you are working on that prior to worrying about the client.

#### Scripts

A more detailed breakdown of the scripts are as follows:

| Command `npm run`| Server | Client |
| :------------- |:------------- |:-
| `start`| Static| Static (requires `npm run build`)
| `dev:serve`      	| Hot reload | Static
| `dev:client` 		| None | Hot Reload
| `build` | None | Bundled by Webpack
| `static` | Hot reload | Bundled by Webpack

### Project Structure

##### Backend

`/src`

`--/controllers/`-- Contains controllers for our API resources.
`--/database/`
`----/models/`-- Contains the models for our API Resources using [Mongoose](http://mongoosejs.com/).
`--/middleware/`-- Any middleware you may need can go here.
`--/routes/`-- All route definitions are here.
`----/api.js`-- Routes for the API.
`----/user.js`-- Routes specific to the user resource.

##### Frontend

`/views`
`--/config/http.js`-- Axios config for local request
`--/pages/`-- Separate Component Pages go here.
`--/router/index.js`-- Config for [vue-router](https://github.com/vuejs/vue-router)
`--/App.vue`-- Component that has Nav-Drawer, Footer, and Toolbar wrapped around a router view of other components.
`--/main.js`-- Registers the Vue components and Router
`--/index.html`-- The file we return, has the Vue app in it.

### Dependencies

* Dependencies Via NPM
	* [Axios](https://github.com/axios/axios) For client side HTTP requests
	* [cors](https://github.com/expressjs/cors) For CORS during development
	* [dotenv](https://github.com/motdotla/dotenv) Loads our .env variables
	* [vue](https://vuejs.org/) Realtime data binding on the frontend
	* [vuetify](https://vuetifyjs.com/vuetify/quick-start) Material design for Vue
	* [vue-router](https://github.com/vuejs/vue-router) Router for the SPA

### Existing Routes

All user endpoints are behind the `/api` endpoint.

#### `GET`
`/users` - returns a list of all users inside of an array called `data`.
`/users/:id` - where `:id` is the id of a `user` resource. The resource is then returned in JSON format.

#### `POST`
`/users` - Creates a new `user` resource based on the payload of the request.

#### `DELETE`
`/users/:id` - Delete a user resouce matching the `:id` specified.

#### `PUT`
`/users` - Update a user based on the payload of the request
