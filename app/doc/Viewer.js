Ext.define('TaskManager.doc.Viewer', {
	singleton : true,
	requires:[
		'TaskManager.doc.Default',
		'TaskManager.doc.ByImage',
		'TaskManager.doc.SimpleList',
		'TaskManager.doc.Gallery'
	],
	config:{
		name:'Viewer'
	},
	constructor:function(config){
		this.initConfig(config);
		this.setViewer();
	},
	getApp:function(){
		return TaskManager;
	},
	setViewer:function(){
		this.FORMS.push(this.getApp().doc.Default);
		this.FORMS.push(this.getApp().doc.ByImage);
		this.FORMS.push(this.getApp().doc.SimpleList);
		this.FORMS.push(this.getApp().doc.Gallery);
	},
	FORMS:[]
});