mage.directive('userLocation', function(UserService, appConstants) {
  return {
    restrict: "A",
    templateUrl:  "js/app/partials/user-location.html",
    scope: {
    },
    controller: function ($scope, UserService) {
      $scope.getUser = function(userId) {
        var u = UserService.getUser(userId);
        if (u.success) {
          u.success(function(user) {
            $scope.user = user;
          })
          .error(function() {
            console.log('error trying to get user');
          });
        } else if (u.then) {
          u.then(function(user) {
            $scope.user = user;
          })
        }
        
      }
    }
  };
});