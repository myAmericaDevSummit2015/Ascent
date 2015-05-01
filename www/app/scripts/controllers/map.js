'use strict';

/**
 * @ngdoc function
 * @name myAmericaApp.controller:MapCtrl
 * @description
 * # AboutCtrl
 * Controller of the myAmericaApp
 */
angular.module('myAmericaApp')
  .controller('MapCtrl', function ($scope, $rootScope, $cookies,
    mapboxService, recareas, recarea, locations, users, 
    $location, $timeout, $routeParams) {

  	mapboxService.init({ 
  		accessToken: 'ADD_TOKEN_HERE'
  	});

    $scope.markers = [];

    $scope.$on('$routeChangeSuccess', function() {
      if ($routeParams.param == 'user' && $cookies['userName']) {
        getForUser($cookies['userName']);
      } else if (!$routeParams.param) {
        getAll();
      }
    });


    var styles = {
      normal: {
        color: 'green',
        icon: 'park'
      },
      wolf: {
        color: 'blue'
      },
      bear: {
        color: 'red'
      }
    };

  	$timeout(function() {
	  	var map = mapboxService.getMapInstances()[0];
  	}, 100);

  	function startLoading() {
  		$('#loadingIndicator').show();
  	}
  	function endLoading() {
  		$('#loadingIndicator').hide();
  	}

  	function addMarkers(locations, type) {
      if (!type) {
        type = 'normal';
      }
  		locations.forEach(function(location) {
        var marker = {};

  			if (location.latitude != null && location.latitude != "") {
          marker.location = location;
          marker.color = styles[type].color;
          marker.icon = styles[type].icon;

          if (!marker.location.recArea) {
            recarea.get({id: marker.location.recAreaId}, function(recArea) {
              marker.location.recArea = recArea;
            });
          }

  				$scope.markers.push(marker);
  			}
  		});

      mapboxService.fitMapToMarkers();
  	}

	$scope.locate = function() {
		startLoading();

		navigator.geolocation.getCurrentPosition(function(geoposition) {
			recareas.get({
				latitude: geoposition.coords.latitude,
				longitude: geoposition.coords.longitude,
				radius: 5
			}, function(results) {
        endLoading();

				var recarea = results.RECDATA[0];
        var location = { 
          recArea: recarea,
          latitude: recarea.RecAreaLatitude,
          longitude: recarea.RecAreaLongitude
        };

        $scope.markers = [];
        console.log($scope.markers);
				addMarkers([ location ]);
				$location.path('/park/' + recarea.RecAreaID);
			}, endLoading);
		});
	}

  function getForUser(userName) {
    locations.query({userName: userName}, function(results) {
      $scope.markers = [];
      addMarkers(results, $rootScope.user.clan);
    });
  }

  function getAll() {
    locations.query({}, function(results) {
      var wolfLocations = [], bearLocations = [];

      var num = 0;
      results.forEach(function(result) {
        if (result.clan.indexOf('bear' >= 0)) {
          bearLocations.push(result);
        } else if (result.clan.indexOf('wolf') >= 0) {
          wolfLocations.push(result);
        }
      });

      addMarkers(wolfLocations, 'wolf');
      addMarkers(bearLocations, 'bear');
    })
  }

  });
