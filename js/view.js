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

	// todo use single tmpl for whole list
	// form view
	// list view (list view + product view)

	var AppView = Backbone.View.extend({
		el: $("#app"),

		events: {
			"click #add":  "createOnClickAddButton"
		},

		inputs : {
			name : null,
			quantity : null
		},

		initialize: function() {

			this.input = this.$("#new-item");
			this.inputQuantity = this.$("#count");

			this.listenTo(items, 'add', this.addOne);

			// todo refactor this.model
			items.fetch();
		},

		render : function () {
			// todo use this
			// subscribe to collection change
			// render all subviews
		},

		addOne: function(product) {
			var view = new ProductView({model: product});
			// todo add item to collection
			this.$("#item-list").append(view.render().el);
		},

		//addAll: function() {
		//	items.each(this.addOne, this);
		//},

		createOnClickAddButton: function() {
			if (!this.input.val() || !this.inputQuantity.val()) return;
			// todo show message to user

			items.add({
				title: this.input.val(),
				quantity: this.inputQuantity.val()
			});

			this.input.val('');
			this.inputQuantity.val('');
		}

	});

	var App = new AppView();
});


