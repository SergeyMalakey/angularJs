(function () {
    const app = angular.module('app', ['ngRoute', 'ngResource']);
    const testModule = angular.module('testModule', ['app', 'ngMockE2E']);

    testModule.run(function ($httpBackend) { //this service give an opportunity to inject backend
        let books = [
            {name: 'AngularJS'},
            {name: 'EmberJS'},
            {name: 'AngularJS1'},
            {name: 'EmberJS1'},
            {name: 'AngularJS2'},
            {name: 'EmberJS2'},
        ];
        console.log("RUN")
        console.log($httpBackend)
        $httpBackend.whenGET('http://localhost:3001/books').respond(200, books);
        // when will do a request on it url do not send it. simple give an answer
        $httpBackend.whenGET(/\.html$/).passThrough();  //!!!! Important to hide url requests
        $httpBackend.whenGET(/swapi.dev/).passThrough();
        $httpBackend.whenPOST('http://localhost:3001/books').respond(function (method,url,data){
            books.push({name:data})
        });
        $httpBackend.whenDELETE('http://localhost:3001/books').respond(function (method,url,data){
            books.pop()
        });

    });
    angular.bootstrap(document.body, ['testModule']);
    testModule.config(function ($routeProvider) {
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
            .when("/event", {
                templateUrl: "event/event.html",
                controller: "eventCtrl"
            })
            .otherwise({
                template: "<h1>error</h1>"
            })
    })

    app.controller("homePageCtrl", function ($scope, $http) {
        $scope.user = {
            name: "User1",
            email: "Email1",
            mes: "This message from scope",
        };
    });

    // function to style the selected link
    window.onpopstate = function (event) {
        let arr = document.querySelectorAll("a")
        Array.from(arr).map((item) => {
            if (location.href === item.href) {
                item.setAttribute("class", "current-url")
            } else {
                item.removeAttribute("class")
            }
        })
    }
})()
