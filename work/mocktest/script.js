(function () {
    var app = angular.module('app', ["ngRoute"])
    app.config(function ($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "home/home.html",
                controller: "homeCtrl"

            })
            .when("/page", {
                templateUrl: "page/page.html",
                /*controller: "pageCtrl"*/
            })
    })

    /*app.run(function ($httpBackend) { //this service give an opportunity to inject backend
        var persons = [
            {
                person: 'luke'
            },
            {
                person: 'r2d2'
            }
        ];
        console.log("RUN")
        console.log($httpBackend)
        $httpBackend.whenGET('http://localhost:3001/persons').respond(200, persons);
        // when will be request on it url do not send it. simple give an answer
        $httpBackend.whenPOST('http://localhost:3001/persons').respond(function (method, url, data) {
            persons.push(JSON.parse(data))
            console.log('method', method);
            console.log('url', url);
            console.log('data', data);
            return [201, persons];
        })
    });*/

})()
