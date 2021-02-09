(function () {
    var app = angular.module('app')

    app.factory("Resfact", [
        "$resource", function ($resource) {
            return $resource("https://swapi.dev/api/people/:userNumber/", { // URL template, second arg - default parameters
                    userNumber: 2
                } // third arg - action. object to confirm our request.
                // ,{update:{method:"put",params:{userNumber:@id}, isArray:true }} - create own method
                //  Restfact.update(params,successCb,errorCb)
            )
        }
    ])

    app.controller("servicesCtrl", function ($scope, myConst, $http, Resfact) {
        $scope.const = myConst;

        // $resource block

        $scope.user = Resfact.get() // params like {userNumber:3} will change request. empty brackets - default request

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
        }
    )

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
