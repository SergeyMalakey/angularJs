(function () {
    var app = angular.module('app')

    app.factory("Resfact", [
        "$resource", function ($resource) {
            return $resource("https://swapi.dev/api/:essence/:userNumber/",  // URL template, second arg - default parameters
                {userNumber: 2, essence: "people"},
                // third arg - action. object to confirm our request.
                // ,{update:{method:"put",params:{userNumber:@id}, isArray:true }} - create own method
                //  Restfact.update(params,successCb,errorCb)
                {myMeth: {method: "get", params: {userNumber: "@id", essence: "@essence"}}, isArray: false}
            )
        }
    ]);
    app.factory("ResourceFactoryMock", [
        "$resource", function ($resource) {
            return $resource("http://localhost:3001/books",  // URL template, second arg - default parameters
                {},
                // third arg - action. object to confirm our request.
                // ,{update:{method:"put",params:{userNumber:@id}, isArray:true }} - create own method
                //  Restfact.update(params,successCb,errorCb)
                {
                    delMeth: {method:"DELETE"}
                }
            )
        }
    ]);

    app.controller("servicesCtrl", function ($scope, myConst, $http, Resfact,ResourceFactoryMock) {
        $scope.const = myConst;
        $scope.id = 4;
        $scope.essence = "planets";
        $scope.newName = "";

        $scope.changeEssFunc = function (ess) {
            $scope.essence = ess
            $scope.user = Resfact.myMeth({
                userNumber: $scope.id,
                essence: $scope.essence
            }, $scope.successFunc, $scope.errFunc);
        }

        // $resource block
        $scope.successFunc = function (res) {
            /*console.log("resource request success", res)*/
        };
        $scope.errFunc = function (err) {
            /*console.log("there is a problem")*/
        };
        //my method
        $scope.user = Resfact.myMeth({
            userNumber: $scope.id,
            essence: $scope.essence
        }, $scope.successFunc, $scope.errFunc);
        //$scope.user = Resfact.get() ;// params like {userNumber:3} will change request. empty brackets - default request

        $scope.deleteFunc = function(){
            ResourceFactoryMock.delMeth()
            $scope.getFunc()
        }

        // $http block
        $scope.postFunc=function(){
            $http({
                url: "http://localhost:3001/books",
                method: "post",
                data: $scope.newName
            })
            $scope.getFunc()
        }
        $scope.getFunc=function(){
            $http({
                url: "http://localhost:3001/books",
                method: "get"
            })
                .then(function (response) {
                        $scope.res = response.data;
                        $scope.status = response.status;
                    },
                    function (error) {
                        $scope.status = error.status;
                    }
                );
            $scope.newName = ""
        }
        $scope.getFunc()
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
    })
    app.constant('myConst', "text from myConst");
    app.constant('myConst', "text from rewrote myConst");// don't rewrite
    app.value("myVal", "value from myVal");
    app.value('myVal', "text from rewrote myVal"); // rewrote
})()
