/**
 * Created by saurabhPC on 07-Jul-16.
 */

angular.module('prozo.rest',['xml'])
  .service('restService', RestService)
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  })
  .constant('appConstants',{
    'BASE_URL1':'http://stagingbiz.prozo.in/api/web/assignment/',
    'BASE_URL':'http://localhost:8100/api/',
    'API_KEY':'45c40d5069839657a63c0ffaa69c605b',
    'CANDIDATE_ID':2060
  });

RestService.$inject = ['$http','appConstants'];

function RestService($http,appConstants) {

  this.getStates = function() {
    return $http.get(appConstants.BASE_URL + 'states/1',{cache:true});
  };

  this.getCities = function (state_id) {
    return $http.get(appConstants.BASE_URL + 'cities/'+ state_id,{cache:true});
  };

  this.registerUser = function (user) {
    user.apiKey = appConstants.API_KEY;
    user.candidate_id = appConstants.CANDIDATE_ID;
    user.state_id = user.state.id;
    user.city_id = user.city.id;
    delete user.state;
    delete user.city;

    return $http.post(appConstants.BASE_URL + 'users/register-user-demo',user);
  };

  this.getUserDetails = function (candidate_id) {
    candidate_id = candidate_id || appConstants.CANDIDATE_ID;
    return $http.get(appConstants.BASE_URL + 'users/get-user-demo',{
      params:{
        user_id:candidate_id,
        apiKey:appConstants.API_KEY
      }
    });
  }
}
