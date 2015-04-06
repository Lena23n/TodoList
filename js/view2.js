
	var ProductView = Backbone.View.extend ({
		el: '#item-list',
		template: null,
		events: {
			"click .toggle"   : "toggleDone",
			"click a.destroy" : "clear"
		},

		initialize: function() {
			console.log(this.model);
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);

			this.render();
		},

		render: function () {
			var model = this.model;
			/*console.log(model.models);*/
			var template = _.template($('#one-item-template').html(), {model: model.models});


			$('#item-list').html(template/*(this.model.toJSON())*/);

			return this;
		},

		//addOne: function(item) {
		//	// todo add item to collection
		//	this.model.add(item);
		//},


		//attachToDOM: function () {
		//	$("item-list").append(this.render().el);
		//},

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



var FormView = Backbone.View.extend({
	el: $("#addFormContainer"),

	events: {
		"click #add":  "createOnClickAddButton"//doesn't work
	},

	inputs: {
		name : null,
		quantity : null
	},

	items: null,

	view: null,

	initialize: function() {
		var self = this;

		this.inputs.name = $("#new-item");
		this.inputs.quantity = $("#count");

		$('#add').on('click', function () {
			self.createOnClickAddButton();
		});

		this.listenTo(this.model, 'add', this.addOne);

		// todo refactor this.model
		this.model.fetch();
	},

	render : function () {
		//this.view.attachToDOM();
	},

	addOne: function(item) {
		// todo add item to collection
		this.model.add(item);
	},

	createOnClickAddButton: function() {
		if (!this.inputs.name.val() || !this.inputs.quantity.val()) {
			alert('You should fill in all the fields');
			return;
		}
		// todo show message to user

		this.model.add({
			title: this.inputs.name.val(),
			quantity: this.inputs.quantity.val()
		});

		this.inputs.name.val('');
		this.inputs.quantity.val('');
	}
});