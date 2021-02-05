(function (){
    var app = angular.module('app');
    app.controller("validationCtrl",function ($scope){
        /* $scope.modelValid ="";
         $scope.tdp=""
         $scope.mailValid="";*/
        /* $scope.numberVal= "9999.99";*/
        $scope.wordPattern = "^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$";
        $scope.numberPattern = "^[0-9]{4}\.[0-9]{2}$";
        $scope.emtyObj = {};

        $scope.reset = function() {
            console.log($scope.inputsInfo);
            $scope.inputsInfo = angular.copy($scope.emtyObj);
            console.log($scope.inputsInfo);
            console.log($scope.formValid)
        };
        /*$scope.reset();*/
    })
    app.directive('lengthPass', function () {
        var isValid = function(s) {
            return s && s.length < 10 && s.length > 3;
        };
        return {
            require:'ngModel',
            link:function (scope, elm, attrs, ngModelCtrl) {
                //view -> model
                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('lengthPass', isValid(viewValue));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('lengthPass', isValid(modelValue));
                    return modelValue;
                });
                ngModelCtrl.$validators.customValidatorName = function (modelValue, viewValue){
                    if(viewValue) {return viewValue.indexOf("cat")>=0};
                }
            }
        };
    });

})()
