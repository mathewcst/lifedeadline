var app = angular.module('lifedeadline', ['ngRoute', 'ngResource', 'ngMask', 'chart.js']);

app .config(['ChartJsProvider', function (ChartJsProvider) {
	ChartJsProvider.setOptions({
		colours: ['#3F51B5', '#f44336']
	});
}])

app.controller('MainController', ['$scope', '$http', function($scope, $http){

	$scope.whoJSON = [];
	$scope.regions = [];
	$scope.reload = false;

	// GITHUB VERSION
	$http.get('data/countryLife.json').success(function(data){
	// $http.get('../data/countryLife.json').success(function(data){

		angular.forEach(data.fact, function(value, key){
			// console.log(value);
			if(value.dim.SEX == "Both sexes" && value.dim.GHO == "Life expectancy at birth (years)"){
				var dimension = value.dim;

				$scope.whoJSON.push({
					region: dimension.REGION,
					country: dimension.COUNTRY,
					value: value.Value
				})

				if($scope.regions.indexOf(dimension.REGION) == -1){
					$scope.regions.push(dimension.REGION);
				}
			}
		});
	});

	var generateSquares = function(number){
		var array = [];
		for(var i = 0; i < number; i++){
			array.push(i);
		}
		return array;
	}

	$scope.displayCharts = 'false';
	$scope.showCharts = function () {
      $scope.displayCharts = $scope.displayCharts === 'false' ?
        'true' : 'false';
    };

	$scope.update = function(){

		// GET USER DATA
		var birthDate = moment($scope.userBirth, "DD/MM/YYYY");
		var countryAv = moment().add($scope.countryAverage.value, 'years');

		// CALCULATE TIME LEFT
		var expect = moment($scope.userBirth, "DD/MM/YYYY");
		expect = expect.add($scope.countryAverage.value, "y");

		// LIVED DATA
		$scope.weeksLived = moment().diff(birthDate, 'w');
		$scope.yearsLived = moment().diff(birthDate, 'y');
		$scope.squaresLived = generateSquares($scope.weeksLived);

		// LEFT DATA
		$scope.weeksLeft = expect.diff(moment(), 'w');
		$scope.yearsLeft = expect.diff(moment(), 'y');
		$scope.squaresLeft = generateSquares($scope.weeksLeft);

		// TOTAL DATA
		$scope.totalSquares = generateSquares(expect.diff(birthDate, 'w'));

		// CHART DATA
		$scope.chartResults = [$scope.weeksLeft, $scope.weeksLived];
		$scope.chartLabels = ["Weeks Left", "Weeks Lived"];

		$scope.chartResultsBars = [[$scope.weeksLeft], [$scope.weeksLived]];
		$scope.chartLabelsBars = ["Weeks in your life"];
		$scope.chartSeries = ["Weeks Left", "Weeks Lived"];

		$scope.reload = true;

	};


}]);