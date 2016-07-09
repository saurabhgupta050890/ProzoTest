/**
 * Created by saurabhPC on 09-Jul-16.
 */

angular.module('prozo.registration')

  .controller('RegistrationSuccessCtrl',RegistrationSuccessCtrl);

RegistrationSuccessCtrl.$inject = ['$scope', '$state', '$stateParams', 'restService'];

function RegistrationSuccessCtrl($scope, $state, $stateParams, restService) {
  var candidateID = $stateParams.candidate_id;

  if(candidateID) {
    restService.getUserDetails(candidateID)
      .success(function(data) {
        if(data.status === 'success') {
          $scope.userData = data.user_data;
          findState($scope.userData.state_id);
          findCity($scope.userData.state_id,$scope.userData.city_id);
        }
        console.log(data);
      })
      .error(function(err) {
        console.log(err);
      });
  } else {
    $state.go('register');
  }

  function findState(state_id) {
    restService.getStates()
      .success(function(data) {
        $scope.userData.state =  data.filter(function(val) {
          return val.id === state_id;
        })[0];
      });
  }

  function findCity(state_id,city_id) {
    restService.getCities(state_id)
      .success(function (data) {
        $scope.userData.city = data.filter(function(val) {
          return val.id === city_id;
        })[0];
      });
  }
}
