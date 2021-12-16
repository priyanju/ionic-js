angular.module('starter', ['ionic','starter.controllers', 'starter.services','ngPercentDisplay','login',
  'tab','home','machine','job','operaterentry','companystatus','operator'])

.run(function($ionicPlatform,$ionicPopup,$ionicHistory,$rootScope,$state,$interval,$http) {
  $http.defaults.headers.common.Authorization = 'Bearer '+localStorage.getItem("access_token");
 

  $ionicPlatform.ready(function() {

    cordova.getAppVersion.getVersionNumber(function(version) {
      var mobversion = version;
     // alert(mobversion)
      $http({
        method: 'GET',
        url: $rootScope.Baseurl+ 'mobile_version'
      }).then(function (response) {
        var setVersion = response.data;
        //alert(setVersion.version)
        if (mobversion != setVersion.version) {
          var myPopup = $ionicPopup.show({
            buttons: [{
              text: 'EXIT',
              type: 'button-dark',
              onTap: function() {
                ionic.Platform.exitApp();
              }
            }],
               template:'<a class="button button-full button-positive" href="https://play.google.com/store/apps/details?id=com.mms2yantra24x7">Update Available</a>',
                title: '<b>Please Update</b>',
                  });
          
        }
      })
    });

    
    if(window.Connection) {
       if(navigator.connection.type == Connection.NONE) {
                   
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {           
            ionic.Platform.exitApp();
          }
        });
      }
    }        
    
   $rootScope.myname = localStorage.getItem("uname");
   $rootScope.usertypeID = localStorage.getItem("usertypeID");
  
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
     // StatusBar.styleDefault();
     StatusBar.backgroundColorByHexString('#D67B15');
    }


     // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("b51e7761-a1ef-4e57-b2de-43b9a92d8ce1","370024737584")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
    window.plugins.OneSignal.getIds(function(ids) {
        console.log('getIds: ' + JSON.stringify(ids));
        var playerid=ids.userId;
        localStorage.setItem("playerid",playerid)
        //alert(playerid);
   });
    
 
  })

 $ionicPlatform.registerBackButtonAction(function(e) {
    e.preventDefault();
    function showConfirm() {
      var confirmPopup = $ionicPopup.show({
      title : 'Yantra24x7',
      template : 'Are you sure you want to exit ?',
      buttons : [{
        text : 'Cancel',
        type : 'button-positive',
       }, {
        text : 'Ok',
        type : 'button-danger',
        onTap : function() {
         ionic.Platform.exitApp();
        }
       }]
      });
     };
     /*if ($ionicHistory.backView()) {
      $ionicHistory.backView().go();
     } else {
      showConfirm();
     }
     return false;
    }, 101);*/
      if($state.current.name=='login' || $state.current.name=='tab.home'){
       showConfirm();
      }
      else {
        navigator.app.backHistory();
      }
    }, 100)

   
/*if($state.current.name!='tab.home'){
  
  $interval.cancel($rootScope.setInterval);
}*/
 $rootScope.Baseurl=' https://app.yantra24x7.com/api/v1/';

//  $rootScope.Baseurl='http://192.168.1.48:3007/api/v1/';


      
})


.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
$httpProvider.interceptors.push('APIInterceptor');

  $stateProvider


  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
    }) 


  .state('operaterentry', {
    url: '/operaterentry',
    templateUrl: 'templates/operaterentry.html'
  })

  .state('changepassword', {
    url: '/changepassword',
    templateUrl: 'templates/changepassword.html'
  })
  .state('alarm', {
    url: '/alarm',
    templateUrl: 'templates/alarm.html',
    controller:'TabCtrl' 
  })

   .state('missingdataentry', {
    url: '/missingdataentry',
    templateUrl: 'templates/missingdataentry.html'
  })

   .state('companystatus', {
    url: '/companystatus',
    templateUrl: 'templates/companystatus.html'
  })


    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:"TabCtrl"
  })


  .state('tab.home', {
    url: '/home',
    params:{'index': null},
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller:'HomeCtrl'        
      }
    }
  })
  

  .state('tab.machine', {
      url: '/machine',
      params:{'index': null},
      views: {
        'tab-machine': {
          templateUrl: 'templates/tab-machine.html',
          controller:'MachineCtrl'         
        }
      }
    })

    .state('tab.operator', {
      url: "/operator",
      views: {
        'tab-operator': {
          templateUrl: "templates/tab-operator.html",
          controller:'OperatorCtrl' 
        }
      }
    })
   
 
   .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html'
  })



//  .state('tab.results', {
//       url: "/results",
//       views: {
//         'tab-machine': {
//           templateUrl: "templates/results.html"
//         }
//       }
//     })
   
   
  
  .state('tab.job', {
    url: '/job',
    views: {
      'tab-job': {
        templateUrl: 'templates/tab-job.html',       
      }
    }
  })
    
/*if(localStorage.length == 0){
  $urlRouterProvider.otherwise('/login');
}else if(localStorage.length >1) {
  $urlRouterProvider.otherwise('/tab/home');
}else if (localStorage.length==1){
  $urlRouterProvider.otherwise('/companystatus');
}else{
  $urlRouterProvider.otherwise('/login');
}*/
if(window.localStorage["usertypeID"] ==1){
    if(localStorage.length == 0){
      $urlRouterProvider.otherwise('/login');
    }else if(localStorage.length >0) {
      $urlRouterProvider.otherwise('/tab/home');
    }else{
      $urlRouterProvider.otherwise('/login');
    }
}else{
  $urlRouterProvider.otherwise('/login');
}

//  $urlRouterProvider.otherwise('/tab/companystatus');

})
.service('APIInterceptor', function($location) {
  var service = this;
  service.request = function(config) {

      return config;
  };
  service.responseError = function(response) {
      if (response.status === 401) {
     
      $location.path('/login');
} 
  };
})


// .config(function (ionicDatePickerProvider) {
//     var datePickerObj = {
//       inputDate: new Date(),
//       titleLabel: 'Select a Date',
//       setLabel: 'Set',
//       //todayLabel: 'Today',
//       closeLabel: 'Close',
//       mondayFirst: false,
//       weeksList: ["S", "M", "T", "W", "T", "F", "S"],
//       monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       templateType: 'popup',
//       //from: new Date(1930, 1, 1),
//       //to: new Date()-1,
//       showTodayButton: true,
//       dateFormat: 'dd MMMM yyyy',
//       closeOnSelect: false,
//       disableWeekdays: []
//     };
//     ionicDatePickerProvider.configDatePicker(datePickerObj);
//   })

.filter('nl2br', ['$filter',
  function($filter) {
    return function(data) {
      if (!data) return data;
      return data.replace(/\n\r?/g, '<br />');
    };
  }
  ])
