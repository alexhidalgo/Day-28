angular.module('app.controllers', [])
.controller('HttpCtrl', function($scope, $http, $window) {

	$scope.activeWindow = false;

	// setInterval(function() {

	// 	if(	window.innerWidth > 1000 ) {
	// 		console.log(window.innerWidth);
	// 		$scope.activeWindow = true;
	// 	}
	// }, 1000);

	// $scope.$watch(function(){
 //       return $window.innerWidth;
 //    }, function(value) {
 //    	if(value > 1000) {
 //    		$scope.activeWindow = true;
 //    		console.log(window.onresize);
 //    	} else if (value <= 1000) {
 //    		$scope.activeWindow = false;
 //    	}
 //   });

	// window.onresize = function(){
 //        $scope.$apply();

 //    };

 	window.onresize = resize;

 	function resize() {

 		if ( window.innerWidth > 1000 ) {
 			$scope.activeWindow = true;
 			console.log($scope.activeWindow);
 		} else {
 			$scope.activeWindow = false;
 		}

	}


	$scope.plusClicked = false;

	$scope.showInputs = function() {
		$scope.plusClicked = !$scope.plusClicked ;
	};

	$scope.caption = '';
	$scope.image = '';

	$http.get('http://tiny-pizza-server.herokuapp.com/collections/alex-http')
	.success(function(response){

		$scope.messages = [];
		for( var i = 0; i < response.length; i++ ) {
			if(response[i].caption && response[i].image) {
				$scope.messages.push(response[i]);
			}
		}
	})
	.error(function(err){
		console.log(err);
	});
	$scope.sendData = function(caption, image) {
		var validHttp = false;
		var validCaption = false;

			if(image.substring(0, 7) === 'http://' || image.substring(0, 8) === 'https://') {
				validHttp = true;
				console.log('check http is valid');
			}

			if(caption !== '') {
				validCaption = true;
				console.log('check caption is valid');
			}

			if(validCaption === true && validHttp === true) {
				$http.post('http://tiny-pizza-server.herokuapp.com/collections/alex-http', { caption: caption, image: image });
				console.log('inputs valid and posted');
				// $scope.caption = '';
				// $scope.image = '';
			}
	};
});
