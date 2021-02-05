(function (){
    var app = angular.module('app')
    app.controller("servicesCtrl",function ($scope,myConst){
        $scope.const = myConst;
    })
    app.directive("secondDirective", ["myService","servWithService","myVal","myConst",function (myService,servWithService,myVal,myConst) {
        return function (scope, element, attr) {
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
    app.service("servWithService",function (){
        this.myText="show attached service 'servWithService' (app.service) info in secondDirective"
        this.fetchUser = function () {
        };
        this.updateUser = function () {
        };
    })
    app.constant('myConst', "text from myConst")
    app.constant('myConst', "text from rewrote myConst") // don't rewrite
    app.value("myVal","value from myVal")
    app.value('myVal', "text from rewrote myVal") // rewrote
})()
