var application = {
	views : {},
	models : {},
	constructors : {
		views : {},
		models : {}
	}
};

application.constructors.form = FormView;
application.constructors.product = ProductView;
application.constructors.list = null;
application.constructors.container = null;

var Container = Backbone.View.extend({

	list : null,
	form : null,
	model : null,

	initialize : function () {
		// todo create model
		// todo create subviews
		// todo share model to subviews

		this.model = new ItemList();
		this.list = new ProductView({model: this.model});
		this.form = new FormView({model: this.model});
	}
});

window.addEventListener('load', function () {
	var container = new Container();
});
