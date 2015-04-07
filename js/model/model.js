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