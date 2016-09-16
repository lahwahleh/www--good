angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {})
    //

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

//.controller('PlaylistsCtrl', function($scope) {
//  $scope.playlists = [
//    { title: 'Reggae', id: 1 },
//    { title: 'Chill', id: 2 },
//    { title: 'Dubstep', id: 3 },
//    { title: 'Indie', id: 4 },
//    { title: 'Rap', id: 5 },
//    { title: 'Cowbell', id: 6 }
//  ];
//})


.controller('ChatCtrl', function($scope){
	$scope.members = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ChatsingleCtrl', function ($scope, $stateParams,$http) {
	$scope.msg = {};
	$scope.chat = function (){
		console.log("Text msg: " + $scope.msg.txt );
		 //pub();
		$('#txtmsg').val("");
	}
	
})


.controller('PlaylistsCtrl', function ($scope, $http) {
    var url = 'http://localhost/churchapp/Home/DisplayDB'
    $http.get(url).success(function (data) {

        $scope.playlists = data;
    });

})

.controller('PlaylistCtrl', function ($scope, $stateParams,$http) {
    var url = 'http://localhost/churchapp/Home/DisplayDB';
    $http.get(url).success(function (data) {
        $scope.playlists = data;
        $scope.item = $stateParams.playlistId;
    });
})

.controller('SignoutCtrl', function ($scope, $ionicPopup, $state, $http) {
    $scope.user = {};

    $scope.LogIn = function (user) {
        console.log("LOGIN user: " + $scope.user.username + " - PW: " + $scope.user.password);
        $ionicPopup.alert({
            title: $scope.user.username,
            template: $scope.user.password
        });


        var url = 'http://localhost/churchapp/Home/Login';



        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }
        var data = $scope.user;

        console.log(data);
        $http.post(url, data, config)
        .success(function (data, status, headers, config) {
            $scope.response = data;

            console.log($scope.response.response);
            if (data.responsecode == '00') {

                $state.go('app.playlists');
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            }
        })
        .error(function (data, status, header, config) {

            $scope.response = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });

    }
})
