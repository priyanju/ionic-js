//Home
angular.module('home', [])

.controller('HomeCtrl', function($state,$scope,$http,$rootScope, $stateParams,$interval,$timeout,$ionicLoading,$ionicPopover,$ionicModal,$ionicPopup,$ionicHistory) {  
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  //$interval.cancel($rootScope.setInterval);
              $rootScope.myname = localStorage.getItem("uname");

              $rootScope.date = new Date();   
              var tick = function () {
                $scope.date = Date.now();
              }
          
              tick();
              $interval(tick, 1000);
              $rootScope.Tenantid=localStorage.getItem('tenantid');

            $scope.machineClick=function(detail){ 
              $ionicModal.fromTemplateUrl('templates/machinemodel.html',{
                scope: $scope,
                animation: 'slide-in-up'
                }).then(function(machinemodel) {
                $scope.machineModel = machinemodel;
              
                $ionicLoading.show
                ({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
                });
                $http({
                  method: 'GET',
                  url: $rootScope.Baseurl+ 'single_machine_live_status?tenant_id=' +$rootScope.Tenantid+'&machine_id='+detail.machine_id
                }).then(function (response) {
                  $scope.machineModel.show();                
                  $scope.singleMachineRes=response.data;
                  console.log($scope.singleMachineRes)
                  $rootScope.spindle_load = $scope.singleMachineRes.spindle_load <= 100 ? ($scope.singleMachineRes.spindle_load == 0 ? 0 : 1) : Math.ceil($scope.singleMachineRes.spindle_load/100);
                  $timeout(function () {
                    $ionicLoading.hide(); 
                 })              
                })
                });
               
              }


              $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
              });
                
                $http({
                  method: 'GET',
                  url: $rootScope.Baseurl + 'machines/machine_counts?tenant_id=' + $rootScope.Tenantid
                }).then(function (response) {
                 console.log(response.data.machine_count);
                 $scope.machineCount=response.data.machine_count;
        
                 if($scope.machineCount <= 3){ 
                  $http({
                    method: 'GET',
                    url:$rootScope.Baseurl+ 'machines/dashboard_live?tenant_id=' + $rootScope.Tenantid
                  }).then(function (response) {
                    $timeout(function () {
                      $ionicLoading.hide();
                    })
                   
                    $scope.cardnames = response.data;
                    
                             
                  })
                }
    
              if($scope.machineCount >= 4){ 
                $http({
                  method: 'GET',
                  url: $rootScope.Baseurl+ 'latest_dashboard?tenant_id=' + $rootScope.Tenantid
                }).then(function (response) {
                  $timeout(function () {
                    $ionicLoading.hide();
                  })
                             
                  $scope.cardnames = response.data;             
                })
              }
                })

                $scope.loadStatus = function(){
	                $http({
                  method: 'GET',
                  url: $rootScope.Baseurl+ 'latest_dashboard?tenant_id=' + $rootScope.Tenantid
                }).then(function (response) {
                  $timeout(function () {
                    $ionicLoading.hide();
                  })
                             
                  $scope.cardnames = response.data;             
                })

                }

              $scope.doRefresh =function() {
                $ionicLoading.show({
                  content: 'Loading',
                  animation: 'fade-in',
                  showBackdrop: true,
                  maxWidth: 200,
                  showDelay: 0
                });
                     $rootScope.date = new Date();
                     if($scope.machineCount <= 3){ 
                      $http({
                        method: 'GET',
                        url:$rootScope.Baseurl+ 'machines/dashboard_live?tenant_id=' + $rootScope.Tenantid
                      }).then(function (response) {
                        $timeout(function () {
                          $ionicLoading.hide();
                        })
                        $scope.cardnames = response.data;
                        $timeout(function() {
                          $scope.$broadcast('scroll.refreshComplete');
                        }, 2000);
                                 
                      })
                    }
            
                  if($scope.machineCount >= 4){ 
                    $http({
                      method: 'GET',
                      url: $rootScope.Baseurl+ 'latest_dashboard?tenant_id=' + $rootScope.Tenantid
                    }).then(function (response) {
                      $timeout(function () {
                        $ionicLoading.hide();
                      })           
                      $scope.cardnames = response.data;             
                    })
                  }
                      $timeout(function() {
                      $scope.$broadcast('scroll.refreshComplete');
                    }, 2000);
              }

          
              // $scope.Downtimeclose= function() {
              //     $scope.modalDowntime.hide();
              //  };
         
               $scope.DowntimeModal = function(totalloadunloadtime,idletime,downtime){
                        $scope.totalloadunloadtime=totalloadunloadtime;
                        $scope.idletime=idletime;
                        $scope.downtime=downtime;
                      
                        $ionicModal.fromTemplateUrl('template/downtime.html',{
                        scope: $scope,
                        animation: 'slide-in-up'
                        }).then(function(modalDowntime) {
                        $scope.modalDowntime = modalDowntime;
                        $scope.modalDowntime.show();
                        });
                }

               $scope.PartsCountclose= function() {
                  $scope.modalPartsCount.hide();
               };
         
               $scope.PartsCountModal = function(Details){
                       $scope.Details=Details;
                        $ionicModal.fromTemplateUrl('template/partscount.html',{
                        scope: $scope,
                        animation: 'slide-in-up'
                        }).then(function(modalPartsCount) {
                        $scope.modalPartsCount = modalPartsCount;
                        $scope.modalPartsCount.show();
                        });
                }

                $scope.showPopup = function() {
                        $scope.data = {}
                        var myPopup = $ionicPopup.show({       
                           title: 'Some kind of data missing please entry the details',                           
                           scope: $scope,                        
                             buttons: [
                            { text: 'Later',
                              type: 'button-green'
                            },
                            {
                              text: 'Now',
                              type: 'button-red',
                              onTap: function(e) { 
                                        
                                    $state.go('missingdataentry');                  
                                    
                                 }
                            }
                          ]
                      });

                        myPopup.then(function(res) {
                           console.log('Tapped!', res);
                        });    
                 }

                 $scope.missingdataLogout=function(){
                  $state.go('tab.home');
                 }


               
})

