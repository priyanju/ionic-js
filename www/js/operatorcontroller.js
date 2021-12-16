angular.module('operator', [])

  .controller('OperatorCtrl', function ($scope, $http, $rootScope, $state, $ionicModal, $ionicSlideBoxDelegate, $filter, $ionicLoading, $timeout,
    $ionicPopup, ) {
    $rootScope.operator_alls = [];
    $rootScope.Tenantid = localStorage.getItem('tenantid');
    $scope.todaydat = new Date();
    
    $scope.operatorassignregistration = {
      id: null,
      operator_id: null,
      machine_id: null,
      shifttransaction_id: null,
      description: "",
      tenant_id: $rootScope.Tenantid,
      from_date: null,
      to_date: null
    };

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $ionicModal.fromTemplateUrl('operatorModel.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.opmodal = modal;

    });

    var ipObj1 = {
      from: new Date(),
      to: new Date(3000, 1, 1),
      callback: function (val) {
        $scope.fmdate=val;
      //  alert($scope.fmdate);
       
        $scope.operatorassignregistration.from_date = $filter('date')(val, "dd-MM-yyyy");

      }
    };

    // $scope.openDatePicker = function () {
    //   ionicDatePicker.openDatePicker(ipObj1);
    // };

    var ipObj2 = {
      from: new Date(),
      to:  new Date(3000, 1, 1),
      callback: function (val) {
        console.log( $scope.fmdate);
        // if($scope.fmdate > val){
        //      alert("Greater then From date");
        //      return;
        // }
        $scope.operatorassignregistration.to_date = $filter('date')(val, "dd-MM-yyyy");

      }
    };

    // $scope.openDatePicker1 = function () {
    //   ionicDatePicker.openDatePicker(ipObj2);
    // };

     $rootScope.operatorinit = function () {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    $http({

        method: 'GET',
        url: $rootScope.Baseurl + 'operator_allocations?tenant_id=' + $rootScope.Tenantid
      })
      .then(function (response) {
        $rootScope.operator_alls = response.data;
        console.log(response);
        $timeout(function () {
          $ionicLoading.hide();
        })
      }).then(function (error) {

      })

      $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
      }, 2000);
     }



    $scope.deleteConf = function (id) {
      $scope.delID = id;
      var confirmPopup = $ionicPopup.confirm({
        title: 'Yantra24x7',
        template: 'Are you sure want to Delete?',
        buttons: [{
          text: 'Cancel',
          type: 'button-green',
        }, {
          text: 'Ok',
          type: 'button-red',
          onTap: function () {
            $scope.delete($scope.delID);
          }
        }]
      })
    }



    $scope.operatorForm = function () {
      var operatorassignregistration = {
        "operator_id": $scope.operatorassignregistration.operator_id,
        "machine_id": $scope.operatorassignregistration.machine_id,
        "shifttransaction_id": $scope.operatorassignregistration.shifttransaction_id,
        "description": $scope.operatorassignregistration.description,
        "tenant_id": $scope.operatorassignregistration.tenant_id,
        "from_date": $scope.operatorassignregistration.from_date,
        "to_date": $scope.operatorassignregistration.to_date
      };

      console.log($scope.operatorassignregistration);

      //return;
      if ($scope.operatorassignregistration.id == null) {
        $http
          ({
            method: 'post',
            url: $rootScope.Baseurl + 'operator_allocations',
            data: operatorassignregistration
          })

          .success(function (data) {

            if(data.msg){
              alert(data.msg);
              return;
            }

            if (data) {
              $scope.operatorassignregistration = "";
              alert("Registration completed");
              $scope.opmodal.hide();
              $rootScope.operatorinit();
              $scope.operatorassignregistration = {
                id: null,
                operator_id: null,
                machine_id: null,
                shifttransaction_id: null,
                description: "",
                tenant_id: $rootScope.Tenantid,
                from_date: null,
                to_date: null
              };

            } else {
              alert('Registration Failed');
            }
          });
      } else {

        $http
          ({
            method: 'put',
            url: $rootScope.Baseurl + 'operator_mapping_allocations/' + $scope.edit_id,
            data: operatorassignregistration
          })

          .success(function (data) {

            if (data) {
              alert("Updated Successfully");
              $scope.opmodal.hide();
              $rootScope.operatorinit();
            } else {
              alert('Updation Failed');
            }
          });
      }
    }

    $scope.cleandata = function () {
      $scope.alloedit = 0;
      $scope.cleardata = {
        id: null,
        operator_id: null,
        machine_id: null,
        shifttransaction_id: null,
        description: "",
        tenant_id: $rootScope.Tenantid,
        from_date: null,
        to_date: null
      };
      $scope.operatorassignregistration = angular.copy($scope.cleardata);
    }


    $scope.alloedit = 0;
    $scope.shiftvalueedit = null;
    $scope.edit = function (id, editid) {
      $scope.opmodal.show();
      $scope.alloedit = 1;
      $scope.edit_id = editid.id;
      $scope.edit_date = editid.date;
      var i;
      for (i in $rootScope.operator_alls) {
        if ($rootScope.operator_alls[i].id == id) {
          var operator_id = {
            id: $rootScope.operator_alls[i].id,
            operator_id: $rootScope.operator_alls[i].operator.id,
            machine_id: $rootScope.operator_alls[i].machine.id,
            shifttransaction_id: $rootScope.operator_alls[i].shifttransaction.id,
            description: $rootScope.operator_alls[i].description,
            tenant_id: $rootScope.Tenantid,
            from_date: $rootScope.operator_alls[i].from_date,
            to_date: $rootScope.operator_alls[i].to_date
          };
          $scope.shiftvalueedit = $rootScope.operator_alls[i].shifttransaction.shift_no + " (" + $rootScope.operator_alls[i].shifttransaction.shift_start_time + "-" + $rootScope.operator_alls[i].shifttransaction.shift_end_time + ")";

          $scope.operatorassignregistration = angular.copy(operator_id);
          console.log($scope.operatorassignregistration);
        }

      }
    }

    $scope.delete = function (id) {
      $http.delete($rootScope.Baseurl + 'operator_allocations/' + id).success(function (data) {
        if (data) {
          alert("Deleted Successfully");
          $rootScope.operatorinit();
        } else {
          alert('Delete Failed');
        }
      });


    }


    $http({

        method: 'GET',
        url: $rootScope.Baseurl + 'operators?tenant_id=' + $rootScope.Tenantid
      })
      .then(function (response) {
        $scope.operatorList = response.data;

      })

    $http({
        method: 'GET',
        url: $rootScope.Baseurl + 'machines?tenant_id=' + $rootScope.Tenantid
      })
      .then(function (response) {
        $rootScope.machinenameList = response.data;


      })
    $http({

        method: 'GET',
        url: $rootScope.Baseurl + 'shifts?tenant_id=' + $rootScope.Tenantid
      })
      .then(function (response) {

        $scope.shiftdetailfordrop1 = response.data;
        //console.log(  $scope.shiftdetailfordrop);

        $http({


            method: 'GET',
            url: $rootScope.Baseurl + 'shifttransactions?shift_id=' + $scope.shiftdetailfordrop1.id

          })
          .then(function (response) {
            $scope.shiftList = response.data;

          })
      })

    $scope.statusColapse = 1;

    $scope.alocate = function (res) {
//alert(res);
      if ($scope.statusColapse == res) {
        $scope.IsVisible = $scope.IsVisible ? false : true;
        return;
      } else {
        $scope.IsVisible = true;
      }
      $scope.statusColapse = res;


      $scope.subid = res;
    }


  })
