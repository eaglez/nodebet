'use strict';

/* jshint -W098 */
angular.module('mean.bets').controller('BetsController', ['$scope', 'Global', 'Bets',
  function($scope, Global, Bets) {
    $scope.global = Global;
    $scope.package = {
      name: 'bets'
    };
  }
]);
