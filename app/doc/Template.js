Ext.define('TaskManager.doc.Template', {
	singleton : true,
	getName:function(){
		return locale.viewer.template;
	},
	getHtml:function(values){
		var ctlr = getController('Viewer');
		var subjectAttr = ' class="basic-field" field_type="subject" bd_idx="'+values.bd_idx+'"';
		var contentAttr = ' class="basic-field" field_type="content" bd_idx="'+values.bd_idx+'"';
		var html;
		html  =  '<div class="viewer-frame">';
		/* header */
		html +=		 '<div class="viewer-header">';

		html += '</div>';
		return html;		
	}	
});