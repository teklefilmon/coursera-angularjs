(function () {
	'use strict';

	angular.module('ShoppingListApp',[])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListService', ShoppingListService);

	ToBuyController.$inject = ['ShoppingListService'];
	function ToBuyController(ShoppingListService) {
		var toBuyCtrl = this;
		toBuyCtrl.toBuyList = ShoppingListService.getItemsToBuyList();
		toBuyCtrl.buyItem = function (index) {
			ShoppingListService.buyItem(index);
		};
	};

	AlreadyBoughtController.$inject = ['ShoppingListService'];
	function AlreadyBoughtController(ShoppingListService) {
		var alreadyBoughtCtrl = this;
		alreadyBoughtCtrl.alreadyBoughtList = ShoppingListService.getAlreadyBoughtItemsList();
	};

	function ShoppingListService() {
		var service = this;
		var toBuyItemsList = [
			{
				name: "cookies", quantity: 10
			},{
				name: "chips", quantity: 8
			},{
				name: "snacks", quantity: 6
			},{
				name: "sugar", quantity: 4
			},{
				name: "bread", quantity: 2
			}
		];
		var alreadyBoughtItemsList = [];

		service.getItemsToBuyList = function () {
			return toBuyItemsList;
		}
		service.getAlreadyBoughtItemsList = function () {
			return alreadyBoughtItemsList;
		}
		service.buyItem = function (index) {
			alreadyBoughtItemsList.push(toBuyItemsList[index]);
			toBuyItemsList.splice(index,1);
		}
	}
})();
