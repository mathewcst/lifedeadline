var app = angular.module('lifedeadline', ['ngRoute', 'ngResource', 'ngMask']);

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

	$scope.update = function(){

		// GET USER DATA
		var birthDate = moment($scope.userBirth, "DD/MM/YYYY");
		var countryAv = moment().add($scope.countryAverage, 'years');

		// CALCULATE TIME LEFT
		var expect = moment($scope.userBirth, "DD/MM/YYYY");
		expect = expect.add($scope.countryAverage, "y");

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

		$scope.reload = true;

	};


}]);