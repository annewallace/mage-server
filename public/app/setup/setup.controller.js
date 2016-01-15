angular
  .module('mage')
  .controller('SetupController', SetupController);

SetupController.$inject = ['$scope', '$http', '$location', 'UserService', 'api'];

function SetupController($scope, $http, $location, UserService, api) {
  $scope.account = {};

  var pages = ['account', 'device'];
  $scope.page = pages[0];

  $scope.passwordRequirements = {}

  var localAuthenticationStrategy = api.authenticationStrategies.local;
  if (localAuthenticationStrategy) {
    $scope.passwordRequirements.minLength = localAuthenticationStrategy.passwordMinLength;
  }

  $scope.form = {};

  $scope.next = function() {
    if ($scope.form[$scope.page].$invalid) {
      return;
    }

    var index = pages.indexOf($scope.page);
    if (index < pages.length - 1) {
      $scope.page = pages[index + 1];
    } else {
      $http.post('/api/setup', $scope.account, {headers: { 'Content-Type': 'application/json' }}).success(function() {
        // login the user
        UserService.login({username: $scope.account.username, password: $scope.account.password, uid: $scope.account.uid});
      })
      .error(function() {
        console.log('error creating intial account');
      });
    }
  }
}
