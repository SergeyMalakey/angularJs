(function () {
    var app = angular.module('app');
    app.controller("validationCtrl", function ($scope) {
        $scope.wordPattern = "^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$";
        $scope.numberPattern = "^[0-9]{4}\.[0-9]{2}$";
        $scope.emtyObj = {};
        $scope.reset = function () {
            $scope.inputsInfo = angular.copy($scope.emtyObj);   // copy empty obj to clean the validation form inputs
        };
        // emit
        $scope.handleClick = function (mes) {
            $scope.handleClick = function (msg) {
                $scope.$emit('transfer', { message: msg });
            };
        }
    })
    app.directive('lengthPass', function () {
        /*var isValid = function (s) {
            return s && s.length < 10 && s.length > 3;
        };*/
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                // figure aut when and how use $setValidity. now for my task use $validators

                //view -> model
                /* ngModelCtrl.$parsers.unshift(function (viewValue) {
                      ngModelCtrl.$setValidity('lengthPass', isValid(viewValue));
                      return viewValue;
                  });
                  ngModelCtrl.$formatters.unshift(function (modelValue) {
                      // ngModelCtrl.$setValidity('lengthPass', isValid(modelValue));
                      return modelValue;
                  });*/
                ngModelCtrl.$validators.customValidatorName = function (modelValue, viewValue) {
                    if (viewValue) {
                        return viewValue && viewValue.indexOf("cat") >= 0 && viewValue.length < 10 && viewValue.length > 3
                    }
                }
            }
        };
    });

})()
