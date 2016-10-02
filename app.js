(function(){

	angular.module('NarrowItDownApp',[])
		   .controller('NarrowItDownController',NarrowItDownController)	
		   .service('MenuSearchService',MenuSearchService)
		   .directive('listItemDirective',ListItemDirective)
		   .directive('listMenuItems',ListMenuItems);

 	function ListMenuItems() {
 		var ddo ={
		 		templateUrl:'listItem.html'
		 	};
		 	return ddo;
 	}
	function ListItemDirective() {
		 	var ddo ={
		 		template:'{{item.short_name}} {{item.name}}  {{item.description}}'
		 	};
		 	return ddo;
		 }	 

	NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var menuList = this;	
		//var found = [];

		menuList.getMatchedMenuItems = function(menuName){
			 var promise = MenuSearchService.getMatchedMenuItems(menuName);
			  promise.then(function(result){
			  	 menuList.found = result;			  	 
			  })
			
		};		

		menuList.removeItem = function (index) {
			MenuSearchService.removeItem(index);
		}
	}


	
	MenuSearchService.$inject=['$http']
	function MenuSearchService($http){
			var service = this;
			var foundItems =[];
			service.getMatchedMenuItems = function (menuName){
			return $http(
									{
										method:"GET",
										url:("https://davids-restaurant.herokuapp.com/menu_items.json")
										//params: {name:menuName}
									}
								).then(function(result){
									     var menuItems = result.data.menu_items;	

										 for (var i = 0; i < menuItems.length; i++) {		
										 	if(menuItems[i].name.includes(menuName)){
										 		foundItems.push(menuItems[i]);		 	 
										 	}
										 }
										
									return foundItems;
								});
			//
			};

			service.removeItem= function(itemIndex){
				console.log(foundItems);
			foundItems.splice(itemIndex,1);
			}
	}
})();

