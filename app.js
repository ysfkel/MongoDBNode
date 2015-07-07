var MongoClient=require('mongodb').MongoClient;
var assert=require('assert');
var ObjectId=require('mongodb').ObjectID;
var url='mongodb://127.0.0.1:27017/test';

MongoClient.connect(url,function(err,db){
	assert.equal(null,err);
	
	console.log('Connection to server established');
	
	return db.close();
})