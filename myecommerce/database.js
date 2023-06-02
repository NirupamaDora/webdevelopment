const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'ecommerce',
	user : 'root',
	password : 'Nirupama@8080'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;