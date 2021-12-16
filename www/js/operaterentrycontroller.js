
//login
angular.module('operaterentry', [])

.controller('OperaterEntryCtrl', function($scope, $http, $state,$rootScope,$ionicModal,$ionicPopup,
  $timeout,$ionicPlatform,$ionicTabsDelegate,$interval,$ionicPopover,$filter) {

                  //var Tenantid=localStorage.getItem('tenantid');
                   var id=localStorage.getItem("id");                 

                  $http({
                   method:'GET',
                   url:$rootScope.Baseurl+'machines/dashboard_test?tenant_id='+$rootScope.Tenantid})
                  .then(function(response){
                     $scope.machinenameList=response.data;
                     $scope.machinenameside=$scope.machinenameList ;  
                      $scope.machinename = function(objs)
                      {
                           $scope.machinenametype=objs.machine_id;
                      }

                      $scope.jobnameList=response.data;
                     $scope.jobnameside=$scope.jobnameList ;  
                      $scope.jobname = function(objs)
                      {
                           $scope.jobnametype=objs.job_id;
                           $scope.operation(objs.job_id);
                      }
                  })

                $scope.operation=function(id){
                       $http({
                       method:'GET',
                       url:$rootScope.Baseurl+'cncoperations/cncoperation_list?job_id='+id})
                       .then(function(response){
                        $scope.operatorList=response.data;
                        $scope.operatorside=$scope.operatorList ;  
                        $scope.operator = function(objs)
                        {
                        $scope.operatortype=objs.id;
                        } 
                      })
                }

               $http({
               method:'GET',
               url:$rootScope.Baseurl+'shifttransactions/get_all_shift?tenant_id='+$rootScope.Tenantid})
              .then(function(response){
                 $scope.shiftList=response.data;
                 $scope.shiftside=$scope.shiftList ;  
                  $scope.shift = function(objs)
                  {
                       $scope.shifttype=objs.id;
                  } 
              })      

               $scope.timeList=[
                 {"value":"8 AM-9 AM"},
                 {"value":"9 AM-10 AM"},
                 {"value":"10 AM-11 AM"},
                 {"value":"11 AM-12 Noon"},
                 {"value":"12 Noon-1 PM"},
                 {"value":"1 PM-2 PM"},
                 {"value":"2 PM-3 PM"},
                 {"value":"3 PM-4 PM"},
                 {"value":"4 PM-5 PM"},
                 {"value":"5 PM-6 PM"},
                 {"value":"6 PM-7 PM"},
                 {"value":"7 PM-8 PM"},
                 {"value":"8 PM-9 PM"}  
               ];

                 $scope.timeside=$scope.timeList ;  
                  $scope.time = function(objs)
                  {
                       $scope.timetype=objs.value;
                  }

                    $scope.data = {
                      Rejects:"",
                      Rework:"",
                      PartsInspected:"",
                      PartsMovedNextOperation:"",
                      ReasonsForDowntime:"",
                      LastMachineResetTime:"",
                      Remarks:""};

                    var nowdate = new Date();
                    var date = $filter('date')(nowdate, "dd-MM-yyyy");
                    console.log(nowdate,"nowdate",date);
                    var id=localStorage.getItem("id");

          $scope.operationentry=function()
          {
                          var operation= {
                            "operatorworkingdetail":{
                               "working_date":date,
                               "from_time":$scope.timetype,
                               "to_time":$scope.timetype,
                               "user_id":id,
                               "shifttransaction_id":$scope.shifttype,
                               "machine_id":$scope.machinenametype,
                               "tenant_id":$rootScope.Tenantid,
                                "no_of_reworks":$scope.data.Rework,
                               "no_of_rejects":$scope.data.Rejects,
                               "no_of_parts_produced":$scope.data.PartsInspected,
                               "parts_moved_to_next_operation":$scope.data.PartsMovedNextOperation,
                               "total_down_time":1,
                               "reason_for_down_time":$scope.data.ReasonsForDowntime,
                               "last_machine_reset_time":$scope.data.LastMachineResetTime,
                               "remarks":$scope.data.Remarks,
                               "cncoperation_id":$scope.operatortype,
                               "cncjob_id":$scope.jobnametype
                             }
                            };

                       $http({
                           method: 'post',
                           url: $rootScope.Baseurl+'operatorworkingdetails',
                           data: operation  
                       })

                         .success(function(data) {
                           var alertPopup =$ionicPopup.alert({
                           title: "Success",
                           content: "Updated successfully"
                           }) 
                           alertPopup.then(function(res) {
                            $state.go('tab.home',{ 'index': $rootScope.Tenantid});
                          });
                         })
            }


             $scope.Changepassword=function(){


              if($scope.data.OldPassword==null){
                 var alertPopup1 =$ionicPopup.alert({
                 title: "Error",
                 content: "Please entry the old password"
                 })
              }else if($scope.data.NewPasssword==null){
                 var alertPopup2 =$ionicPopup.alert({
                 title: "Error",
                 content: "Please entry the new password"
                 })
              }else if($scope.data.ConfirmPassword==null){
                var alertPopup3 =$ionicPopup.alert({
                 title: "Error",
                 content: "Please entry the confirm password"
                 })
              }else if($scope.data.NewPasssword!=$scope.data.ConfirmPassword){
                  var alertPopup1 =$ionicPopup.alert({
                 title: "Error",
                 content: "password dose not match"
                 })
              }else{
                       $http({
                       method:'GET',
                       url:$rootScope.Baseurl+'sessions/change_pwd?user_id='+id+'&old_pwd='+$scope.data.OldPassword+'&new_pwd='+$scope.data.NewPasssword})
                       .then(function(response){
                            $scope.PasswordDeatils=response.data;  
                            if(response.data==false){
                               var alertPopup4 =$ionicPopup.alert({
                               title: "Error",
                               content: "Please entry the correct details"
                               })
                            }else{
                              var alertPopup4 =$ionicPopup.alert({
                               title: "success",
                               content: "Your password changed"
                               })
                              alertPopup4.then(function(res) {
                                $state.go('login');
                              });                          
                            }                       
                        })

                     }
                }


                    $scope.Logout= function (){
                         //var Tenantid=localStorage.getItem('tenantid');
                         $state.go('tab.home',{ 'index': $rootScope.Tenantid});                           
                     }

            
        	   

})