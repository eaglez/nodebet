'use strict';

angular.module('mean.bets').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('bets example page', {
      url: '/bets/example',
      templateUrl: 'bets/views/index.html'
    });
  }
]);
