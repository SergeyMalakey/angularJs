(function () {
    const app = angular.module("app", ["ngMockE2E","ngResource"])

    app.factory("ResourceMock",[
        "$resource", function ($resource){
            return $resource("http://localhost:3001/forms")
        }
    ])

    app.controller("myCtrl", function ($scope,$http,ResourceMock) {

        $scope.httpFunc = $http

        $scope.value = "";
        $scope.tableObj = {
            totalPerDiem: 0
        };
        $scope.fcrForm = {}
        ResourceMock.query().$promise.then(function (response){
            $scope.fcrForm.employees = response[0].tablePart;
            $scope.fcrForm.comment = response[0].comment;
            $scope.fcrForm.prepared = response[0].prepared;
            $scope.fcrForm.formObj = response[0].formPart

            /*$('#datepicker').datepicker('setDate', new Date($scope.fcrForm.formObj.datepicker))*/
           /* $('#datepicker').datepicker();
            $("#datepicker").datepicker("setDate",$scope.fcrForm.formObj.datepicker);*/

           // $('#datepicker').datepicker('update', new Date());
            // $('#datepicker').date(new Date(1602908000000));
        });

        /*$scope.totalPerdiem = function (index) {
            $scope.tableObj.totalPerDiem = 0;
            $scope.employees.forEach(function (obj) {
                $scope.tableObj.totalPerDiem += obj.perDiem || 0
            });
            $scope.totalCostOneEmployee(index);
        };
        $scope.totalPrice = function () {
            $scope.tableObj.totalPrice = 0;
            $scope.employees.forEach(function (obj) {
                $scope.tableObj.totalPrice += obj.totalCost || 0
            });
        };
        $scope.totalCostOneEmployee = function (index) {
            $scope.employees[index].totalCost = ($scope.employees[index].normalTime.hrs * $scope.employees[index].normalTime.rate + $scope.employees[index].doubleTime.hrs * $scope.employees[index].doubleTime.rate + ($scope.employees[index].perDiem || 0) || 0);
            $scope.totalPrice();
        };
        $scope.totalAmountNormalTime = function () {
            $scope.tableObj.normalTimeHrs = 0;
            $scope.employees.forEach(function (obj) {
                $scope.tableObj.normalTimeHrs += obj.normalTime.hrs
            });
        };
        $scope.totalAmountDoubleTime = function () {
            $scope.tableObj.doubleTimeHrs = 0;
            $scope.employees.forEach(function (obj) {
                $scope.tableObj.doubleTimeHrs += obj.doubleTime.hrs
            });
        };
        $scope.perDiemInitialState = function () {
            $scope.employees.forEach(function (obj) {
                obj.perDiem = 0
            });
        };
        $scope.initialCompute = function () {
            $scope.employees.forEach((obg, index) => {
                $scope.totalCostOneEmployee(index)
            });
            $scope.totalAmountNormalTime();
            $scope.totalAmountDoubleTime();
            $scope.totalPrice();
            $scope.perDiemInitialState();
        };
        $scope.initialCompute();  */          //  invocation initial function

        $scope.test = function () {                           // testFunc
            console.log($scope.fcrForm.employees);
            console.log($scope.fcrForm.formObj.datepicker);

        };
        /*$scope.delEmployee = function (index) {
            $scope.employees.splice(index, 1);
            $scope.totalAmountNormalTime();
            $scope.totalAmountDoubleTime();
            $scope.totalPrice();
        };
        $scope.addEmployee = function () {
            $scope.employees.push({
                name: "",
                classification: "",
                normalTime: {
                    hrs: 0,
                    rate: 0
                },
                doubleTime: {
                    hrs: 0,
                    rate: 0
                }
            });
            $scope.perDiemInitialState();
            $scope.totalCostOneEmployee($scope.employees.length - 1);
        }*/
    });

    app.directive("datePicker",function (){
        return{
            restrict: "AE",
            require: 'ngModel',
            controller: "myCtrl",
            link: function (scope, element, attrs, ngModelCtrl){
                $(element).datepicker({
                    format:"DD, MM d, yyyy"
                })
                /*.on("changeDate",function (ev){
                        debugger;
                        /!*scope.$apply(function () {
                            ngModelCtrl.$setViewValue(ev.format(format));
                        });*!/
                    })*/

                ngModelCtrl.$parsers.unshift(function (viewValue){

                    if( viewValue!==""){
                        debugger;
                        return +new Date(viewValue)
                    }
                })
                ngModelCtrl.$formatters.unshift(function (modelValue){
                    if(modelValue){
                        debugger;
                        element.datepicker('setDate', new Date(Number.parseInt(modelValue)))
                    }

                })
            }
        }
    })

    app.directive("autoComplete",["$http", function ($scope,$http) {
        return {
            controller: "myCtrl",
            restrict: 'AE',
            link: function ($scope, element) {
                $(element).autocomplete({
                    source:  async function (request,response){
                        let result =  await $scope.httpFunc(
                            {
                                url: 'http://localhost:3001/customers',
                                method: "POST",
                                data: request.term,
                            }
                        )
                        .then(function (res){
                            response (res.data)
                        })
                    },
                    delay: 100,
                    autofocus: true,
                    minLength: 0,
                });
                $("#showList").click(function () {
                    $(element).autocomplete("search", "");
                });
            }
        }
    }]);

    app.run(function ($httpBackend){
        let customers = ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby"]
        let formPart = {
            customerValue: "testClient1",
            jobNameValue: "job1",
            projectValue: "project1",
            datepicker: 1602908000000,
            orderValue:"1",
            sapValue: "sap123"
        }
        let tablePart = [{
                name: "Employee1",
                classification: "cli1",
                normalTime: {
                    hrs: 10,
                    rate: 1
                },
                doubleTime: {
                    hrs: 5,
                    rate: 1
                }
            },
            {
                name: "Employee2",
                classification: "cli1",
                normalTime: {
                    hrs: 15,
                    rate: 1
                },
                doubleTime: {
                    hrs: 8,
                    rate: 1
                }
            },
            {
                name: "Employee3",
                classification: "cli2",
                normalTime: {
                    hrs: 5,
                    rate: 2
                },
                doubleTime: {
                    hrs: 12,
                    rate: 2
                }
            }]
        let fcrForm = [
            {
                formPart: formPart,
                tablePart: tablePart,
                comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                prepared: "John Doe",
            },
            ]
        $httpBackend.whenGET('http://localhost:3001/forms').respond(200, fcrForm);
        $httpBackend.whenPOST('http://localhost:3001/customers').respond(function (method,url,data){
            let filtredValue=[]
            if (data==="c"){
                filtredValue = ["all","values","c","request"]
                return [200, filtredValue, {}]
            }
            if (data==="d"){
                filtredValue = ["all","values","d","request"]
                return [200, filtredValue, {}]
            }
            return [200, customers, {}]
        })
        $httpBackend.whenGET(/\.html$/).passThrough();
    })
})()


 // customers.indexOf(data) != -1
