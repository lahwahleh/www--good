angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {})
    //
	
	$scope.name = $.jStorage.get("name");
	$scope.photo = $.jStorage.get("photo");
	

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




//deji dir add

.controller('DirectoryCtrl', function($scope, $stateParams,$http){
    $scope.loader = true;
    $scope.kchouse = [
        {houses : "Harmans", color : "red"},
        {houses : "Hyde-Johnson", color : "white"},
        {houses : "Mckee Wrights", color : "green"},
        {houses : "Panes", color : "black"}
    ];
    
    console.log($scope.kchouse);
    
    $scope.IsVisible = false;
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            }
    
    
     $scope.isEven = function(choice) {
    
    if (choice == 'A')
    {
        $scope.searchCat = false;

        $scope.YOG = true;  
        $scope.House = true;  
        $scope.Name = false;
        $scope.searchCat = true;
     
    }
        
          if (choice == 'B')
    {
        $scope.searchCat = false;

        $scope.Name = true;  
        $scope.House = false;  
        $scope.YOG = true;  
        $scope.searchCat = true;
    }
      if (choice == 'C')
    {
        $scope.searchCat = false;

        $scope.YOG = false;  
        $scope.House = true;  
        $scope.Name = true; 
        $scope.searchCat = true;
    }
    
  };
  
    $scope.YOGSearch = function(Year){
        $scope.loader = false;
        var url = urlstr_custom + "searchmembersyog/?YOG=" + Year.yr ; 
        $http.get(url).success(function (data) {
        console.log(data);
        $scope.List = data;
        $scope.loader = true;
    });
    }

  
    $scope.HouseSearch = function(Houses){
        $scope.loader = false;
        var url = urlstr_custom + "searchmembershouse/?House=" + Houses.house ; 
                console.log(Houses.house);
        $http.get(url).success(function (data) {
        console.log(data);
        $scope.List = data;
        $scope.loader = true;
    });
    }
    
    $scope.NameSearch = function(Names){
        $scope.loader = false;
        var url = urlstr_custom + "searchmembers/?firstname=" +Names.fname + "&lastname=" +Names.lname ;
        $http.get(url).success(function (data) {
        console.log(data);
        $scope.List = data;
        $scope.loader = true;
    });
    }
})
//================================================


.controller('ServicesCtrl', function($scope, $stateParams,$http){

    $.jStorage.get("dataserve");    
    console.log($.jStorage.get("services"));
    console.log($.jStorage.get("dataserve"));
     $scope.serviceList2 = $.jStorage.get("dataserve");
     
    
    $scope.Search = function(service){
        console.log(service.professionid);
        var url = urlstr_custom + "getservice/?prof=" + service.professionid; 
        console.log(url);
        $http.get(url).success(function (data) {
            $scope.members = data;
            
            console.log(data);
            //$scope.item = $stateParams.itemId;
        }).error(function (data, status, header, config) {

            $scope.response = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            console.log($scope.response);
        });
    };
    
})


//==================================================


.controller('ServicesingleCtrl', function ($scope,$ionicPopup, $stateParams,$http) {
        $scope.item = $stateParams.itemId;
    $scope.biodata = $stateParams.biodataid;
    var url = urlstr_custom + "servicesingle/?biodata=" +$scope.biodata ;
    console.log(url);
        $http.get(url).success(function (data) {
            $scope.profiles = data;
            
            console.log(data);
            //$scope.item = $stateParams.itemId;
        }).error(function (data, status, header, config) {

            $scope.response = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            console.log($scope.response);
        });
        
        $scope.msg = {};
    $scope.SendMail = function(msg){
        console.log($scope.profiles[0].email);
            var url = urlstr_custom + "sendmail/?to="+$scope.profiles[0].email+"&name=" + $.jStorage.get("name")  + "&comment=" + $scope.msg.txt;
        console.log(url);
        $http.get(url).success(function (data) {
        $scope.response = data;
        console.log($scope.response);
           var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: $scope.response[0].status
                });
       
    });
        
    };
})



//================================================


