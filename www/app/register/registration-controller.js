/**
 * Created by saurabhPC on 09-Jul-16.
 */

angular.module('prozo.registration',[])

.controller('UserRegistrationCtrl',UserRegistrationCtrl);

UserRegistrationCtrl.$inject = ['$scope','$state','restService','$ionicModal'];

function UserRegistrationCtrl($scope,$state,restService,$ionicModal) {

  $scope.user = {};

  function init() {
    console.log("Registration Controller Loaded");
    restService.getStates()
      .success(function(data) {
        console.log(data);
        $scope.states = data;
      })
      .error(function(err) {
        console.log(err);
      });

    $ionicModal.fromTemplateUrl('/app/register/modal-list.tpl.html',{
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose:true,
      hardwareBackButtonClose:true
    }).then(function(modal) {
      console.log(modal);
      $scope.modal = modal;
    });
  }

  $scope.showStates = function () {
    $scope.modalItems = $scope.states;
    $scope.modal.show();
  };

  $scope.showCities = function(state) {
    if(state.id) {
      restService.getCities(state.id)
        .success(function(data) {
          $scope.cities = data;
          $scope.modalItems = $scope.cities;
          $scope.modal.show();
        })
        .error(function (err) {
          console.log(err);
        })
    }
  };

  $scope.closeModal = function($event,data) {
    if($event && data) {
      $event.stopPropagation();
      console.log(data);
      if(data.country_fk_id) {
        $scope.user.state = data;
        $scope.user.city = null;
      } else if(data.state_fk_id) {
        $scope.user.city = data;
      }
    }

    $scope.modal.hide();
  };

  $scope.submit = function(userForm) {
    if(userForm.$valid) {
      restService.registerUser(angular.copy($scope.user))
        .success(function(data) {
          console.log(data);
          if(data.status === 'success') {
            $state.go('success',{candidate_id:data.user_id});
          } else {

          }
        })
        .error(function(err) {

        })
    } else {
      angular.forEach(userForm.$error, function (field) {
        angular.forEach(field, function(errorField){
          errorField.$setDirty();
        });
      });
    }
  };

  init();
}
