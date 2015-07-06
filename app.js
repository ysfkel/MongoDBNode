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
				account_balance:50000000,
				account_type:'Investment',
				currency:'USA'
			}
		]
	},function(err,docs){
		if(err){
				close();
			return console.error(err);
		}
		console.log('inserted: ');
		console.log(docs);
		
		var updatedPerson=docs[0];
	    updatedPerson.accounts[0].account_balance +=1000000;
		//{w:1} is write concern 0,1,2
		bankData.update({_id:new ObjectId(updatedPerson._id)},updatedPerson,{w:1},function(err,count) {
			if(err){
				return console.error(err);
			}
			console.log(count+' document updated successfully');
			
			bankData.findOne({_id:new ObjectId(updatedPerson._id)},function(err,doc) {
				if(err){
					close();
					return console.error(err);
				}
				console.log('READ ONE ITEM')
				console.log(doc)
				
				bankData.remove({_id:new ObjectId(updatedPerson._id)},function(err,count) {
					if(err){
						close();
						return console.error(err);
					}
					console.log('removed '+count+' item')
					close();
				})
				
			})
			
		})
		
		
		return console.log('inserted '+docs.length + ' docs');
	})
	
	function close(params) {
		return db.close();
	}

})