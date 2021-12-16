//job
angular.module('job', [])

angular.module('starter.controllers', [])
.filter('startFrom', function() {
    return function(inpu, start) {
      var inp=inpu;
        start = +start; //parse to int
        return inp.slice(start);
    }
  })

.controller('JobCtrl', function($scope,$http,$rootScope,$state,$ionicModal,$ionicSlideBoxDelegate,$filter,$ionicLoading,$timeout,
  $ionicPopup) {

          /*   $ionicLoading.show
                ({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
                });

              $http({
              method:'GET',
              url:$rootScope.Baseurl+'cncjobs/all_jobs?tenant_id='+$rootScope.Tenantid})
             .then(function(response){
              $timeout(function () {
                        $ionicLoading.hide(); 
                     })
              if(response.data==""){
                alert("There is no Job..!");
              }else{
                 $scope.jobname = response.data;               
                 $scope.joblenth=response.data.length;
                 $scope.groups = [];
                   for (var i=0; i< $scope.joblenth; i++)
                    {
                      $scope.groups[i] = {
                      name: $scope.jobname[i].job_id,
                      id:$scope.jobname[i].id,
                      items: [i],
                      show: false
                      };   
                   } 
                }              
              })

                //extand 
                $scope.toggleGroup = function(group) {
                   $scope.JobID=group.id;
                  $scope.post();
                  if ($scope.isGroupShown(group)) {
                    $scope.shownGroup = null;
                  } else {
                    $scope.shownGroup = group;
                  }
                };
                $scope.isGroupShown = function(group) {
                  return $scope.shownGroup === group;
                }; 
                //extand exit

                //model 
                $scope.ope = function()
                {   

                      $ionicLoading.show
                      ({
                      content: 'Loading',
                      animation: 'fade-in',
                      showBackdrop: true,
                      maxWidth: 200,
                      showDelay: 0
                      });

                    // $rootScope.Tenantid=localStorage.getItem('tenantid');                        

                     $http({
                     method:'GET',
                     url:$rootScope.Baseurl+'cncjobs/opration_details?job_id='+$scope.JobID})
                     .then(function(response){
                       $timeout(function () {
                              $ionicLoading.hide(); 
                           })
                       if(response.data.length == 0){
                          var alertPopup = $ionicPopup.alert({
                              title: "Error",
                              content: "No operation registered"
                            })
                       }else{
                          
                          $ionicModal.fromTemplateUrl('template/operation.html',{
                              scope: $scope,
                              animation: 'slide-in-up'
                              }).then(function(modalope) {
                              $scope.modalope = modalope;
                              $scope.modalope.show();
                              });

                               $rootScope.machinelenth=response.data.length;
                               console.log(response.data.operation_details);
                               $rootScope.opration=response.data; 
                               $scope.currentPage = 0;
                               $scope.pageSize = 1;
                               $scope.data = $rootScope.opration;
                               $scope.q = '';
                              
                              $scope.getData = function () {     
                                return $filter('filter')($scope.data, $scope.q)     
                              }
                              
                              $scope.numberOfPages=function(){
                                  return Math.ceil($scope.getData().length/$scope.pageSize);                
                              } 
                        } 
                    })
              }   

            $scope.close = function() {
             $scope.modalope.hide();
            }; //model exit

             $scope.nextSlide = function() {
                $ionicSlideBoxDelegate.next();
             }

              $scope.post = function() {
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
                            url:$rootScope.Baseurl+'cncjobs/job_page_details?job_id='+$scope.JobID})
                            .then(function(response){ 
                            $scope.jobnames = response.data;
                            
                            if(response.data.job_detail.job_start_date!=null){
                                 $scope.job_start_date=response.data.job_detail.job_start_date;
                            }else{
                              $scope.job_start_date="---";
                            }

                            if(response.data.job_detail.job_due_date!=null){
                                 $scope.job_due_date=response.data.job_detail.job_due_date;
                            }else{
                              $scope.job_due_date="---";
                            }


                            if(response.data.job_detail.order_quantity!=null){
                                 $scope.order_quantity=response.data.job_detail.order_quantity;
                            }else{
                              $scope.order_quantity="---";
                            }

                            if(response.data.parts_produced!=null){
                                 $scope.parts_produced=response.data.parts_produced;
                            }else{
                              $scope.parts_produced="---";
                            }


                            if(response.data.parts_remaining!=null){
                                 $scope.remaining_parts=response.data.parts_remaining;
                            }else{
                              $scope.remaining_parts="---";
                            }

                            if(response.data.parts_deliverd!=null){
                                 $scope.parts_deliverd=response.data.parts_deliverd;
                            }else{
                              $scope.parts_deliverd="---";
                            }


                            if(response.data.parts_rework!=null){
                                 $scope.rework=response.data.parts_rework;
                            }else{
                              $scope.rework="---";
                            }

                            if(response.data.fiq!=null){
                                 $scope.final_inspected_quantity=response.data.fiq;
                            }else{
                              $scope.final_inspected_quantity="---";
                            }

                           if(response.data.parts_reject!=null){
                              $scope.reject=response.data.parts_reject;
                            }else{
                               $scope.reject="---";
                            } 

                             $http({
                             method:'GET',
                             url:$rootScope.Baseurl+'cncjobs/job_page_operation?job_id='+$scope.JobID})
                            .then(function(response){
                              $timeout(function () {
                                    $ionicLoading.hide(); 
                                 })
                                    $scope.operationdetails = response.data;  
                                  })
                               })
            }*/
 
  
})//JobExit

