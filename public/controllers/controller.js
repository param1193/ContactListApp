var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

// "/contactlist" = route that we are going to get data from.
// ".success(function(respsonse)" what to do when it gets back this data.
// "$scope.contactlist = respsonse;" puts data into HTML filw in our browser
 
var refresh = function(){
  $http({
  		method : 'GET',
  		url : '/contactlist'

		}).then(function(response) {
    
    		console.log("I got the data I requested");
    		$scope.contactlist = response.data;
    		
 }, function(error){
 	console.log("Something wrong baby!");
 });
};

refresh();

$scope.addContact = function(){
	console.log($scope.contactlist);
	$http.post('/contactlist', $scope.contact).then(function(response){

		console.log(response);
		refresh();
		$scope.contact="";
	});
};

$scope.remove = function(id){
	console.log(id);
	$http.delete('/contactlist/' + id).then(function(response){
		refresh();
	});
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/contactlist/' +id).then(function(response){
		$scope.contact=response.data;
	});
};

$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
		refresh();
	});
};
}]);﻿