(function () {
    var app = angular.module('app', ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "homePage.html",
                controller: "homePageCtrl"
            })
            .when("/directives", {
                templateUrl: "directives.html",
                controller: "homePageCtrl"
            })
            .when("/about", {
                template: "<h1>about person</h1>"
            })
            .when("/scope", {
                templateUrl: "scope.html",
                controller: "scopeCtrl"
            })
            .otherwise({
                template: "<h1>error</h1>"
            })
    });

    app.controller("homePageCtrl", function ($scope, myConst) {
        console.log("homePageController");
        $scope.user = {
            name: "User1",
            email: "Email1",
            mes: "This message from scope",
            arr: [1, 2, 3, 4, 5, 6, 7],
        };
        $scope.const = myConst;
        $scope.clickFunc = function () {
            $scope.$apply(function () {
                console.log("click")
            })
        };
        $scope.inpValue = "write here";
        $scope.counter = 0;
        $scope.inpChangeFunc = function () {
            $scope.counter++;
        };
        $scope.model = "";
        $scope.modelValid = "";
        $scope.value = "some value";
        $scope.names = ['pizza', 'unicorns', 'robots'];
        $scope.my = {favorite: 'unicorns'};
        $scope.wordPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    });
    app.controller("scopeCtrl", function ($scope) {
        $scope.name= "Ivan"
        $scope.surname= "ivanov"
        $scope.id= "user id"
        $scope.age= "user age"

    })
    app.directive("controllersScope", function () {
        return {
            restrict: "AE",
            template: "<div>{{name}}</div>",
        }
    })
    app.directive("inheritanceScope", function () {
        return {
            scope: true,
            restrict: "AE",
            template: "<div><input type='text' ng-model='name'><div>internal scope from template: {{name}}</div></div>",
        }
    })
    app.directive("isolatedScope", function () {
        return {
            scope: {
                name: '='
            },
            restrict: "AE",
            template: "<div>{{name}}</div>"
        }
    })
    app.directive("myDirective", function () {
        return {
            controller: "homePageCtrl",
            /*scope: {},*/
            template: '<p>{{user.name}} my directive with attached controllers scope<p/>',
            restrict: 'AE',
            /*link: function(scope, element, attributes){
                console.log("dddd")
            }*/
        }
    })

    app.directive("secondDirective", function (myService) {
        return function (scope, element, attr) {
            let teg = angular.element("<span>")
            scope.m = "ddddddd"
            console.log(scope)
            teg.text(attr.mes)
            element.append(teg)

            console.log(myService.key)
        }
    })
    app.factory("myService", function () {
        return {
            key: "show attached service info in secondDirective"
        }
    })

    app.constant('myConst', "my first constant")
})()
