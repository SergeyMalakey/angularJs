(function (){
    const app = angular.module("app",[])

    app.controller("myCtrl",function ($scope){
        $scope.value=""
        $scope.cars_list = [
            "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "Geely", "General Motors", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Renault", "Rolls Royce", "Suzuki", "Tata Motors", "Tesla", "Toyota", "Volkswagen", "Volvo"
        ];
    })
    app.directive("autoComplete",function(){
        return{
            restrict: 'AE',
            link:function ($scope, element, attr){
                $(element).autocomplete({
                    source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ],
                    delay: 100

                });
                /*$(element).autocomplete( "widget" );*/
            }
        }
    })


})()
