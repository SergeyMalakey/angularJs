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
            .when("/validation", {
                templateUrl: "validation.html",
                controller: "validationCtrl"
            })
            .when("/about", {
                template: "<h1>about person</h1>"
            })
            .when("/scope", {
                templateUrl: "scope.html",
                controller: "scopeCtrl"
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
            /*arr:{1:"ss",2:"aa",3:"ssdd"}*/
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
                                                        //scope start
    app.controller("scopeCtrl", function ($scope) {
        $scope.name = "Ivan";
        $scope.surname = "ivanov";
        $scope.id = "123456789";
        $scope.age = "123";
        $scope.func = function () {
            console.log("transferred function")
        };
    })
    app.directive("controllersScope", function () {
        return {
            restrict: "AE",
            template: "<div>{{name}}</div>",
        }
    })
    app.directive("inheritanceScope", function () {
        return {
            scope: true,
            restrict: "AE",
            template: "<div><input type='text' ng-model='name'><div>internal scope from template: {{name}}</div></div>",
        }
    })
    app.directive("isolatedScope", function () {
        return {
            link: function (scope, el, attr) {
                /*scope.func()*/           //сработвет при переходе не страницу
            },
            scope: {
                name: "=",
                surname: "@",
                func: "&"
            },
            restrict: "AE",
            template: '  <div>\n' +
                '        <div>{{name}} "=" two side</div>\n' +
                '        <input type="text" ng-model="name">\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <div>{{surname}} "@" one side</div>\n' +
                '        <input type="text" ng-model="surname">\n' +
                '    </div><div>"$" method</div><button ng-click="func()">func from controller</button> '
        }
    })
                                                                        //custom directives
    app.directive("myDirective", function () {
        return {
            template: '<p>{{user.name}} my directive with attached controllers scope<p/>',
            restrict: 'AE',
        }
    })
    app.directive("secondDirective", ["myService","servWithService","myVal","myConst",function (myService,servWithService,myVal,myConst) {
        return function (scope, element, attr) {
            let teg = angular.element("<span>")
            teg.text(attr.mes);
            element.append(teg);
            console.log(myService.key);
            console.log(servWithService.myText);
            console.log(myConst);
            console.log(myVal);
        }
    }])
                                                                        //services
    app.factory("ReportFactory", function () {
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
    app.constant('myConst', "text from rewrote myConst") // не сработал
    app.value("myVal","value from myVal")
    app.value('myVal', "text from rewrote myVal") // сработал

    app.controller("validationCtrl",function ($scope){
        $scope.modelValid ="";
        $scope.mailValid="cat@google.com";
        $scope.wordPattern = "^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$";
        $scope.numberPattern = "^[0-9]{4}\.[0-9]{2}$"
        $scope.numberVal= "9999.99";
    })
})()
