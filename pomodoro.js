var app = angular.module('PomodoroApp', ['ngAnimate']);
var bell = "budhistBell.mp3";
var audio = new Audio(bell);
app.controller('MainCtrl', function($scope, $interval) {
  $scope.relaxLength = 1;
  $scope.workLength = 2;
  $scope.timeWork = secondsToHms($scope.workLength * 60);
  $scope.upFill = '100%';
  $scope.downFill = '0%';
  $scope.actionStatus = 'Work';
  $scope.first = true ;
  $scope.rotateEggs = 'rotate(180deg)';
  $scope.fillColor = "#ffcc66";
  $scope.run = false;
  $scope.pauseSand = '100%';

  $scope.originalTime = $scope.workLength;
var secs = 60 * $scope.workLength;

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    );
  }

  // Change default session length
  $scope.workLengthChange = function(time) {
    if (!$scope.run) {
      if ($scope.actionStatus === 'Work') {
        $scope.workLength += time;
        if ($scope.workLength < 0) {
          $scope.workLength = 0;
        }
        $scope.timeWork = secondsToHms($scope.workLength * 60);
        $scope.originalTime = $scope.workLength;
        secs = 60 * $scope.workLength;
      }
    }
  };
  $scope.relaxLengthChange = function(time) {
    if (!$scope.run) {
      $scope.relaxLength += time;
      if ($scope.relaxLength < 0) {
        $scope.relaxLength = 0;
      }
      if ($scope.actionStatus === 'Relax') {
        $scope.timeWork = $scope.relaxLength;
        $scope.originalTime = $scope.relaxLength;
        secs = 60 * $scope.relaxLength;
      }
    }
  };
  $scope.toggleTimer = function() {
    $scope.first = false;
    if (!$scope.run) {
      $scope.pauseSand = '100%';
      updateTimer();
      $scope.run = $interval(updateTimer, 50);
      if ($scope.actionStatus === 'Work') {
        $scope.rotateEggs = 'rotate(0deg)';
      } else {
        $scope.rotateEggs = 'rotate(180deg)';
      }
    } else {
      $interval.cancel($scope.run);
      if ($scope.actionStatus === 'Work') {
        $scope.rotateEggs = 'rotate(270deg)';
        $scope.upFill = '100%';
        $scope.downFill = '100%';
        $scope.pauseSand = '30%';
      } else {
        $scope.rotateEggs = 'rotate(90deg)';
        $scope.upFill = '100%';
        $scope.downFill = '100%';
        $scope.pauseSand = '30%';
      }
      $scope.run = false;
    }
  };

  function updateTimer() {
    secs -= 1;
    if (secs < 0) {
      audio.play();
      // rotate eggs

      if ($scope.actionStatus === 'Relax') {
        $scope.actionStatus = 'Work';
        $scope.currentLength = $scope.workLength;
        $scope.timeWork = 60 * $scope.workLength;
        $scope.originalTime = $scope.workLength;
        secs = 60 * $scope.workLength;
        $scope.rotateEggs = 'rotate(0deg)';
        $scope.rotate = 'rotate(0deg)';
      } else {
        $scope.actionStatus = 'Relax';
        $scope.currentLength = $scope.relaxLength;
        $scope.timeBreak = 60 * $scope.relaxLength;
        $scope.originalTime = $scope.relaxLength;
        secs = 60 * $scope.relaxLength;
        $scope.rotateEggs = 'rotate(180deg)';
        $scope.rotate = 'rotate(180deg)';
      }
    } else {
      if ($scope.actionStatus === 'Relax') {
        $scope.fillColor = "#ffcc66";
        $scope.timeBreak = secondsToHms(secs);
        var perc = 100 - (secs / (60 * $scope.originalTime)) * 100;
        var percUp = (secs / (60 * $scope.originalTime)) * 100;
        $scope.upFill = perc + "%";
        $scope.downFill = percUp + "%";
      } else {
        $scope.fillColor = "#ffcc66";
        $scope.timeWork = secondsToHms(secs);
        var perc2 = 100 - (secs / (60 * $scope.originalTime)) * 100;
        var percUp2 = (secs / (60 * $scope.originalTime)) * 100;
        $scope.upFill = percUp2 + "%";
        $scope.downFill = perc2 + "%";
      }

    }
  }

});
