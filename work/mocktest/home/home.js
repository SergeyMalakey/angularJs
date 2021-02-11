(function (){
    let app = angular.module('app');

    app.controller("homeCtrl", function ($scope, $http) {
        $scope.functionGet = function () {
            $scope.httpObj = {}
            $http({
                url: "http://localhost:3001/persons", //       https://swapi.dev/api/people/1/
                method: "get"
            })
                .then(function (response) {
                        $scope.persons = response;
                    },
                    function (error) {
                        $scope.persons = error;
                    }
                );
        }
        $scope.functionPost = function (newName) {
            let name = {
                name: newName
            };
            $http.post('http://localhost:3001/persons', name)
                .then(function (result) {
                    console.log(result)
                    $scope.statusPostReq = result.status
                })
            $scope.functionGet()
            $scope.newName = ""
        }
    })

})()
