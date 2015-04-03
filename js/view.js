$(function(){
	//One item view
	var ProductView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#one-item-template').html()),

		events: {
			"click .toggle"   : "toggleDone",
			"click a.destroy" : "clear"
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));
			return this;
		},

		toggleDone: function() {
			this.model.toggle();
		},

		clear: function() {
			this.model.destroy();
		}
	});

	var AppView = Backbone.View.extend({
		el: $("#app"),

		events: {
			"click #add":  "createOnClickAddButton"
		},

		initialize: function() {

			this.input = this.$("#new-item");
			this.inputQuantity = this.$("#count");

			this.listenTo(items, 'add', this.addOne);

			items.fetch();
		},

		addOne: function(product) {
			var view = new ProductView({model: product});
			this.$("#item-list").append(view.render().el);
		},

		//addAll: function() {
		//	items.each(this.addOne, this);
		//},

		createOnClickAddButton: function() {
			if (!this.input.val() || !this.inputQuantity.val()) return;

			items.create({
				title: this.input.val(),
				quantity: this.inputQuantity.val()
			});

			this.input.val('');
			this.inputQuantity.val('');
		}

	});

	var App = new AppView();
});


