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
	setViewer:function(){
		var app = TaskManager;
		this.VIEWERS.push(app.doc.Default);
		this.VIEWERS.push(app.doc.ByImage);		
		this.VIEWERS.push(app.doc.SimpleList);			
		this.VIEWERS.push(app.doc.Gallery);
	},		
	VIEWERS:[]
});