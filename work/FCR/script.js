(function (){
    const app = angular.module("app",[])

    app.controller("myCtrl",function ($scope){
        $scope.value="";
        $scope.formObj = {}
        $scope.tableObj = {
        }
        $scope.totalPrice =
        $scope.employees = [
            {
                name:"Employee1",
                classification:"cli1",
                normalTime:{
                    hrs:10,
                    rate:1
                },
                doubleTime:{
                    hrs:5,
                    rate:1
                }
            },
            {
                name:"Employee2",
                classification:"cli1",
                normalTime:{
                    hrs:15,
                    rate:1
                },
                doubleTime:{
                    hrs:8,
                    rate:1
                }
            },
            {
                name:"Employee3",
                classification:"cli2",
                normalTime:{
                    hrs:5,
                    rate:2
                },
                doubleTime:{
                    hrs:12,
                    rate:2
                }
            }
        ];
        $scope.totalPerdiem = function (index){
            $scope.tableObj.totalPerDiem = 0
            $scope.employees.forEach(function (obj){
                $scope.tableObj.totalPerDiem += obj.perDiem || 0
            })
            $scope.totalCostOneEmployee(index)
        }
        $scope.totalPrice = function(){
            $scope.tableObj.totalPrice = 0
            $scope.employees.forEach(function (obj){
                $scope.tableObj.totalPrice += obj.totalCost || 0
            })
        }
        $scope.totalCostOneEmployee = function(index){
            $scope.employees[index].totalCost = ($scope.employees[index].normalTime.hrs * $scope.employees[index].normalTime.rate + $scope.employees[index].doubleTime.hrs * $scope.employees[index].doubleTime.rate + ($scope.employees[index].perDiem || 0) || 0)
            $scope.totalPrice()
        }
        $scope.totalAmountNormalTime = function (){
            $scope.tableObj.normalTimeHrs = 0
            $scope.employees.forEach(function (obj){
                $scope.tableObj.normalTimeHrs += obj.normalTime.hrs
            })
        }
        $scope.totalAmountDoubleTime = function (){
            $scope.tableObj.doubleTimeHrs = 0
            $scope.employees.forEach(function (obj){
                $scope.tableObj.doubleTimeHrs += obj.doubleTime.hrs
            })
        }

        $scope.initialCompute = function (){
            $scope.employees.forEach((obg,index)=>{
                $scope.totalCostOneEmployee(index)
            })
            $scope.totalAmountNormalTime()
            $scope.totalAmountDoubleTime()

            $scope.totalPrice()
        }
        $scope.initialCompute()






        $scope.test = function (){
            console.log($scope.employees);
        }
        /*$scope.totalPrice = function (){
            $scope.employee.forEach(function (obj){
                $scope.tableObj.totalPerDiem += obj.perDiem || 0
            })
        }*/

    })
    app.directive("autoComplete",function(){
        return{
            restrict: 'AE',
            link:function ($scope, element, attr){
                $(element).autocomplete({
                    source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ],
                    delay: 100,
                    autofocus:true,
                    minLength: 0,
                });
                $("#showList").click(function() {
                    $(element).autocomplete("search", "");
                });
                /*$('#datepicker').datepicker(
                    {format: "yyyy-mm-dd"}
                );*/
            }
        }
    })
    app.directive("tableLine",function (){
        return{
            restrict: "AE",
            template: ""
        }
    })


})()
