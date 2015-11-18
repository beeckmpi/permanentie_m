Documenten = new Mongo.Collection('documenten');

if (Meteor.isClient) {
  Template.Toevoegen.onRendered(function(){
    $('#panel1a').css('display', 'inherit');
    $('.tab1').addClass('selected').append('<span class="glyphicon glyphicon-chevron-right" style="position:absolute; top: 8px; right: 8px;"></span>');
  });
  Template.Toevoegen.events({
    'click .tabs dd': function (event, template) {
      $this = $(event.target);
      var className = $this.attr('class');      
      var tabPane = {tab1: 'panel1a', tab2: 'panel2a', tab3: 'panel3a', tab4: 'panel4a', tab5: 'panel5a', tab6: 'panel6a', tab7: 'panel7a', tab8: 'panel8a', tab9: 'panel9a'};
      $('.tab-pane').css('display', 'none');
      $('.tabs dd').removeClass('selected');
      $('.tabs dd span').remove();
      if(!className){
        var tab = 'panel1a';
      } else {
        var tab = tabPane[className];      
      }      
      $('#'+tab).css('display', 'inherit');
      $this.addClass('selected').append('<span class="glyphicon glyphicon-chevron-right" style="position:absolute; top: 8px; right: 8px;"></span>');
    },
    'change #edit-op-vraag-van': function(event){
    	if ($('#edit-op-vraag-van option:selected').val() == "Andere"){
    		$('#op_vraag_van_andere').css('display', 'inherit');
    	} else {
    		$('#op_vraag_van_andere').css('display', 'none');
    	}
    },
    'change #melding': function(event){
    	if ($('#melding option:selected').val() == "Andere"){
    		$('#melding_andere').css('display', 'inherit');
    	} else {
    		$('#melding_andere').css('display', 'none');
    	}
    },
    'submit #toevoegen': function(event, template){
    	event.preventDefault();
    	var data = $('#toevoegen').serializeJSON();
    	console.log(data);
    	Meteor.call('toevoegen', data);
    }
  });
  
  Template.Bewerken.onRendered(function(){
    $('#panel4a').css('display', 'inherit');
    $('.tab4').addClass('selected').append('<span class="glyphicon glyphicon-chevron-right" style="position:absolute; top: 8px; right: 8px;"></span>');
  });
  Template.Bewerken.events({
  	'click .tabs dd': function (event, template) {
      $this = $(event.target);
      var className = $this.attr('class');      
      var tabPane = {tab1: 'panel1a', tab2: 'panel2a', tab3: 'panel3a', tab4: 'panel4a', tab5: 'panel5a', tab6: 'panel6a', tab7: 'panel7a', tab8: 'panel8a', tab9: 'panel9a'};
      $('.tab-pane').css('display', 'none');
      $('.tabs dd').removeClass('selected');
      $('.tabs dd span').remove();
      if(!className){
        var tab = 'panel4a';
      } else {
        var tab = tabPane[className];      
      }      
      $('#'+tab).css('display', 'inherit');
      $this.addClass('selected').append('<span class="glyphicon glyphicon-chevron-right" style="position:absolute; top: 8px; right: 8px;"></span>');
    },
    'submit #bewerken': function(event, template){
    	event.preventDefault();
    	var data = $('#bewerken').serializeJSON();
    	console.log(data);
    	Meteor.call('bewerken', data);
    },
    'click .andere': function (event, template) {
      $this = $(event.target);
      if ($this.prop('checked')){
        $this.parent().next('input').css('display', 'inherit');
      } else {
        $this.parent().next('input').val('').css('display', 'none');
      }
    },
    'click .groep_chbx': function(event, template){
      $this = $(event.target);
      if ($this.prop('checked')){
        $this.parents('.checkbox').next('div').css('display', 'inherit');
      } else {
        $this.parents('.checkbox').next('div').css('display', 'none');
      }
    }
  });
  Template.createUser.events({
   'submit #register-form': function(event, template){
     event.preventDefault();
     var data = {
       email: event.target.email.value,
       password: event.target.password.value,
       username: event.target.username.value,
       profile:{
         rol: event.target.rol.value,
         locatie: event.target.standplaats.value, 
         naam: event.target.naam.value        
       }
     };
     console.log(data);
     Accounts.createUser(data, function(err){
       if (err) {
         console.log(err);
         $('#messages').html(err).css('display', 'inherit');
       } else {
         $('#messages').html('You have successfully created an account. in a couple of minutes a mail will be sent to confirm your account.').css('display', 'inherit');
       }
     });
     return false;
   }
   });
   Template.login.events({
	    'submit form': function(event){
	        event.preventDefault();
	        var email = $('[name=username]').val();
	        var password = $('[name=password]').val();
	        Meteor.loginWithPassword(email, password);
	    }
	});	
	Template.zijbar.events({
		'click #nieuweFiche': function(event){
			Router.go('toevoegen');
		}
	});
	Template.zijbar.helpers({
		equals: function(v1, v2) {
	        return (v1 === v2);
	    }
	});
	Template.Document.helpers({
		equals: function(v1, v2) {
	        return (v1 === v2);
	    }
	});
	Template.Toevoegen.helpers({
		personen: function(){
			Meteor.subscribe('directory');
			Meteor.subscribe('documenten');
			return Meteor.users.find({}, {fields: {emails: 1, username:1, profile: 1}});
	    },
	    dateTime: function(){
	    	function addZero(i) {
			    if (i < 10) {
			        i = "0" + i;
			    }
			    return i;
			}
	    	var d = new Date();
	    	var date = d.toISOString().slice(0,10);
	    	var t = addZero(d.getHours())+':'+addZero(d.getMinutes())+':00';
	    	return {date: date, time: t};
	    }
	});
	Template.Bewerken.helpers({
		checked: function(optionText, selectedValue){
	      if(optionText === selectedValue){
	        return 'checked';
	      }
	    }
	});
	Template.fiches.helpers({
		documenten: function(){
			Meteor.subscribe('documenten');
			var user = Meteor.user();
			var type = Session.get("type");			
			if (type == "Mijn fiches"){
				return Documenten.find({username: user.username}, {sort:{createdAt: -1}, limit: 25});
			} else if (type == "Ontvangen fiches"){
				return Documenten.find({'doorgegeven_aan': user.username}, {sort:{createdAt: -1}, limit: 25});
			} else if (type == "Alle fiches"){
				return Documenten.find({}, {sort:{createdAt: -1}, limit: 25});
			}
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish("directory", function () {
	return Meteor.users.find({}, {fields: {emails: 1, username:1, profile: 1}});
  });
  Meteor.publish("documenten", function () {
	return Documenten.find({});
  });
}
