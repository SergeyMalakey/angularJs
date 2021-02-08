(function () {
    var app = angular.module('app')
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
    });
    app.directive("inheritanceScope", function () {
        return {
            scope: true,
            restrict: "AE",
            template: "<div><input type='text' ng-model='name'><div>internal scope from template: {{name}}</div></div>",
        }
    });
    app.directive("isolatedScope", function () {
        return {
            link: function (scope, el, attr) {
                /*scope.func()*/           //this func will work when switching to the page
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
    });
})()

