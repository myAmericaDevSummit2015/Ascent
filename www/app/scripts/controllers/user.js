angular.module('myAmericaApp').controller('UserCtrl', function($scope, $rootScope, $cookies, users) {
	$rootScope.user = {};

	if ($cookies['userName']) {
		logIn($cookies['userName']);
	}

	function logIn(userName) {
		users.query({userName: userName}, function(users) {
			if (users.length > 0) {
				$rootScope.loggedIn = true;
				$rootScope.user = users[0];
				$scope.user = $rootScope.user;

				$cookies['userName'] = userName;
			}
		});		
	}

	$scope.logIn = logIn;

	$scope.logOut = function() {
		$cookies['userName'] = null;;
		$rootScope.loggedIn = false;
		$rootScope.user = {};
	}

});