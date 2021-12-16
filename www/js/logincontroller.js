//login
angular.module('login', [])

.controller('LoginCtrl', function($scope, $http, $state,$rootScope,$ionicModal,$ionicPopup,$timeout,$ionicPlatform,$ionicTabsDelegate,$interval,$ionicLoading) {
  
       $scope.selectTabWithIndex = function(index) {
          $ionicTabsDelegate.select(index);
        }

        $scope.login = {email_id :"", password :""}; 
 

$scope.loginInit=function(){
  
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
       // alert(playerid);
   });
}

 $timeout(function () {
  $ionicLoading.hide();
},1500)


$scope.login={email_id: localStorage.getItem("email")};

        $scope.signin = function(){
          var email =  $scope.login.email_id
          var password = $scope.login.password
 
        localStorage.setItem('password',password);
        localStorage.setItem('email',email);

                    $scope.Playerid=localStorage.getItem('playerid');
                     if($scope.login.email_id==""){
                           var alertPopup = $ionicPopup.alert({
                              title: "Error",
                              content: "Please enter your email-id"
                            })
                      }else if($scope.login.password==""){
                             var alertPopup1 =$ionicPopup.alert({
                              title: "Error",
                              content: "Please enter your password"
                            })
                      }else{
                           $ionicLoading.show
                          ({
                          content: 'Loading',
                          animation: 'fade-in',
                          showBackdrop: true,
                          maxWidth: 200,
                          showDelay: 0
                          });

                          var login=
                          {
                            "email_id":$scope.login.email_id,
                            "password":$scope.login.password,
                            "player_id":$scope.Playerid
                            
                          }
                          $http
                          ({
                            method: 'post',
                         //   url: $rootScope.Baseurl+'sessions',
                            url: $rootScope.Baseurl+'login',
                            data: login  
                            
                          })

                          .success(function(data) {
                           
                           $http.defaults.headers.common.Authorization = 'Bearer '+data.access_token;
                            console.log(data.usertype_id);

                                $timeout(function () {
                                  $ionicLoading.hide(); 
                              })

                            localStorage.setItem("uname" , data.first_name);
                            $rootScope.myname = localStorage.getItem("uname");

                         if(data.usertype_id==1)
                            {
                               if(data.id >0){
                                   $scope.login.email_id="";
                                   $scope.login.password=""; 
                                   localStorage.setItem('usertypeID',data.usertype_id); 
                                   localStorage.setItem("access_token",data.access_token);
                                   localStorage.setItem('tenantid',data.tenant_id);
                                   localStorage.setItem('id',data.id);                                  
                                   var id=localStorage.getItem("id");
                                   localStorage.setItem('onesignalid',data.onesignal_id);             
                                   $state.go('tab.home',{ 'index': data.tenant_id});                            
                                   
                               }
                               else{   
                               var alertPopup3 =$ionicPopup.alert({
                                  title: "Error",
                                  content: "Email-id or password does not match"
                                })
                                 alertPopup3.then(function(res) {  
                                   $scope.login.email_id="";
                                   $scope.login.password="";    
                                })                                      
                               } 
                            }else if(data===false){
                              var alertPopup5 =$ionicPopup.alert({
                                  title: "Error",
                                  content: "Email-id or password is incorrect"
                                })
                                alertPopup5.then(function(res) {  
                                   $scope.login.email_id="";
                                   $scope.login.password="";    
                                })         
                            }else if(data.usertype_id==2){
                              localStorage.setItem('usertypeID',data.usertype_id);
                               $state.go('companystatus'); 
                            }      
                          
                          });   

                     }
          }     
    

 
        $scope.ForgotPasswordModal = function() 
        {
                  $scope.data = { wifi:"" };
                  var myPopup = $ionicPopup.show({
                  template: '<input type="email" ng-model="data.wifi" class="passwords">',
                  title: 'Enter Your Email-ID',
                  scope: $scope,
                  buttons: [
                    { text: 'Cancel',
                      type: 'button-green'
                    },
                    {
                      text: 'Ok',
                      type: 'button-red',
                      onTap: function(e) {

                        if($scope.data.wifi==""){
                            var alertPopup8 =$ionicPopup.alert({
                            title: "Error",
                            content: "Please entry the email-id"
                          })
                        } else {
                       $http.get($rootScope.Baseurl+'users/password_recovery?email_id='+$scope.data.wifi)
                      .success(function(response) {
                        if(response.password==false){
                           var alertPopup6 =$ionicPopup.alert({
                            title: "Error",
                            content: "Your  Email-ID is wrong.Please try again"
                          })
                        }else{
                             $scope.password =response.password;
                              var alertPopup7 =$ionicPopup.alert({
                            title: "Password Notification",
                            content: "Your password is  : "+$scope.password
                          })
                        } 
                   
                        })
                          return $scope.data.wifi;
                        }
                      }
                    }
                  ]
                });

       }

 
})
//loginExit