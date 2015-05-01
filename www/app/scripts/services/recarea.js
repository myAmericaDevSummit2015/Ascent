'use strict'

angular.module('myAmericaApp')
.factory('recarea', function($resource, RIDB_API) {
	var recareas = $resource(RIDB_API.HOST + '/recareas/:id', {apikey: RIDB_API.KEY});

	return recareas;
});