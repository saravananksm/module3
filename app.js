(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);





NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menuController = this;
	menuController.searchTerm = "";
	menuController.filteredMenu = [];
	menuController.errorMsg = ""

	menuController.filterMenu = function(){
		if (menuController.searchTerm == ""){
			menuController.filteredMenu = [];
			menuController.errorMsg="Nothing Found";
			return;
		}
		
		var promise = MenuSearchService.getMenuItems();
	  
	  
		promise.then(function (response) {
			var menu = response.data;
			menuController.filteredMenu = MenuSearchService.getMatchedMenuItems(menu,menuController.searchTerm);
			if (menuController.filteredMenu.length == 0){
				menuController.errorMsg = "Nothing Found"
			}
			else{
				menuController.errorMsg = ""
			}

		})
			.catch(function (error) {
			menuController.errorMsg = "Something went terribly wrong.";
		});
	}


}


function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      filteredMenu: '<'
//      myTitle: '@title',
 //     onRemove: '&'
    },
    controller: FoundItemsController,
    controllerAs: 'foundCtl',
    bindToController: true,
//    link: ShoppingListDirectiveLink,
    transclude: true
  };

  return ddo;
}


function FoundItemsController(){
	var foundCtl = this;
	
	foundCtl.removeItem = function (itemIndex) {
		foundCtl.filteredMenu.splice(itemIndex, 1);
	};
}




MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
	var service = this;

	service.getMenuItems = function () {
    var response = $http({
		method: "GET",
		url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };


  service.getMatchedMenuItems = function (menu,searchTerm) {
	var result = [];
	var filteredmenu = [];

    
	for (var data in menu.menu_items){
		var menuName = menu.menu_items[data].name;
		var menuItem = menu.menu_items[data];
		if (menuName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
			filteredmenu.push(menuItem);
		}
		
	}


    return filteredmenu;
  };

}

})();
