var MongoClient=require('mongodb').MongoClient;
var assert=require('assert');
var ObjectId=require('mongodb').ObjectID;
var url='mongodb://127.0.0.1:27017/test';

MongoClient.connect(url,function(err,db){
	assert.equal(null,err);
	
	if(!!err){
		console.log(err)
	}
	
	console.log('Connection to server established');
	
	var bankData=db.collection('bank_data');
	
	bankData.insert({
		first_name:'Yusuf',
		last_name:'Kelo',
		accounts:[
			{
				account_balance:'50000000',
				account_type:'Investment',
				currency:'USA'
			}
		]
	},function(err,result){
		if(err){
			return console.error(err);
		}
		console.log('inserted: ');
		console.log(result);
		close();
		return console.log('inserted '+result.length + ' docs');
	})
	
	function close(params) {
		return db.close();
	}
	//return db.close();
})