/* All Database Connections / Configurations */
'use strict';

require('dotenv').config();
const rekuire = require('rekuire');
const Logger = rekuire('Logger');

/* Database Services */
let TestMySQL = rekuire('TestMySQL');

const db = {
	init: (app) => {
		return new Promise(async (resolve, reject) => {
			/* Insert DB Connections Here */
			/* TestMySQL */
			if (process.env.SKIP_TEST_MYSQL != 'true') {
				Logger.log('info', '[TestMySQL] Connecting to database');
				let mysqlConnect = TestMySQL.connect();
				mysqlConnect.then((connect) => {
					Logger.log('info', '[TestMySQL] Database connected', connect);
				}).catch((error) => {
					Logger.log('error', '[TestMySQL] Database error in connection', error);
				});
			}
			resolve({ DB: true });
		}).catch((e) => {
			reject(e.message)
		});
	}
}

module.exports = db;
