var app = angular.module('authSampleApp', ['ngRoute', 'satellizer']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'templates/home.html'
    	})
    	.when('/signup', {
    		templateUrl: 'templates/signup.html',
        controller: 'AuthCtrl'
    	})
    	.when('/login', {
    		templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
    	})
      .when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

app.controller('MainCtrl', ['$scope', '$auth', '$http', '$location',
	function ($scope, $auth, $http, $location) {
    $scope.isAuthenticated = function() {
      // send GET request to '/api/me'
      $http.get('/api/me')
        .then(function (response) {
          // if response.data comes back, set $scope.currentUser = response.data
          if (response.data) {
            $scope.currentUser = response.data;
          } else {
            // otherwise remove token (https://github.com/sahat/satellizer#authremovetoken)
            $auth.removeToken();
          }
        }, function (error) {
          console.error(error);
          $auth.removeToken();
        });
    };

    $scope.isAuthenticated();

    $scope.logout = function() {
      // logout (https://github.com/sahat/satellizer#authlogout)
      $auth.logout()
        .then(function() {
          // remove token
          $auth.removeToken();
          // set $scope.currentUser = null
          $scope.currentUser = null;
          // redirect to '/'
          $location.path('/');
        });
    };
  }]
);

app.controller('AuthCtrl', ['$scope', '$auth', '$location',
  function ($scope, $auth, $location) {
    // if $scope.currentUser, redirect to '/profile'
    if ($scope.currentUser) {
      $location.path('/profile');
    }

    // clear sign up / login forms
    $scope.user = {};

    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response.data.token);
          $scope.isAuthenticated();
          $scope.user = {};
          $location.path('/profile');
        }, function (error) {
          console.error(error);
        });
    };

    $scope.login = function() {
      $auth.login($scope.user)
        .then(function (response) {
          $auth.setToken(response.data.token);
          $scope.isAuthenticated();
          $scope.user = {};
          $location.path('/profile');
        }, function (error) {
          console.error(error);
        });
    };
  }]
);

app.controller('ProfileCtrl', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
	  if (!$scope.currentUser) {
	  	$location.path('/login');
	  }
}]);