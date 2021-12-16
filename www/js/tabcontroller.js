//login
angular.module('tab', [])

.controller('TabCtrl', function($scope, $http, $state,$rootScope,$ionicModal,$ionicPopup,
  $timeout,$ionicPlatform,$ionicTabsDelegate,$interval,$ionicPopover,$ionicLoading) {


              	 $scope.homepage = function(){   
                  //$state.go('tab.home');
                    //$rootScope.Tenantid=localStorage.getItem('tenantid');
                   $state.go('tab.home',{ 'index': $rootScope.Tenantid});  
                }

                $scope.machinepage=function(){
                      $state.go('tab.machine',{ 'index': $rootScope.Tenantid});    
                }   
                $scope.operatorpage=function(){
                  $state.go('tab.operator',{ 'index': $rootScope.Tenantid});    
            }   
              
                $rootScope.Tenantid=localStorage.getItem('tenantid');

                $scope.alarm = function(){ 

                 

                           $scope.ssss=[];

                            $scope.AlarmList = "0";
                             $ionicModal.fromTemplateUrl('alarm.html', {
                             scope: $scope,
                             animation: 'slide-in-up'
                              }).then(function(modalalarm) {
                             $scope.modalalarm = modalalarm;
                             $scope.modalalarm.show();
                             });

                         $ionicLoading.show
                          ({
                          content: 'Loading',
                          animation: 'fade-in',
                          showBackdrop: true,
                          maxWidth: 200,
                          showDelay: 0
                          });
                            
                             $http({
                             method:'GET',
                             url:$rootScope.Baseurl+'alarms?tenant_id='+$rootScope.Tenantid
                           }).then(function(response){
                              console.log(response);
                               $timeout(function () {
                                  $ionicLoading.hide(); 
                               })
                             $scope.Alarm= response.data;
                             for (var i =0;i< response.data.length ; i++) {
                              var inputJSON = {
                                  "created_date": $scope.Alarm[i].created_at,
                                  "current_time": $scope.Alarm[i].updated_at
                              };

                              function getDataDiff(startDate, endDate) {
                                      var diff = endDate.getTime() - startDate.getTime();
                                      var days = Math.floor(diff / (60 * 60 * 24 * 1000));
                                      var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
                                      var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
                                      var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
                                      return { day: days, hour: hours, minute: minutes, second: seconds };
                                  }
                                  $scope.diff = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
                                  $scope.ssss.push( $scope.diff );
                               
                             }        



                          $scope.AlarmData = angular.merge($scope.Alarm, $scope.ssss);

                                  
                             })

                             $scope.delete=function(id)
                             {
                              $http.delete($rootScope.Baseurl+'alarms/'+id).success(function(data) { 
                              alert("Deleted Successfully",id); 
                                $scope.reload();
                               });
                            }
                } 

$scope.scrollHandler = function(event) {
   $scope.zone.run(()=>{
     // since scrollAmount is data-binded,
     // the update needs to happen in zone
     $scope.scrollAmount++
   })
}



                 $scope.doRefresh = function() {
                  $scope.ssss=[];
                     $timeout( function() {
                      $http({
                       method:'GET',
                       url:$rootScope.Baseurl+'alarms?tenant_id='+$rootScope.Tenantid
                        }).then(function(response){
                          $scope.Alarm= response.data;
                          for (var i =0;i< response.data.length ; i++) {
                           var inputJSON = {
                               "created_date": $scope.Alarm[i].created_at,
                               "current_time": $scope.Alarm[i].updated_at
                           };

                           function getDataDiff(startDate, endDate) {
                                   var diff = endDate.getTime() - startDate.getTime();
                                   var days = Math.floor(diff / (60 * 60 * 24 * 1000));
                                   var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
                                   var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
                                   var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
                                   return { day: days, hour: hours, minute: minutes, second: seconds };
                               }
                               $scope.diff = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
                               $scope.ssss.push( $scope.diff );
                            
                          }        



                       $scope.AlarmData = angular.merge($scope.Alarm, $scope.ssss);
                     
                     
                        $scope.$broadcast('scroll.refreshComplete');
                     
                       })          
                      }, 1000);
                  
              };

                $scope.closemodalalarm = function() {
                  $scope.modalalarm.hide();
                  
                };

               $scope.alert = function(){ 
                          $scope.NotificationList="0";
                            $ionicModal.fromTemplateUrl('alert.html', {
                               scope: $scope,
                               animation: 'slide-in-up'
                                }).then(function(modalalert) {
                               $scope.modalalert = modalalert;
                               $scope.modalalert.show();

                               $http({
                                method: 'GET',
                                url: $rootScope.Baseurl+'alerts?tenant_id=' + $rootScope.Tenantid
                              }).then(function (response) {
                                console.log(response);
                               
                                $scope.alertRes = response.data;
                              
                              })

                               })

                }
                
                $scope.alertRefresh=function(){
                  $http({
                    method: 'GET',
                    url: $rootScope.Baseurl+'alerts?tenant_id=' + $rootScope.Tenantid
                  }).then(function (response) {
                    console.log(response);
                  
                    $scope.alertRes = response.data;
                    $scope.$broadcast('scroll.refreshComplete');
                  })
                }
                  $scope.closemodalalert = function() {
                   
                      $scope.modalalert.hide();
                     
                    }


                    //setting page
            $scope.settingData={machine_id:"",time_interval:"",alarm_for:"",alarm_type:"",active:true};
                 $scope.settings = function(){ 
                            $ionicModal.fromTemplateUrl('setting.html', {
                               scope: $scope,
                               animation: 'slide-in-up'
                                }).then(function(modalsetting) {
                               $scope.modalsetting = modalsetting;
                               $scope.modalsetting.show();
                               })

                                 $http({
                                 method:'GET',
                                 url:$rootScope.Baseurl+'machines?tenant_id='+$rootScope.Tenantid})
                                 .then(function(response){
                                     $scope.machinenameList=response.data;
                                     $scope.machinenameside=$scope.machinenameList ;  
                                      $scope.machinename = function(objs)
                                      {
                                        if(objs !=null)
                                           $scope.machinenametype=objs.id;
                                       }
                                      
                                 })

                                  $http({
                                 method:'GET',
                                 url:$rootScope.Baseurl+'set_alarm_settings?tenant_id='+$rootScope.Tenantid})
                                 .then(function(response){
                                   
                                      $scope.setalarmgetRes=response.data;
                                 })


                              /*   $http({
                                 method:'GET',
                                 url:$rootScope.Baseurl+'alarm_types'})
                                 .then(function(response){
                                     $scope.alarmList=response.data;
                                     $scope.alarmside=$scope.alarmList ;  
                                    
                                 })*/


                                     $scope.statusList=[
                                      { "status_name": "Running" }, 
                                      { "status_name": "Idle" }, 
                                      { "status_name": "Stop" }
                                      ]
                                     $scope.statuside=$scope.statusList ;  
                                      $scope.status = function(objs)
                                      {
                                        if(objs != null)
                                           $scope.statustype=objs.status_name;
                                      }


                   }

/*
                   $scope.order={};
                    $scope.format=function(){
                      $rootScope.modifiedOrder=[];
                      angular.forEach($scope.order, function(value, key) {
                        if(value){
                          $rootScope.modifiedOrder.push(parseInt(key));
                        }
                    });
                    }*/


                  $scope.closemodalsetting = function() {
                     $scope.modalsetting.hide();
                     
                    };

                     

                  $scope.clearset=function(){
                     $scope.settingData={machine_id:"",time_interval:"",alarm_for:"",alarm_type:"",active:true};
                  }

                  $scope.setStatus=function(status,id,time){
                   if(time == ''){
                     var alertPopup =$ionicPopup.alert({
                           title: "Error",
                           content: "Please Select Time"
                           }) 
                     return;
                   }

                  
                    // $ionicPopup.show({
                    // title : 'Yantra24x7',
                    // template : 'Are you sure you want to change ?',
                    // buttons : [{
                    //   text : 'Cancel',
                    //   type : 'button-positive',
                    //  }, {
                    //   text : 'Ok',
                    //   type : 'button-danger',
                    //   onTap : function() {

                       
                        $ionicLoading.show
                        ({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                        });
                            $http({
                                method: 'put',
                                url: $rootScope.Baseurl+'set_status',
                                data:  {"id":id,"active":status} 
                            })
     
                              .success(function(data) {
                               $scope.setshow=1;
                               $http({
                                 method:'GET',
                                 url:$rootScope.Baseurl+'set_alarm_settings?tenant_id='+$rootScope.Tenantid})
                                 .then(function(response){
                                   
                                      $scope.setalarmgetRes=response.data;
                                      $timeout(function () {
                                       $ionicLoading.hide(); 
                                    })
                                    var alertPopup =$ionicPopup.alert({
                                     title: "Success",
                                     content: "Updated successfully"
                                     }) 
                                    
                                      
                                 })
                                
                               
                              })
                     // }
                   //  }]
                    //});
                
                  

                  }
                    
                     $scope.setsave=function(data){
                     console.log(data);
                          
                     if(data.time_interval == ''){
                     
                     var alertPopup =$ionicPopup.alert({
                           title: "Error",
                           content: "Please Select Time"
                           }) 
                     return;
                     }
                     $ionicLoading.show
                     ({
                     content: 'Loading',
                     animation: 'fade-in',
                     showBackdrop: true,
                     maxWidth: 200,
                     showDelay: 0
                     });
                     
                           var upadteData={"time_interval":data.time_interval}

                       $http({
                           method: 'put',
                           url: $rootScope.Baseurl+'set_alarm_settings/'+data.id,
                           data:upadteData  
                       })
                         .success(function(data) {
                         
                           var alertPopup =$ionicPopup.alert({
                           title: "Success",
                           content: "Updated successfully"
                           }) 
                           $timeout(function () {
                            $ionicLoading.hide(); 
                         })
                         }) 

                     }


                    $scope.settingsubmit=function(){
                      //console.log(ss)
                     // return;
                           /* var setting= {                           
                               "time_interval":$scope.data.Time,
                               "alarm_for": $scope.statustype,
                               "alarm_type":$rootScope.modifiedOrder,
                               "machine_id":$scope.machinenametype
                               }*/
                           

                       $http({
                           method: 'post',
                           url: $rootScope.Baseurl+'set_alarm_settings',
                           data:  $scope.settingData  
                       })

                         .success(function(data) {
                          $scope.setshow=1;
                           var alertPopup =$ionicPopup.alert({
                           title: "Success",
                           content: "Updated successfully"
                           }) 
                           alertPopup.then(function(res) {
                            $state.go('tab.home');
                          });
                         }) 
                    }
            $scope.times=[5,10,15,20,25,30,35,40,45,50,55,60];
                  
                //setting end 



                  $scope.operaterentry = function(){ 
                     $state.go('operaterentry');
                     $scope.popover.hide();
                  }

                 $ionicPopover.fromTemplateUrl('templates/popover.html', {
                    scope: $scope,
                  }).then(function(popover) {
                    $scope.popover = popover;
                 });

                 $ionicPopover.fromTemplateUrl('templates/popover1.html', {
                    scope: $scope,
                  }).then(function(popover1) {
                    $scope.popover1 = popover1;
                 });


                    $scope.changepassword = function(){ 
                           $state.go('changepassword');
                           $scope.popover.hide();                               
                     }

                     $scope.datamissing = function(){ 
                           $state.go('missingdataentry');
                           $scope.popover.hide();                               
                     }     

                    

                  $scope.Logout= function(){
                    
                            var confirmPopup = $ionicPopup.confirm({
                                   title: 'Exit Yantra24x7 ?',
                                   template: 'Are you sure want to logout?',
                                    buttons : [{
                                text : 'Cancel',
                                type : 'button-green',
                               }, {
                                text : 'Ok',
                                type : 'button-red',
                                onTap : function() {
                                  sessionStorage.clear();
                                  //localStorage.clear();
                                  $rootScope.username='';
                                  $rootScope.myname='';
                                  //$rootScope.tenantid='';
                                  $rootScope.MachineID='';
                                  $rootScope.hoursplit='';
                                  $rootScope.shiftstype='';
                                  $rootScope.Datamissing='';
                                  $rootScope.MachineName='';
                                  $rootScope.id='';
                                  $rootScope.Tenantid='';
                                 /* var id=localStorage.getItem("onesignalid");
                                $http.delete($rootScope.Baseurl+'one_signals/'+id).success(function(data) {    
                                    });*/
                                    localStorage.removeItem('access_token')
                                    localStorage.removeItem('id')
                                    localStorage.removeItem('onesignalid')
                                    localStorage.removeItem('tenantid')
                                    localStorage.removeItem('uname')
                                    localStorage.removeItem('usertypeID')

                                    $state.go('login');                             
                                  }
                                }]
                              })
                     }


                     

                  $scope.goForward = function () {
                                var selected = $ionicTabsDelegate.selectedIndex();
                                if (selected != -1) {
                                    $ionicTabsDelegate.select(selected + 1);
                                }
                                if(selected == 0){
                                   $state.go('tab.machine',{ 'index': $rootScope.Tenantid});
                                }
                               
                    }

                    $scope.goBack = function () {                              
                              var selected = $ionicTabsDelegate.selectedIndex();
                              if (selected != -1 && selected != 0) {
                                  $ionicTabsDelegate.select(selected - 1);
                              }
                              if(selected == 1){
                                   $state.go('tab.home',{ 'index': $rootScope.Tenantid});  
                              }else if(selected == 2){
                                   $state.go('tab.machine',{ 'index': $rootScope.Tenantid});
                              }
                                
                   } 

})

