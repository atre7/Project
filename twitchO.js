// Angular controller to get Twitch users
var app = angular.module('TwitchApi', []);
app.controller('MainCtrl', function($scope, $http) {

  // Scope variables
  $scope.allUsers = [];
  $scope.onlineUsers = [];
  $scope.offlineUsers = [];

  // Local variables
  var streamers = ["freecodecamp", "GeoffStorbeck", "habathcx", "notmichaelmcdonald",
    "RobotCaleb", "medrybw", "comster404", "brunofin", "thomasballinger",
    "joe_at_underflow", "noobs2ninjas", "beohoff"];
  //  var cb = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';
  var url = 'https://api.twitch.tv/kraken/';

  // Get information for streamers
  streamers.forEach(function(stream) {
    // https://api.twitch.tv/kraken/streams?game=Programming

    // Temporary object
    var obj = {};
    console.log("getJSON ");
    //  console.log(url + 'streams/' + stream + cb);
    // Check if streaming
    $.getJSON(url + 'streams/' + stream).done(function(data) {
      var streaming = (data.stream === null) ? false : true;
      if (streaming) {
        obj.status = 'green fa fa-check';
        var streamTitle = data.stream.channel.status;

        if (streamTitle.length > 36) {
          streamTitle = streamTitle.substring(0, 33);
          streamTitle += '...';
        }
        obj.streamTitle = streamTitle;
      } else {
        obj.status = 'red fa fa-exclamation';
        data.streamTitle = '';
      }
      obj.username = stream;

      // Get user name and image
      $.getJSON(url + 'users/' + stream).success(function(data) {
        obj.name = data.display_name;
        obj.logo = data.logo;

        $scope.allUsers.push(obj);
        if (streaming) {
          $scope.onlineUsers.push(obj);
        } else {
          $scope.offlineUsers.push(obj);
        }
        $scope.profile = $scope.allUsers;
        $scope.$apply();
      });
    });
  });

  // Change arrow on main menu
  $('#mainMenu li').on('click', function() {

    if ($(this).data('display') === 'allUsers') {
      $scope.profile = $scope.allUsers;
    } else if ($(this).data('display') === 'onlineUsers') {
      $scope.profile = $scope.onlineUsers;
    } else {
      $scope.profile = $scope.offlineUsers;
    }
    $scope.$apply();

    // Change arrow
    $('#mainMenu li').removeClass('activeMenu');
    $(this).addClass('activeMenu');

  })
});

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {

      scope.$watch(function() {
        return attrs['ngSrc'];
      }, function(value) {
        if (!value) {
          element.attr('src', attrs.errSrc);
        }
      });

      element.bind('error', function() {
        element.attr('src', attrs.errSrc);
      });
    }
  }
});
