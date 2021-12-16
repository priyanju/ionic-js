//Machine

angular.module('machine', [])

  .controller('MachineCtrl', function ($scope, $http, $state, $rootScope, $interval, $ionicModal, $ionicLoading, $timeout, ionicDatePicker, $filter, $ionicPopup) {
    //$interval.cancel($rootScope.setInterval);
  	$rootScope.Tenantid = localStorage.getItem('tenantid');

  		$scope.Timevalues = "";
	    $scope.timeMethod = function (time) {
	      $scope.Timevalues = time;
	      if (!angular.isUndefined(time)) {
	        var hms = $scope.Timevalues;
	        var a = hms.split(':');
	        var minutes = (+a[0]) * 60 + (+a[1]);
	        return minutes;
	      }
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
	        url: $rootScope.Baseurl + 'machines?tenant_id=' + $rootScope.Tenantid
	      })
	      .then(function (response) {
	        $timeout(function () {
	          $ionicLoading.hide();
	        })
	        if(response.data!=null){
		        if (response.data == "") {
		          alert("There is no Machine..!");
		        } else {
		          $scope.machinenames = response.data;
		          $scope.machinelenth = response.data.length;

		          $scope.groups = [];
		          for (var i = 0; i < $scope.machinelenth; i++) {
		            $scope.groups[i] = {
		              name: $scope.machinenames[i].machine_name,
		              id: $scope.machinenames[i].id,
		              items: [i],
		              show: false
		            };
		          }
	            }   
	         }
	      })

        $scope.isGroupShown = function (group) {
	      return $scope.shownGroup === group;
	    };

        $scope.toggleGroup = function (group) {
		      $scope.show = 1;
		      $scope.logdata = 'MachineTimeline';

		      $scope.check = function (check, Showvalues) {
		        $scope.show = Showvalues;
		        $scope.logdata = check;
		      }

		      if ($scope.isGroupShown(group)) {
		        $scope.shownGroup = null;
		      } else {
		      	$ionicLoading.show({
			      content: 'Loading',
			      animation: 'fade-in',
			      showBackdrop: true,
			      maxWidth: 200,
			      showDelay: 0
			    });
		      	$scope.Current_Shift();
		        $scope.MachineID = group.id;
		        localStorage.setItem('MachineID', $scope.MachineID);
		        $scope.shownGroup = group;
		      }
        }

        $scope.Current_Shift=function(){
	         $http({
	            method: 'GET',
	            url: $rootScope.Baseurl + '/machine_current_shit?tenant_id=' + $rootScope.Tenantid
	          })
	            .then(function (response) {
	            	$scope.Current_Hours();
	              if(response.data != null){
	                  $scope.shiftsList = response.data.shift;  
	                  $scope.date=response.data.date;       
	              }            
	          })
        }

        $scope.Current_Hours=function(){
          $http({
            method: 'GET',
            url: $rootScope.Baseurl + '/current_shift_hour_wise?tenant_id='+$rootScope.Tenantid+'&machine_id='+$scope.MachineID
          })
            .then(function (response) { 
                $timeout(function () {
		          $ionicLoading.hide();
		        })           
              $rootScope.Hour_times = response.data;
              $scope.run = $scope.timeMethod(response.data.tot_run);
              $scope.idle = $scope.timeMethod(response.data.tot_idle);
              $scope.stop = $scope.timeMethod(response.data.tot_stop);
              $scope.nodata = $scope.timeMethod(response.data.no_data);
              $scope.chart($scope.run,$scope.idle,$scope.stop,$scope.nodata)            
          })
        }
    


        $scope.chart = function (run,idle,stop,nodata) {

		      google.charts.load("visualization", "1", {
		        callback: drawChart,
		        packages: ["corechart"]
		      });
	      
		        function drawChart() {
			        var data = new google.visualization.DataTable();
			        data.addColumn('string', 'Task');
			        data.addColumn('number', 'Hours per Day');
			        data.addRows([
			          ["Running", run],
			          ["DownTime", idle],
			          ["Stopping", stop],
			          ["Remaing", nodata]
			        ]);
			        var options = {
			          width: 450,
			          height: 300,
			          colors: ["#6bd191", "#eaab5b", "#ed6661", "#757575"],
			          legend: {
			            position: 'none'
			          },
			          pieHole: 0.4,
			          animation: {
			            duration: 800,
			            easing: 'in'
			          },
			          tooltip: {
			            trigger: 'none'
			          }
			        };
			        console.log($scope.MachineID)
			        var chart = new google.visualization.PieChart(document.getElementById($scope.MachineID));
			        chart.draw(data, options);
		        }
        }

        $ionicModal.fromTemplateUrl('results.html', {
	      scope: $scope,
	      animation: 'slide-in-up'
	    }).then(function (modal) {
	      $scope.modal = modal;
	    });

	    $scope.openModal = function (id) {
	    	 $rootScope.IDStatus = id;
	    	 console.log($rootScope.Hour_times)
		     $scope.modal.show();
	    }

	    $scope.closeModal = function () {
           $scope.modal.hide();
        }

})