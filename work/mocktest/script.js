(function () {
    var app = angular.module('app', [`ngMockE2E`])

    app.run(function ($httpBackend) { //this service give an opportunity to inject backend
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
    });

    app.controller("mockCtrl", function ($scope, $http) {

        $scope.functionGet = function () {
            $http({
                url: "http://localhost:3001/persons", // https://swapi.dev/api/people/1/
                method: "get"
            })
                .then(function (response) {
                        $scope.persons = response;
                    },
                    function (error) {

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
