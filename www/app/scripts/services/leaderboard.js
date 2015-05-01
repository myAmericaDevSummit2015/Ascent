'use strict';

angular.module('myAmericaApp').factory('leaderboard', function($resource, SERVER_API) {
	var leaderboard = $resource(SERVER_API.HOST + '/users/leaderboard');

	return leaderboard;
});