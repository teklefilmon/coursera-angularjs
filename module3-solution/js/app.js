(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',FoundItemsDirective)
	.constant('ApiBasePath',"http://davids-restaurant.herokuapp.com");

	NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var menuList = this;
		menuList.getMatchedMenuItems = function (searchTerm) {
			menuList.found = MenuSearchService.getMatchedMenuItems(searchTerm);
		};

		menuList.removeItem = function (itemIndex) {
			menuList.found.splice(itemIndex,1);
		}
	}

	MenuSearchService.$inject=['$http', 'ApiBasePath'];
	function MenuSearchService($http,ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			var promise = $http({
				method: 'GET',
				url: (ApiBasePath + '/menu_items.json')
			});

			var foundItems = [];

			promise.then(function (response) {
				var allItems = response.data.menu_items;

				for(var i = 0; i < allItems.length; i++){
					var description = allItems[i].description;
					if(description.toLowerCase().indexOf(searchTerm) !== -1){
						foundItems.push(allItems[i]);
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
			return foundItems;
		};
	}

	function FoundItemsDirective() {
		var ddo={
			restrict: 'E',
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			}
			,
			controller: FoundItemsDirectiveController,
			controllerAs: 'menuList',
			bindToController: true
		};
		return ddo;
	}

	function FoundItemsDirectiveController() {
		var menuList = this;
	}

})();
