(function () {
    var app = angular.module('app', ['ngRoute']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "homePage.html",
                controller: "homePageCtrl"
            })
            .when("/directives", {
                templateUrl: "directives/directives.html",
                controller: "homePageCtrl"
            })
            .when("/validation", {
                templateUrl: "validations/validation.html",
                controller: "validationCtrl"
            })
            .when("/about", {
                template: "<h1>about person</h1>"
            })
            .when("/scope", {
                templateUrl: "scope/scope.html",
                controller: "scopeCtrl"
            })
            .when("/services", {
                templateUrl: "services/services.html",
                controller: "servicesCtrl"
            })
            .otherwise({
                template: "<h1>error</h1>"
            })
    });
    app.controller("homePageCtrl", function ($scope, myConst) {
        /*console.log("homePageController");*/
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
        $scope.colors = [
            {name:'black', shade:'dark'},
            {name:'white', shade:'light', notAnOption: true},
            {name:'red', shade:'dark'},
            {name:'blue', shade:'dark', notAnOption: true},
            {name:'yellow', shade:'light', notAnOption: false}
        ];
        $scope.validation = "";
    });

                                                                        //custom directives
    app.directive("myDirective", function () {
        return {
            template: '<p>{{user.name}} my directive with attached controllers scope<p/>',
            restrict: 'AE',
        }
    })








})()