.controller('ChatgroupCtrl', function ($scope, $stateParams,$http) {
$scope.year = $stateParams.year;
    $scope.item = $stateParams.itemId;
    $scope.biodata = $stateParams.biodataid;
    $scope.chatpartnerimg = "http://162.144.253.91/kcoba/photo/"+$.jStorage.get("tempChatPartnerBiodataId")+".jpg";
    $.jStorage.set("tempChatPartnerBiodataId", $scope.biodata);
    $.jStorage.set("tempChatPartnerName", " You and " + decodeURIComponent(name));

    console.log($.jStorage.get("tempChatPartnerBiodataId"));
    console.log($.jStorage.get("name"));
    console.log(decodeURIComponent(name));
    
    $scope.conversation = [{ title:$.jStorage.set("tempChatPartnerName", " You and " + $stateParams.biodataid)}];
    console.log($scope.conversation);
    
    console.log($.jStorage.get("name"));
    var  pubnub = PUBNUB.init({
        publish_key: 'pub-c-f00954b1-b098-4691-b2e4-9ad2416530ec',
        subscribe_key: 'sub-c-1108556e-d3c8-11e4-8323-02ee2ddab7fe',
        uuid: $.jStorage.get("name") + "-" + $.jStorage.get("year")
    });
    
    pubnub.subscribe({
    channel: $.jStorage.get("chat_channel"),
    message: function (message) {
                
        var respObj = JSON.parse(JSON.stringify(message));


        //if (respObj.from == $.jStorage.get("biodataid") && respObj.to == $.jStorage.get("tempChatPartnerBiodataId")) {

        //    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='lbubble' >" + respObj.message + "</div><br/><br/><br/> ";
        //      } && respObj.from == $.jStorage.get("tempChatPartnerBiodataId")

        if (respObj.to == $.jStorage.get("year") && respObj.from != $.jStorage.get("biodataid") ) {

            document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='rbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";

        }



                    
        $("#chatPanel").scrollTop($("#chatPanel")[0].scrollHeight  );

       
        
      //  playAudio("/sounds/notify.mp3"); //playsound
                     
                     
                     
    } 
    })
   
    
    //get chat history
    history();
    $scope.msg = {};
    $scope.chatuser = {};
    $scope.chat = function (){
        console.log("Text msg: " + $scope.msg.txt );
        
         pub();
        $('#txtmsg').val("");
    }
    function pub() {
    //validate text
    if (document.getElementById("txtmsg").value.length == 0) {
        return;
    }
   
     console.log("Text msg: " + $scope.msg.txt );
     console.log("you name: " +  $.jStorage.get("name") );
    //$.jStorage.get("photo")
    var msg = "<table border='0'><tr valign='middle'><td><img style='padding:5px;' src='" + $.jStorage.get("photo").toString()+ "' width='40px' /></td><td> <b>" + $.jStorage.get("name") + ":</b> " + document.getElementById("txtmsg").value + "</td></tr></table>";
    var msg2 = "<table border='0'><tr valign='middle'><td><img style='padding:5px;' src='" + $.jStorage.get("photo").toString()+ "' width='40px' /></td><td> <b>" + $.jStorage.get("name") + ":</b> " + document.getElementById("txtmsg").value + "<br/><i><small>" + timeSince(new Date()) + "</small></i></td></tr></table>";
    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div class='lbubble' >" + msg2 + "</div><br/><br/><br/> ";

    document.getElementById("txtmsg").value = "";


    pubnub.publish({
            channel: $.jStorage.get("chat_channel"),
            message: {
                from: $.jStorage.get("biodataid"),
                to: $.jStorage.get("year"),
                message: msg,
                date: new Date()
            },
            callback: function (m) {

              

            }
        })

     
    }

    function history() {
    

    //Load History and Store 
    pubnub.history({
        channel: $.jStorage.get("chat_channel"),
        count: 100,
        callback: function (m) {


            var res = m;
            var msg = m[0];

             
            for (var y = 0; y < msg.length; y++)
            {


                var respObj = JSON.parse(JSON.stringify(msg[y]));

                //&& respObj.to == $.jStorage.get("tempChatPartnerBiodataId")
                if (respObj.from == $.jStorage.get("year") ) {

                    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='lbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";
                }

                //&& respObj.from == $.jStorage.get("tempChatPartnerBiodataId")
                if (respObj.to == $.jStorage.get("year") ) {

                    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='rbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";

                }



            }

        }
    });

           
            
}
  
  
    function timeSince(date) {

         var seconds = Math.floor((new Date() - date) / 1000);

         var interval = Math.floor(seconds / 31536000);

         if (interval > 1) {
             return interval + " years";
         }
         interval = Math.floor(seconds / 2592000);
         if (interval > 1) {
             return interval + " months";
         }
         interval = Math.floor(seconds / 86400);
         if (interval > 1) {
             return interval + " days";
         }
         interval = Math.floor(seconds / 3600);
         if (interval > 1) {
             return interval + " hours";
         }
         interval = Math.floor(seconds / 60);
         if (interval > 1) {
             return interval + " minutes";
         }
         return Math.floor(seconds) + " seconds";
     }
})



