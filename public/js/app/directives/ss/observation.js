'use strict';

mage.directive('ssObservation', ['MapService', 'FeatureTypeService', 'UserService' , 'Feature', function (MapService, FeatureTypeService, UserService, Feature) {

  return {
    restrict: "A",
    templateUrl: "/js/app/partials/ss/observation.html",
    controller: "FeatureController",
    scope: {
      observation: '=ssObservation'
    },
    link: function(scope) {

      scope.teams = [
        'PI ZONE A',
        'PI ZONE B',
        'PI ZONE C',
        'PI ZONE D'
      ];

      scope.ms = MapService;

      //Get the Feature Types
      FeatureTypeService.getTypes().
        success(function (types, status, headers, config) {
          scope.types = types;
        }).
        error(function (data, status, headers, config) {
          console.log("Error getting types: " + status);
        });

      scope.createNewObservation = function(location) {
        return new Feature({
          type: 'Feature',
          geometry: {
            type: 'Point'
          },
          properties: {
            type: scope.types[0].name,
            TEAM: scope.teams[0],
            timestamp: new Date()
          }
        });
      }

      scope.cancelEdit = function() {
        scope.$emit('cancelEdit');
      }
    }
  };
}]);