//HomeExit

.filter('splithtml', function() {
  return function(input, splitChar, splitIndex) {
     // do some bounds checking here to ensure it has that index
   
      var n=input.replace('-','/')
      var pieces = n.split(splitChar);
      //console.log(pieces)
      var s=n.split(splitChar)[1]
     // console.log(s)
      var e=pieces[pieces.length-1]
      //console.log(e)
   
     return s+"-"+e;

      //return input;
  }
})
.controller('MissingdataCtrl', function($state,$scope,$http,$rootScope,$ionicModal,$ionicPopup,$ionicLoading,$timeout) { 


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
                   url:$rootScope.Baseurl+'data_loss_entries?tenant_id='+$rootScope.Tenantid+'&start_time='+$rootScope.StartTime})
                  .then(function(response){
                    $rootScope.Datamissing=response.data
                     $timeout(function () {
                            $ionicLoading.hide(); 
                         })

                        if(response.data!=false){
                       $rootScope.Startime=response.data[0].start_time;
                         $rootScope.Endtime=response.data[0].end_time;
                         $rootScope.id=response.data[0].id;
                         $rootScope.MachineName=response.data[0].machine.machine_name;
                       }else{
                        $scope.Datastatus=1;
                       }
                   }) 
               

                    $scope.missingdataLogout=function(){
                      $state.go('tab.home',{ 'index':$rootScope.Tenantid}); 
                     }

     

            
           $scope.singleorder = [];
  
          $scope.Dataloss = function() {
           


            for (var i = 0; i < $scope.Datamissing.length; i++)
                $scope.singleorder.push({
                  'id': $scope.Datamissing[i].id,
                  'program_no': $scope.Datamissing[i].ProgramNo,
                  'downtime':$scope.Datamissing[i].DownTime,
                  'parts_produced':$scope.Datamissing[i].PartsCount
                });
           
            
                       var missingdataentry= {                          
                              "data":
                                  $scope.singleorder                                       
                            };

                       $http({
                           method: 'post',
                           url: $rootScope.Baseurl+'data_loss_entries/update_data',
                           data: missingdataentry  
                       })

                         .success(function(data) {
                           var alertPopup =$ionicPopup.alert({
                           title: "Success",
                           content: "Updated successfully"
                           }) 
                           alertPopup.then(function(res) {
                            $state.go('tab.home',{ 'index':$rootScope.Tenantid});                            
                         })
                     })
              


             }




}) 

  








  