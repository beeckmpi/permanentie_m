var OnBeforeActions;

OnBeforeActions = {
  loginRequired: function(route, asd, pause) {
    if (!Meteor.userId()) {
      this.render('Login');
    } else {
      this.next();
    }
  }
};
Router.onBeforeAction(OnBeforeActions.loginRequired, {
  except: ['login']
});

Router.route('/', function () {
  this.render('Start');
});
Router.route('/toevoegen', function () {
  this.render('Toevoegen');
});
Router.route('/gebruikerAanmaken', function () {
  this.render('createUser');
});
Router.route('/afmelden', function () {
  Meteor.logout();
  Router.go('/');
});

Router.route('/mijnFiches', function () {
  Meteor.subscribe("documenten");  
  var data = {type: "Mijn fiches"};
  Session.set("type", "Mijn fiches");
  this.render('fiches', {data: data});
});
Router.route('/ontvangenFiches', function () {
  Meteor.subscribe("documenten");  
  var data = {type: "Ontvangen fiches"};
  Session.set("type", "Ontvangen fiches");
  this.render('fiches', {data: data});
});
Router.route('/alleFiches', function () {
  Meteor.subscribe("documenten");  
  var data = {type: "Alle fiches"};
  Session.set("type", "Alle fiches");
  this.render('fiches', {data: data});
});
Router.route('/documenten/:id', function(){
	Meteor.subscribe("documenten");
	var documenten = Documenten.findOne({_id: this.params.id}); 
	this.render('Document', {data: documenten});
});
Router.route('/bewerken_documenten/:id', function(){
	Meteor.subscribe("documenten");
	var documenten = Documenten.findOne({_id: this.params.id}); 
	this.render('Bewerken', {data: documenten});
});

