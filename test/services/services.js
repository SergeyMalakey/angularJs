(function () {
    var app = angular.module('app')
    app.controller("servicesCtrl", function ($scope, myConst, $http, $resource) {
        $scope.const = myConst;
        // $http block
        $scope.httpObj = {
            configRequest: {
                url: "https://swapi.dev/api/people/1/",
                method: "get"
            },
        }
        $http($scope.httpObj.configRequest)
            .then(function (response) {
                    $scope.httpObj.res = response.data;
                    $scope.httpObj.status = response.status;
                },
                function (error) {
                    $scope.httpObj.err = error;
                    $scope.httpObj.status = error.status;
                }
            );

        // $resource block
        $scope.resourseObj = {
            url: "https://swapi.dev/api/people/:userNumber/",
            userNumber: 2,
        }

        /* var Resource = $resource("https://swapi.dev/api/people/:userNumber/",{userNumber:"@userNumber"},{ 'get':    {method:'GET'}});
         /!*$scope.people = Resource.query({userNumber:$scope.resourseObj.id},function (response){
             $scope.resourseObj.data = response
         })*!/
         $scope.people = Resource.get({userNumber:2})*/

        /*var User = $resource("https://swapi.dev/api/people/:userNumber", {userNumber: 2});
        User.get({userNumber: 2}).$q.then(function (user) {
            /!*user.$save()*!/
            console.log("resource: " + user)
            debugger;
        })*/

    })

    app.directive("secondDirective", ["myService", "servWithService", "myVal", "myConst", function (myService, servWithService, myVal, myConst) {
        return function ($scope, element, attr) {
            let teg = angular.element("<span>")
            teg.text(attr.mes);
            element.append(teg);
            console.log("Key from .factory: " + myService.key);
            console.log("key from .service: " + servWithService.myText);
            console.log("constant: " + myConst);
            console.log("value: " + myVal);
        }
    }])
    app.factory("myService", function () {
        return {
            key: "show attached service 'myService' (app.factory) info in secondDirective"
        }
    })
    app.service("servWithService", function () {
        this.myText = "show attached service 'servWithService' (app.service) info in secondDirective"
        // there  have to be methods for injecting
        this.fetchUser = function () {
        };
        this.updateUser = function () {
        };
    })
    app.constant('myConst', "text from myConst")
    app.constant('myConst', "text from rewrote myConst") // don't rewrite
    app.value("myVal", "value from myVal")
    app.value('myVal', "text from rewrote myVal") // rewrote
})()
