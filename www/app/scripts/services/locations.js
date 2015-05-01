'use strict';

angular.module('myAmericaApp').factory('locations', function($resource, SERVER_API) {
	var locations = $resource(SERVER_API.HOST + '/locations');

	return locations;
});