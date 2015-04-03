// Model
var Item = Backbone.Model.extend ({
	defaults: {
		title: 'Title...',
		quantity: '',
		done: false
	},

	toggle: function() {
		this.save({done: !this.get("done")});
	}

});

//Collection
var ItemList = Backbone.Collection.extend({
	model: Item,
	localStorage: new Backbone.LocalStorage("items-backbone")
});

var items = new ItemList;