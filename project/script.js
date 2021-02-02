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
        $scope.inpValue ="write here";
        $scope.counter = 0;
        $scope.inpChangeFunc = function(){
            $scope.counter++;
        };
    });
    app.directive("myDirective", function () {
        return {
            controller: "homePageCtrl",
            scope: {},
            template: '<p>{{user.name}} my directive with attached controllers scope<p/>',
            restrict: 'AE',
            /*link: function(scope, element, attributes){
                console.log("dddd")
            }*/
        }
    })

    app.directive("secondDirective", function () {
        return function (scope, element, attr) {
            let teg = angular.element("<span>")
            scope.m = "ddddddd"
            console.log(scope)
            teg.text(attr.mes)
            element.append(teg)
        }
    })

    app.constant('myConst', "my first constant")
})()
