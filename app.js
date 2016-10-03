(function(){

	angular.module('NarrowItDownApp',[])
		   .controller('NarrowItDownController',NarrowItDownController)	
		   .service('MenuSearchService',MenuSearchService)
		   //.directive('listItemDirective',ListItemDirective)
		   .directive('foundItems',FoundItems);



 	

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
			  	 menuList.found = [];
			  	 menuList.found = result;			  	 
			  })
			
		};		

		menuList.remove = function (index) {
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
										  	if(menuItems[i].name.toLowerCase().includes(menuName.toLowerCase())){
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

	function FoundItems() {
 		var ddo ={
		 		templateUrl:'listItem.html',
		 		scope : {
		 			found :'<',
		 			//itemsList : '=myItems',
		 			onRemove: '&'
		 		},
		 		controller: NarrowItDownController,
       			controllerAs: 'controller',
       			bindToController: true
		 	};
		 	return ddo;
 	}
})();

