(function () {
    // function to style the selected link
    window.onpopstate = function (event) {
        let arr = document.querySelectorAll("a")
        Array.from(arr).map((item) => {
            if (location.href === item.href) {
                item.setAttribute("class", "current-url")
            } else {
                item.removeAttribute("class", "current-url")
            }
        })
    }
       // ,'ngMockE2E'
    var app = angular.module('app', ['ngRoute', 'ngResource']);
   /* app.run(function ($httpBackend) { //this service give an opportunity to inject backend
        var books = [
            {
                name: 'AngularJS'
            },
            {
                name: 'EmberJS'
            }
        ];
        console.log("RUN")
        console.log($httpBackend)

        $httpBackend.whenGET('http://localhost:3001/books').respond(200, books);
        // when will be request on it url do not send it. simple give an answer
    });*/

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "homePage.html",
                controller: "homePageCtrl"
            })
        .when("/directives", {
            templateUrl: "directives/directives.html",
            controller: "directivesCtrl"
        })
        .when("/validation", {
            templateUrl: "validations/validation.html",
            controller: "validationCtrl"
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
    })

    /*    app('app')
            .controller('MainCtrl', function ($scope, $httpBackend, $http) {
                $httpBackend.whenGET('test').respond(200, {message: "Hello world"});
                $http.get('test').then(function(response){
                    $scope.message = response.message //Hello world
                })
            });*/


    app.controller("homePageCtrl", function ($scope, $http) {
      /*  $http({url:'http://localhost:3001/books',  method: "get"})
            .then(function (response) {
                $scope.books = response;
                debugger;
            },function (err){
                debugger;
            })*/
        $scope.user = {
            name: "User1",
            email: "Email1",
            mes: "This message from scope",
        };
        /*$scope.inpValue = "write here";
        $scope.model = "";
        $scope.modelValid = "";
        $scope.value = "some value";
        $scope.validation = "";*/
    });
})()
