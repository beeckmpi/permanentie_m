//Methods
Meteor.methods({
  toevoegen: function(data){
  	var d = new Date();
  	var user = Meteor.user();
  	data.createdAt = d;
  	data.username = user.username;
  	data.fichenummer = d.getFullYear()+'/'+data.district+'/'+d.getTime();
  	Documenten.insert(data, function( error, result) {
  		if (error) console.log(error);
  		$('#message').html('Het document werd opgeslagen.').css('display', 'inherit');
  	});
  }, 
  bewerken: function(data){
  	var d = new Date();
  	var user = Meteor.user();
  	data.lastUpdated = d;
  	data.lastUpdatedBy = user.username;
  	Documenten.update({_id: data._id}, data, function(error, result){
  		if (error) console.log(error);
  		$('#message').html('Het document werd opgeslagen.').css('display', 'inherit');
  	});
  }
});