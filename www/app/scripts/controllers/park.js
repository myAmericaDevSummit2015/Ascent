angular.module('myAmericaApp').controller('ParkCtrl', function($scope, $rootScope, $location,
	$routeParams, recarea, locations) {
	
	recarea.get({id: $routeParams.parkId}, function(recarea) {
		$scope.recarea = recarea;
		findPhotos(recarea);
	});

  	var flickr = new Flickr({api_key: 'ADD_API_KEY_HERE'});

  	function checkIn() {
		navigator.geolocation.getCurrentPosition(function(geoposition) {
			locations.save({
				clan: $rootScope.user.clan,
				fromCamera: false,
				latitude: geoposition.coords.latitude,
				longitude: geoposition.coords.longitude,
				recAreaId: recarea.RecAreaID,
				score: 1,
				userName: $rootScope.user.userName
			}, function() {
				$location.path('/map/user');
			});
		});
  	}

  	$scope.checkIn = checkIn;

  	function findPhotos(recarea) {
    	var lat = recarea.RecAreaLatitude;
	  	var lng = recarea.RecAreaLongitude;
  		var radius = 5;

	  	flickr.photos.search({
	  		media: 'photos',
	  		lat: lat,
	  		lng: lng,
	  		text: 'national park',
	  		radius: radius
	  	}, function(err, result) {
	  		$scope.photos = [];
	  		result.photos.photo.forEach(function(photo) {
	  			if ($scope.photos.length >= 10) {
	  				return;
	  			}
	  			var url = 'https://farm' + photo.farm 
	  			+ '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
	  			$scope.photos.push(url);
	  		});

	  		$scope.$apply();

	  		$('#photoCarousel').slick({
	  			infinite: true,
	  			slidesToShow: 5,
	  			slidesToScroll: 1,
	  			variableWidth: true
	  		});
	  	});
  	}

});