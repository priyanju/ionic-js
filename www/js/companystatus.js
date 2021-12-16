angular.module('companystatus', [])

.controller('CompanyStatusCtrl', function($scope,$state,$http,$rootScope,$filter,$timeout) {

          	$scope.Logout=function(){
          	   	$state.go('login');
            }
            $scope.date = new Date();   
	             $http({
               method:'GET',
               url:$rootScope.Baseurl+'machines/status'})
              .then(function(response){               
                      $scope.companystatus = response.data;
                      console.log($scope.companystatus);
               })
 
                 $scope.doRefresh = function() {
                  
                    $timeout( function() {
                              $http({
                               method:'GET',
                               url:$rootScope.Baseurl+'machines/status'})
                              .then(function(response){
                                $scope.$broadcast('scroll.refreshComplete');
                                      $scope.companystatus = response.data;
                               })    
                         }, 1000);      
                  };


})



