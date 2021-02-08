(function () {
    var app = angular.module('app')
    app.controller("directivesCtrl", function ($scope) {
        $scope.user = {
            name: "User1",
            arr: [1, 2, 3, 4, 5, 6, 7],
        };
        $scope.counter = 0;
        $scope.inpChangeFunc = function () {
            $scope.counter++;
        };
        $scope.clickFunc = function () {
            $scope.$apply(function () {
                console.log("function to make a mistake with apply in ng-click")
            })
        };
        $scope.names = ['pizza', 'unicorns', 'robots']; // for ng-value + ng-repeat. In ng-model have to sigh some value to chose only one field
        $scope.my = {favorite: 'unicorns'};
        $scope.colors = [  //ng-option iterate arr with objs
            {name: 'black', shade: 'dark'},
            {name: 'white', shade: 'light', notAnOption: true},
            {name: 'red', shade: 'dark'},
            {name: 'blue', shade: 'dark', notAnOption: true},
            {name: 'yellow', shade: 'light', notAnOption: false}
        ];
        $scope.obj = {    // ng-model iterate obj
            'key1': "value1",
            'key2': "value2",
            'key3': "value3"
        };
    })
    //custom directives
    app.directive("myDirective", function () {
        return {
            template: '<p>{{user.name}} my directive with attached controllers scope<p/>',
            restrict: 'AE',
        }
    });
})()
