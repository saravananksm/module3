(function(){

	angular.module('NarrowItDownApp',[])
		   .controller('NarrowItDownController',NarrowItDownController)	
		   .service('MenuSearchService',MenuSearchService)
		   //.directive('listItemDirective',ListItemDirective)
		   .directive('foundItems',FoundItems);



 	function FoundItems() {
 		var ddo ={
		 		templateUrl:'listItem.html',
		 		scope : {
		 			//found :'<',
		 			itemsList : '=myItems'
		 		}
		 	};
		 	return ddo;
 	}

	/*function ListItemDirective() {
		 	var ddo ={
		 		template:'{{item.short_name}} {{item.name}}  {{item.description}}'
		 	};
		 	return ddo;
		 }	 
*/
	NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var menuList = this;	
		menuList.getMatchedMenuItems = function(menuName){
			 var promise = MenuSearchService.getMatchedMenuItems(menuName);
			  promise.then(function(result){
			  	 menuList.found = result;			  	 
			  })
			
		};		

		menuList.removeItem = function(index) {
			console.log("removing" +index );
			console.log("found" +found );
			//MenuSearchService.removeItem(index);
			found.splice(itemIndex,1);
		}
	}


	
	MenuSearchService.$inject=['$http']
	function MenuSearchService($http){
			var service = this;
			
			service.getMatchedMenuItems = function (menuName){
			var promise = $http(
									{
										method:"GET",
										url:("https://davids-restaurant.herokuapp.com/menu_items.json")
										//params: {name:menuName}
									}
								).then(function(result){
									     var menuItems = result.data.menu_items;	
										 var foundItems =[];
										 for (var i = 0; i < menuItems.length; i++) {	
										  	if(menuItems[i].name.toLowerCase().includes(menuName.toLowerCase())){
										 		foundItems.push(menuItems[i]);		 	 
										 	}
										 }
										
									return foundItems;
								});
								return promise;
			//
			};

			service.removeItem= function(itemIndex){
				console.log(foundItems);
			foundItems.splice(itemIndex,1);
			}
	}
})();