//================================================



//deji add


.controller('PaymentCtrl', function($scope, $stateParams,$http){

	var url = urlstr_custom + "payments/" + $.jStorage.get("userid");
	    $http.get(url).success(function (data) {
		console.log(data);
        $scope.playlists = data;
    });
	
	
})

.controller('ChatCtrl', function($scope, $stateParams,$http){
	//$scope.members = [
	
    //{ title: 'Reggae', id: 1 },
    //{ title: 'Chill', id: 2 },
    //{ title: 'Dubstep', id: 3 },
    //{ title: 'Indie', id: 4 },
    //{ title: 'Rap', id: 5 },
    //{ title: 'Cowbell', id: 6 }
  //];
  var url = urlstr_custom + "searchmembers/?firstname=" + $("#Firstname").val() || "searchmembers/?lastname=" + $("#Lastname").val();
 // var url = urlstr_custom + "searchmembers/?firstname=" + $("#Firstname").val() + "&lastname=" + $("#Lastname").val();

  // Triggered When the search button is clicked
    $scope.searchChat = function (chat) {
        //var url = urlstr_custom + "searchmembers/?firstname=" + chat.fname || "searchmembers/?laststname=" + chat.lname; 
        if (chat.fname == "" && chat.lname == ""){
            var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: 'Please enter Name(s)'
                });

        }

        else if (chat.fname != "" && chat.lname == ""){

            var url = urlstr_custom + "searchmembers/?firstname=" + chat.fname;
        }
         
         else if (chat.fname == "" && chat.lname != ""){

            var url = urlstr_custom + "searchmembers/?lastname=" + chat.lname;
        }

        else {
            var url = urlstr_custom + "searchmembers/?firstname=" + chat.fname + "&lastname=" + chat.lname;
        }

         //var url = urlstr_custom + "searchmembers/?firstname=" + chat.fname + "&lastname=" + chat.lname;
        
	    console.log(url);
		$http.get(url).success(function (data) {
			$scope.members = data;
			
			console.log(data);
			//$scope.item = $stateParams.itemId;
		}).error(function (data, status, header, config) {

          if  $scope.response = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config
			console.log($scope.response);
        });


        document.getElementById("amyAnchor").focus();
		
    };
 

})

