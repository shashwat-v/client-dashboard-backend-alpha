const mongoose = require('mongoose');
const { app } = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' })

const start = async () => {
	try {
		await mongoose.connect(process.env.CONNECTIONSTRING);
		console.log("Db Connected");
	} catch (err) {
		console.error(err);
	}
	app.listen(3000, () => {
        console.log("App Started");
	});
};

start();
