(function (){
    const app = angular.module("app",[])

    app.controller("myCtrl",function ($scope){
        $scope.value="";
        $scope.formObj = {}
        $scope.tableObj = {
        }
        $scope.totalPrice =
        $scope.imployees = [
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
            $scope.imployees.forEach(function (obj){
                $scope.tableObj.totalPerDiem += obj.perDiem || 0
            })
            $scope.totalCostOneEmployee(index)
        }
        $scope.totalPrice = function(){
            $scope.tableObj.totalPrice = 0
            $scope.imployees.forEach(function (obj){
                $scope.tableObj.totalPrice += obj.totalCost || 0
            })
        }
        $scope.totalCostOneEmployee = function(index){
            $scope.imployees[index].totalCost = ($scope.imployees[index].normalTime.hrs * $scope.imployees[index].normalTime.rate + $scope.imployees[index].doubleTime.hrs * $scope.imployees[index].doubleTime.rate + ($scope.imployees[index].perDiem || 0) || 0)
            $scope.totalPrice()
        }
        $scope.initialCompute = function (){
            $scope.imployees.forEach((obg,index)=>{
                $scope.totalCostOneEmployee(index)
            })
            $scope.totalPrice()
        }
        $scope.initialCompute()

       /* $scope.test = function (){
            "dd".log
        }*/
        /*$scope.totalPrice = function (){
            $scope.imployees.forEach(function (obj){
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
