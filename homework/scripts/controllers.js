angular.module('app.controllers', [])
.controller('HttpCtrl', function($scope, $http) {

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

			if($scope.image.substring(0, 7) === 'http://' || 'https://') {
				validHttp = true;
				console.log('check http is valid');
			}

			if($scope.caption !== '') {
				validCaption = true;
				console.log('check caption is valid');
				console.log(validCaption);
			}

			if(validCaption === true && validHttp === true) {
				$http.post('http://tiny-pizza-server.herokuapp.com/collections/alex-http', { caption: caption, image: image });
				console.log('inputs valid and posted');
			}
	};
});