.controller('ChatsingleCtrl', function ($scope, $stateParams,$http) {

	$scope.item = $stateParams.itemId;
	$scope.biodata = $stateParams.biodataid;
	$.jStorage.set("tempChatPartnerBiodataId", $scope.biodata);
	$.jStorage.set("tempChatPartnerName", " You and " + decodeURIComponent(name));

	console.log($.jStorage.get("tempChatPartnerBiodataId"));
	console.log($.jStorage.get("name"));
	$scope.conversation = [{ title:$.jStorage.set("tempChatPartnerName", " You and " + $stateParams.biodataid)}];
	console.log($scope.conversation);
	
	console.log("it gets here");
	var  pubnub = PUBNUB.init({
        publish_key: 'pub-c-f00954b1-b098-4691-b2e4-9ad2416530ec',
        subscribe_key: 'sub-c-1108556e-d3c8-11e4-8323-02ee2ddab7fe',
        uuid: $.jStorage.get("name") + "-" + $.jStorage.get("biodataid")
    });
	
	pubnub.subscribe({
    channel: $.jStorage.get("chat_channel"),
    message: function (message) {
                
        var respObj = JSON.parse(JSON.stringify(message));


        //if (respObj.from == $.jStorage.get("biodataid") && respObj.to == $.jStorage.get("tempChatPartnerBiodataId")) {

        //    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='lbubble' >" + respObj.message + "</div><br/><br/><br/> ";
        //}

        if (respObj.to == $.jStorage.get("biodataid") && respObj.from == $.jStorage.get("tempChatPartnerBiodataId")) {

            document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='rbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";

        }



                    
        $("#chatPanel").scrollTop($("#chatPanel")[0].scrollHeight  );

       
        
      //  playAudio("/sounds/notify.mp3"); //playsound
                     
                     
                     
    } 
	})
   
	
	//get chat history
	history();
	$scope.msg = {};
	$scope.chatuser = {};
	$scope.chat = function (){
		console.log("Text msg: " + $scope.msg.txt );
		
		 pub();
		$('#txtmsg').val("");
	}
	function pub() {
    //validate text
    if (document.getElementById("txtmsg").value.length == 0) {
        return;
    }
   
     console.log("Text msg: " + $scope.msg.txt );
	 console.log("you name: " +  $.jStorage.get("name") );
	
    var msg = "<table border='0'><tr valign='middle'><td><img style='padding:5px;' src='img/" + $.jStorage.get("name").toString().substring(0, 1).toLowerCase() + ".jpg' width='40px' /></td><td> <b>" + $.jStorage.get("name") + ":</b> " + document.getElementById("txtmsg").value + "</td></tr></table>";
    var msg2 = "<table border='0'><tr valign='middle'><td><img style='padding:5px;' src='images/" + $.jStorage.get("name").toString().substring(0, 1).toLowerCase() + ".png' width='40px' /></td><td> <b>" + $.jStorage.get("name") + ":</b> " + document.getElementById("txtmsg").value + "<br/><i><small>" + timeSince(new Date()) + "</small></i></td></tr></table>";
    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div class='lbubble' >" + msg2 + "</div><br/><br/><br/> ";

    document.getElementById("txtmsg").value = "";


	pubnub.publish({
            channel: $.jStorage.get("chat_channel"),
            message: {
                from: $.jStorage.get("biodataid"),
                to: $.jStorage.get("tempChatPartnerBiodataId"),
                message: msg,
                date: new Date()
            },
            callback: function (m) {

              

            }
        })

     
	}

	function history() {
    

    //Load History and Store 
    pubnub.history({
        channel: $.jStorage.get("chat_channel"),
        count: 100,
        callback: function (m) {


            var res = m;
            var msg = m[0];

             
            for (var y = 0; y < msg.length; y++)
            {


                var respObj = JSON.parse(JSON.stringify(msg[y]));

                if (respObj.from == $.jStorage.get("biodataid") && respObj.to == $.jStorage.get("tempChatPartnerBiodataId")) {

                    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='lbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";
                }

                if (respObj.to == $.jStorage.get("biodataid") && respObj.from == $.jStorage.get("tempChatPartnerBiodataId")) {

                    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='rbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";

                }



            }

        }
    });

           
            
}
  
  
    function timeSince(date) {

         var seconds = Math.floor((new Date() - date) / 1000);

         var interval = Math.floor(seconds / 31536000);

         if (interval > 1) {
             return interval + " years";
         }
         interval = Math.floor(seconds / 2592000);
         if (interval > 1) {
             return interval + " months";
         }
         interval = Math.floor(seconds / 86400);
         if (interval > 1) {
             return interval + " days";
         }
         interval = Math.floor(seconds / 3600);
         if (interval > 1) {
             return interval + " hours";
         }
         interval = Math.floor(seconds / 60);
         if (interval > 1) {
             return interval + " minutes";
         }
         return Math.floor(seconds) + " seconds";
     }
})


.controller('PlaylistsCtrl', function ($scope, $http) {
    var url = 'http://localhost/churchapp/Home/DisplayDB'
	
	url = urlstr_custom + "newsfeeds";
    $http.get(url).success(function (data) {
		console.log(data);
        $scope.playlists = data;
    });

})


.controller('FeedbackCtrl', function ($scope, $ionicPopup, $stateParams,$http) {
	$scope.feedback = {};
	$scope.SendMail = function(feedback){
		var url = urlstr_custom + "feedback/?name=" + $.jStorage.get("name")  + "&comment=" + $scope.feedback.msg;
		console.log(url);
		$http.get(url).success(function (data) {
        $scope.response = data;
		console.log($scope.response);
		   var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: $scope.response[0].status
                });

           $scope.feedback.msg = '';






       
    });
	};
	
})


//edit

//edit

.controller('WebviewCtrl', function ($scope, $stateParams,$http, $sce) {
    $scope.url = "http://162.144.253.91/kcoba/PayFeesMobile.aspx?userid=" + $.jStorage.get("userid")+"&name="+$.jStorage.get("name")+"&date="+$.jStorage.get("DOB");
    
    $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.surl = {src:$scope.url, title:"AngularJS Binding"};
    
    console.log($scope.url);
})

.controller('PlaylistCtrl', function ($scope, $stateParams,$http) {
    var url = 'http://localhost/churchapp/Home/DisplayDB';
	url = urlstr_custom + "newsfeeds";
    $http.get(url).success(function (data) {
        $scope.playlists = data;
        $scope.item = $stateParams.playlistId;
    });
})

