//Collection
var ItemList = Backbone.Collection.extend({
	model: Item,
	localStorage: new Backbone.LocalStorage("items-backbone")
});