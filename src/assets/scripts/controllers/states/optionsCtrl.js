app.controller("optionsCtrl", ["$scope", "$rootScope", "Utils", "Progress", "Options", function($scope, $rootScope, Utils, Progress, Options) {
	$scope.hidden = [];
	$scope.bg_class = "default";

	$scope.isSelectedBg = function(name) {
		return ($scope.bg_class == name) ? "tick" : "";
	}

	$scope.setBg = function(name) {
		$scope.bg_class = name;
		
		Options.setOption(Options.sidebarBackgroundTag, $scope.bg_class);
	}

	$scope.isVisible = function(name) {
		return ($scope.hidden.indexOf(name) == -1);
	}

	$scope.setVisibility = function(name) {
		if(!$scope.isVisible(name)) {
			$scope.hidden.splice($scope.hidden.indexOf(name), 1);
		} else {
			$scope.hidden.push(name);
		}

		Options.setOption(Options.sidebarHiddenTag, $scope.hidden);
	}

	Options.getOption(Options.sidebarHiddenTag, Options.sidebarBackgroundTag).then(function(data) {
		$scope.hidden = (data && data[Options.sidebarHiddenTag]) ? data[Options.sidebarHiddenTag] : [];
		$scope.bg_class = (data && data[Options.sidebarBackgroundTag]) ? data[Options.sidebarBackgroundTag] : "default";

		Progress.hideAll();
	});

	$rootScope.$emit("sidebar-views", []);
}]);