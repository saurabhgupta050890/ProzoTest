// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.app
// 'starter.controllers' is found in controllers.app
angular.module('prozoApp', ['ionic', 'prozo.registration', 'prozo.rest'])

  .run(function($ionicPlatform,$rootScope,$ionicLoading) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: '<ion-spinner></ion-spinner>'})
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    });
  })

  .config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push(function($rootScope) {
      return {
        request: function(config) {
          $rootScope.$broadcast('loading:show');
          return config
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide');
          return response
        }
      }
    });

    $stateProvider

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'app/welcome/welcome.tpl.html'
      })
      .state('register', {
        url: '/register',
        templateUrl:'app/register/register.tpl.html',
        controller:'UserRegistrationCtrl'
      })

      .state('success', {
        url: '/success',
        templateUrl:'app/register/success.tpl.html',
        params:{candidate_id:null},
        controller:'RegistrationSuccessCtrl'
      });
      /*.state('home', {
        url: '/home',
        templateUrl:'app/home/home.tpl.html',
        controller:'HomeCtrl'
      });*/

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');

  }])
  .controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$scope','$state'];

function AppCtrl($scope,$state) {
  $scope.register = function() {
    $state.go('register');
  }
}
