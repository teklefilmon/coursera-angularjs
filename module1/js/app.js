(function () {
  'user strict'

  angular
    .module('LunchCheck',[])
    .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.message = "";

    $scope.checkLunch = function () {
      if($scope.dishes == ""){
        $scope.message = "Please enter data first";
        return;
      }
      var dishes = $scope.dishes.split(",");
      if(dishes.length < 4){
        $scope.message = "Enjoy!";
        return;
      }else{
        $scope.message = "Too much!";
        return;
      }
    };
  }

})();
