(function (){
    let app = angular.module('app');
    app.controller("homeCtrl", function ($scope, $http) {
        $scope.functionGet = function () {
            $http({
                url: "http://localhost:3001/persons",
             /* url: "https://swapi.dev/api/people/1/",*/
                method: "get"
            })
                .then(function (response) {
                        debugger;
                        $scope.persons = response;
                    },
                    function (error) {
                        $scope.persons = error;
                    }
                );
        }
    })

})()
