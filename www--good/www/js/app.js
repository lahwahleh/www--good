// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])


//angular.module('starter', ['ionic', 'starter.controllers','ngAnimate','ngTouch'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })
	
	.state('app.payments', {
        url: '/payments',
        views: {
            'menuContent': {
                templateUrl: 'templates/payments.html',
				controller:'PaymentCtrl'
            }
        }
    })
	
	.state('app.directory', {
        url: '/directory',
        views: {
            'menuContent': {
                templateUrl: 'templates/directory.html',
                //edit
                controller:'DirectoryCtrl'
            }
        }
    })
	
	.state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html'
            }
        }
    })
	
	
		.state('app.webview', {
        url: '/webview',
        views: {
            'menuContent': {
                templateUrl: 'templates/webview.html',
				controller: 'WebviewCtrl'
            }
        }
    })
	
	.state('app.feedback', {
        url: '/feedback',
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback.html',
				controller:'FeedbackCtrl'
            }
        }
    })


  //edit
  .state('app.services', {
        url: '/services',
        views: {
            'menuContent': {
                templateUrl: 'templates/services.html',
                controller:'ServicesCtrl'
            }
        }
    })






  .state('app.servicesingle', {
        url: '/services/:itemId/:biodataid',
        views: {
            'menuContent': {
                templateUrl: 'templates/servicesingle.html',
                controller: 'ServicesingleCtrl'
            }
        }
    })







  //edit

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html',
				controller:'ChatCtrl'
            }
        }
    })
      .state('app.playlists', {
          url: '/playlists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/playlists.html',
                  controller: 'PlaylistsCtrl'
              }
          }
      })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    })

      //.state('app.signout', {
      //    url: '/signout',
      //    views: {
      //        'menuContent': {
      //            templateUrl: 'templates/signout.html',
      //            controller: 'SignoutCtrl'
      //        }
      //    }
      //})
	   .state('app.chats', {
          url: '/chats',
          views: {
              'menuContent': {
                  templateUrl: 'templates/chat.html',
                  controller: 'ChatCtrl'
              }
          }
      })


//edit
     .state('app.chatgroup', {
        url: '/chatgroup/:year/:name/:biodata',
        views: {
            'menuContent': {
                templateUrl: 'templates/chatgroup.html',
                controller: 'ChatgroupCtrl'
            }
        }
    })


//edit

	  
	    .state('app.chatsingle', {
        url: '/chats/:itemId/:biodataid',
        views: {
            'menuContent': {
                templateUrl: 'templates/chatsingle.html',
                controller: 'ChatsingleCtrl'
            }
        }
    })
	
	
	.state('enrol', {
        url: '/enrol',
            templateUrl: 'enrol.html',
            controller: 'EnrolCtrl'
        })
		
		.state('successpage', {
        url: '/successpage',
            templateUrl: 'successpage.html'
        })
             .state('signout', {
                 url: '/signout',
                 templateUrl: 'signout.html',
                 controller: 'SignoutCtrl'
             });
 
    // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/signout');
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signout');
});
