'use strict'

angular.module('myAmericaApp')
.factory('recareas', function($resource, RIDB_API) {
	var recareas = $resource(RIDB_API.HOST + '/recareas', {apikey: RIDB_API.KEY});

	return recareas;
});