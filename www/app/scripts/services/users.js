'use strict';

angular.module('myAmericaApp').factory('users', function(SERVER_API, $resource) {
	var users = $resource(SERVER_API.HOST + '/users');

	return users;
});