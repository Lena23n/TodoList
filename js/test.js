/**
 * @class MainView
 * will be used as a container for another views
 * also will be used as a 'controller' for app, so we can slap logic together
 */

var MainView = BaseView.extend({
	templateUrl : 'views/main/main.html',
	models : {
		list : null
	},
	views : {
		addForm : null,
		list : null
	},
	onInitialize : function (){
		var self = this;

		/**
		 * subscribe to events from
		 * @see AddForm.addItem
		 */
		this.vent.on('addItem', function (item){
			self.addItem(item);
		});

		/**
		 * subscribe to events from
		 * @see ListView.deleteItem
		 */
		this.vent.on('removeItem', function (index){
			self.removeItem(index);
		});

		/**
		 * subscribe to events from
		 * @see ListView.toggleFinished
		 */
		this.vent.on('toggleFinished', function (index){
			self.toggleFinished(index);
		});
	},
	/**
	 * @see BaseView.render
	 */
	onRender : function (){
		this.views.addForm = new AddForm();

		this.views.list = new ListView( { model : this.models.list} );

		this.showMainScreen();
	},
	showError : function (error){
		alert(JSON.stringify(error, null, 4));
	},
	/**
	 * @function
	 * @param item {Object} item to add to the shopping list
	 */
	addItem : function (item){
		console.log('main addItem', item);

//		normal backbone collection add
		this.models.list.add(item, {validate : true});
	},
	/**
	 * @function
	 * @param index {Number} index of element to remove
	 */
	removeItem : function (index){
//		normal backbone collection remove
		var modelToRemove = this.models.list.at(index);
		this.models.list.remove(modelToRemove);
	},
	toggleFinished : function (index){
//		backbone model
		var checkedModel = this.models.list.at(index);

		checkedModel.set({finished : !checkedModel.get('finished')});

//		backbone local save
//		this.models.list.saveLocal();
	},
	/**
	 * just clear all HTML data to simulate 'pfgination' between views
	 * you can implement custom animations to swap between views
	 */
	clearContainers : function (){
		for (var i in this.views) {
			if (this.views[i] && this.views[i].$el)
				this.views[i].$el.detach();
		}
	},
	/**
	 * show main data
	 * @see AddForm
	 * @see ListView
	 */
	showMainScreen : function (){
		var addFormContainer = this.$el.find('#addFormContainer'),
			listContainer = this.$el.find('#listContainer');

		this.clearContainers();

		/**
		 * we need to clear old data from previous user (if it's not the first login)
		 * or create new collection for just logged user
		 *
		 * so we can erase all data manualy and re-render the list
		 * or just create new instances
		 */

		/**
		 * @type {ListCollection}
		 */
//		backbone collection creation
		this.models.list = new ListCollection();

//		normal backbone collection validation callback
		var self = this;
		this.models.list.on('invalid', function (model, error){
			self.showError(error);
		});

//		attach backbone collection to list
		this.views.list = new ListView( { model : this.models.list} );

		addFormContainer.html(this.views.addForm.el);
		listContainer.html(this.views.list.el);
	}
});




var BaseView = Backbone.View.extend({
	/**
	 * HTML template file URL
	 */
	templateUrl : '',
	template : null,
	model : null,
	/**
	 * initializes basic stuff
	 * - load the HTML file for template
	 * - starting listen to model events (if exists)
	 * - render view for the first time
	 */
	initialize : function (){
		var self = this;
		console.log('init');
		if (this.model) {
			this.listenTo(this.model, "add", this.render);
			this.listenTo(this.model, "remove", this.render);
			this.listenTo(this.model, "reset", this.render);
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.render);
		}
		if (this.templateUrl.length) {
			console.log('get template', this.templateUrl);
			var request = $.get(this.templateUrl, function (data){
				self.template = _.template(data);
				self.render();
			}, 'html')
				.fail(function() {
					alert( "error" );
					console.log(arguments);
				});

			console.log(request);
		}

		this.vent = vent;

		/**
		 * @see BaseView.render explanation
		 */

		if (typeof this['onInitialize'] == 'function'){
			this['onInitialize'].call(this);
		}
	},
	/**
	 * Generates the HTML of current view using underscore template and model data (if exists)
	 */
	render : function (){

		if (!this.template) {
			return false;
		}

		var data = null;

		if (this.model) {
			data = this.model.toJSON();
		}

		var html = this.template({model : data, test : 'test'});

		this.$el.html(html);

		/**
		 * we will be unable to override the 'render' method and keep this functionality working
		 * so we need to add new method 'onRender' and just call it after original render
		 */

		if (typeof this['onRender'] == 'function'){
			this['onRender'].call(this);
		}

		return this;
	}
});



