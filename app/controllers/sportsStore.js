angular.module("sportsStore")

.constant("dataUrl", "http://localhost:2403/products")
.constant("orderUrl", "http://localhost:2403/orders")

.controller("sportsStoreCtrl", function ($scope, $http, $location,dataUrl, orderUrl, cart) {

    $scope.data = {}; 

    $scope.data = {products : 
      [{"category":"Brand Name Sneakers","name":"Nike","description":"the really awesome","price":"1200"},

       {"category":"Brand Name Sneakers","name":"Addidas","description":"the other really awesome","price":"1000"}
      ]
    }; 

    $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });

$scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)

              .success(function (data) {
                  $scope.data.orderId = data.id;
                  cart.getProducts().length = 0;
               })
              .error(function (error) {
                  $scope.data.orderError = error;
               }).finally(function () {
                    $location.path("/complete");
               });

}

});