.controller('EnrolCtrl', function ($scope, $ionicPopup, $state, $http) {
	$scope.enrol = {};
	$scope.panel = {};
	$scope.signin = function() {
		$state.go('signout');
	};
	

	
	$scope.Enroll = function (enrol){
		console.log("Enrol user: " +$scope.enrol.middlename+ " " +$scope.enrol.firstname + " " +$scope.enrol.house.house);
		//$ionicPopup.alert({
        //    title: $scope.panel.house,
        //    template: $scope.enrol.password
       // });
		url = urlstr_custom + "enrol/?Surname=" + $scope.enrol.lastname  + "&firstname=" + $scope.enrol.firstname+"&middlename=" + $scope.enrol.middlename  + "&othername=" + $scope.enrol.nname  + "&password=" + $scope.enrol.password+"&email=" + $scope.enrol.email+ "&house=" + $scope.enrol.house.house+"&phone=" + $scope.enrol.phone  + "&yog=" + $scope.enrol.yog;
		//enrol/?Surname=Sese&firstname=Tonye&middlename=Sars&othername=Mannetti&password=password&email=sesetonye@yahoo.com&house=Hyde&phone=07018085054&yog=2011
		console.log(url);
		$http.get(url)
        .success(function (data) {
            $scope.response = data;

            console.log($scope.response);
			console.log(data);
			console.log($scope.response[0].biodata);
            if ($scope.response[0].status == "1") {

				$scope.enrollid = $scope.response[0].biodataid;
                $state.go('successpage');
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'General Error!',
                    template: 'An Error occured while processing your request!'+$scope.response
                });
            }
        })
        .error(function (data, status, header, config) {

            $scope.response = "Data: " + data +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });

	};
	
	 $scope.kchouse = [
        {house : "Harmans", color : "red"},
        {house : "Hyde-Johnson", color : "white"},
		{house : "Mckee Wrights", color : "green"},
        {house : "Panes", color : "black"}
    ];
})

.controller('SignoutCtrl', function ($scope, $ionicPopup, $state, $http) {
  //  $.jStorage.flush();


$scope.loader = true;
    //-------------------services
            var url = urlstr_custom + "services"; 
            console.log(url);
            $http.get(url).success(function (data) {
                $scope.members = data;
                
                console.log(data);
                var json = angular.toJson(data,"service");
                $.jStorage.set("dataserve",data);
                $.jStorage.set("services",json);
                $scope.holder = $.jStorage.get("services");
                
                console.log($.jStorage.get("services"));
                
                 //$scope.kchouse = json;
                
            });
    
    //---------------------------


    $scope.user = {};
	$scope.response = {};
		$scope.enrol = function() {
		$state.go('enrol');
	};




//edit


$scope.$on('$ionicView.beforeEnter', function(){
    setTimeout(function(){
      document.getElementById("custom-overlay").style.display = "none";      
    }, 5000);
  }); 



//edit

    $scope.handlesignout = function(){
        $.jStorage.flush();
    }


    $scope.LogIn = function (user) {
        console.log("LOGIN user: " + $scope.user.username + " - PW: " + $scope.user.password);
        //$ionicPopup.alert({
          //  title: $scope.user.username,
            //template: $scope.user.password
        //});


        var url = 'http://localhost/churchapp/Home/Login';

		url = urlstr_custom + "login/?username=" + $scope.user.username.trim().toLowerCase()  + "&password=" + $scope.user.password.trim();
console.log(url);
        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }
        var data = $scope.user;

        console.log(data);
        $http.get(url)
        .success(function (data) {
            $scope.response = data;

            console.log($scope.response);
			console.log(data);
			console.log($scope.response[0].phone);
            if ($scope.response[0].status == "1") {
				
				$.jStorage.set("name", $scope.response[0].name);
                $.jStorage.set("biodataid", $scope.response[0].biodataid);
                $.jStorage.set("email", $scope.response[0].email);
                $.jStorage.set("phone", $scope.response[0].phone);
                $.jStorage.set("userid", $scope.response[0].userid);
				$.jStorage.set("photo", $scope.response[0].photo);
				console.log("you photo: " +  $.jStorage.get("photo") );
                $state.go('app.home');
            }
            else {
				
            console.log($scope.response);
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            }
        })
        .error(function (data, status, header, config) {

            $scope.response = "Data: " + data +
                "<hr />headers: " + header +
                "<hr />config: " + config;
				
			$ionicPopup.alert({
            title: 'Connection Error',
            template: 'Check Your Internet connection'
        });
        });

    }
})
