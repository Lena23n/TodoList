var application = {
	views : {},
	models : {},
	constructors : {
		views : {},
		models : {}
	}
};

application.constructors.form = FormView;
application.constructors.productView = ProductList;
application.constructors.list = ItemList;
application.constructors.container = null;

var Container = Backbone.View.extend({

	list : null,
	form : null,
	model : null,
	collection: null,

	initialize : function () {
		// todo create model
		// todo create subviews
		// todo share model to subviews
		this.collection = new application.constructors.list();
		this.list = new application.constructors.productView({model: this.collection});
		this.form = new application.constructors.form({model: this.collection});
	}
});

window.addEventListener('load', function () {
	var container = new Container();
});
