'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games',
  function($scope, $stateParams, $location, Global, Games) {
    $scope.global = Global;
    $scope.hasAuthorization = function(game) {
      if (!game || !game.createdBy) return false;
      return $scope.global.isAdmin || game.createdBy._id === $scope.global.user._id;
    };
    

    $scope.create = function(isValid) {
        console.info(this);
        console.info(this.game.starttime);
      if (isValid) {

        var game = new Games({
          home: this.game.home,
          visitors: this.game.visitors,
          start: this.game.start
        });
        console.info("save");
        console.info(game);
        
        game.$save(function(response) {
            console.info(response);
          $location.path('games/' + response._id);
        });

        this.home = '';
        this.visitors = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(game) {
        console.log("remove");
      if (game) {
        game.$remove(function(response) {
          for (var i in $scope.games) {
            console.info('current game: ' + $scope.games[i]);

            if ($scope.games[i] === game) {
                console.info("remove");
    	      $scope.games.splice(i,1);
            }
          }
          $location.path('games');
        });
      } else {
        $scope.game.$remove(function(response) {
          $location.path('games');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var game = $scope.game;
        if(!game.updated) {
          game.updated = [];
	}
        game.updated.push(new Date().getTime());

        game.$update(function() {
          $location.path('games/' + game._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Games.query(function(games) {
        $scope.games = games;
      });
    };

    $scope.findOne = function() {
      Games.get({
        gameId: $stateParams.gameId
      }, function(game) {
        $scope.game = game;
      });
    };
  }
]);
