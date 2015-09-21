var app = angular.module('PomodoroApp', []);
app.controller('MainCtrl', function($scope, $interval) {
  $scope.breakLength = 1;
  $scope.sessionLength = 1;
  $scope.timeWork = secondsToHms($scope.sessionLength * 60);
  $scope.upFill = '100%';
  $scope.downFill = '0%';
  $scope.actionStatus = 'Work';
  $scope.currentTotal;
  $scope.fillColor = "#ffcc66";

  var runTimer = false;
  var secs = 60 * $scope.sessionLength;
  $scope.originalTime = $scope.sessionLength;

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    );
  }
  // mouse enter leave action
  $scope.mouseActive = function() {
    console.log("aktivna mys");
    $scope.bckColor = "pink";
  }

  $scope.mouseDisactive = function() {
    console.log("neaktivna mys");
    $scope.bckColor = "red";
  }

  // Change default session length
  $scope.sessionLengthChange = function(time) {
    if (!runTimer) {
      if ($scope.actionStatus === 'Work') {
        $scope.sessionLength += time;
        if ($scope.sessionLength < 0) {
          $scope.sessionLength = 0;
        }
        $scope.timeWork = secondsToHms($scope.sessionLength * 60);
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
      }
    }
  }

  // Change default break length
  $scope.breakLengthChange = function(time) {
    if (!runTimer) {
      $scope.breakLength += time;
      if ($scope.breakLength < 0) {
        $scope.breakLength = 0;
      }
      if ($scope.actionStatus === 'Break!') {
        $scope.timeWork = $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.breakLength;
      }
    }
  }

  $scope.toggleTimer = function() {
    if (!runTimer) {

      updateTimer();
      runTimer = $interval(updateTimer, 100);
    } else {
      $interval.cancel(runTimer);
      runTimer = false;
    }
  }

  function updateTimer() {
    secs -= 1;
    if (secs < 0) {
      // countdown is finished

      // Play audio
      var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      var audio = new Audio(wav);
      audio.play();

      // toggle break and session
      // rotate eggs
      $scope.fillColor = '#333333';
      if ($scope.actionStatus === 'Break!') {
        $scope.actionStatus = 'Work';
        $scope.currentLength = $scope.sessionLength;
        $scope.timeWork = 60 * $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
        $scope.rotateEggs = 'rotate(0deg)';
        $scope.rotate = 'rotate(0deg)';
      } else {
        $scope.actionStatus = 'Break!';
        $scope.currentLength = $scope.breakLength;
        $scope.timeBreak = 60 * $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.breakLength;
        $scope.rotateEggs = 'rotate(180deg)';
        $scope.rotate = 'rotate(180deg)';
      }
    } else {
      if ($scope.actionStatus === 'Break!') {
        //  $scope.fillColor = '#FF4444';
        $scope.fillColor = "#ffcc66";
        $scope.timeBreak = secondsToHms(secs);
        var perc = 100 - (secs / (60 * $scope.originalTime)) * 100;
        var percUp = (secs / (60 * $scope.originalTime)) * 100;
        $scope.upFill = perc + "%";
        $scope.downFill = percUp + "%";
      } else {
        //$scope.fillColor = '#99CC00';
        $scope.fillColor = "#ffcc66";
        $scope.timeWork = secondsToHms(secs);
        var perc = 100 - (secs / (60 * $scope.originalTime)) * 100;
        var percUp = (secs / (60 * $scope.originalTime)) * 100;
        $scope.upFill = percUp + "%";
        $scope.downFill = perc + "%";
      }




    }
  }

});
