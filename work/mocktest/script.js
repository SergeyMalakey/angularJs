(function () {
    let app = angular.module('app', ["ngRoute"]);
    app.config(function ($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "home/home.html",
                controller: "homeCtrl"
            })
            .when("/page", {
                templateUrl: "page/page.html"
            })
    })

    var myAppDev = angular.module('myAppE2E', ['app', 'ngMockE2E']);
    myAppDev.run(function ($httpBackend) { //this service give an opportunity to inject backend
        var persons = [
            { person: 'luke'},
            { person: 'r2d2'}
        ];
        console.log("RUN",$httpBackend);
        $httpBackend.whenGET('http://localhost:3001/persons').respond(200, persons);
        $httpBackend.whenGET(/\.html$/).passThrough();
       // $httpBackend.whenGET("https://swapi.dev/api/people/1/").passThrough();
        // when will be request on it url do not send it. simple give an answer
    });
    angular.bootstrap(document.body, ['myAppE2E']);



})()
