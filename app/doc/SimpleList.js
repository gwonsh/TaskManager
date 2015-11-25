Ext.define('TaskManager.doc.SimpleList', {
	singleton : true,
	CLASSNAME:'SimpleList',
	getName:function(){
		return locale.viewer.simpleList;
	},
	getHtml:function(values){
		var baseColor = '#536C82';
		var spacer = '<div style="float:right;width:1px;height:10px;margin-left:10px;background-color:'+baseColor+'"></div>';
		var ctlr = getController('Viewer');
		var subjectAttr = ' class="basic-field simpleList" field_type="subject" bd_idx="'+values.bd_idx+'"';
		var contentAttr = ' class="basic-field simpleList" field_type="content" bd_idx="'+values.bd_idx+'"';
		var html;
		html  =  '<div class="viewer-frame">';
		html +=  	'<div style="width:100%;height:68px">';
		if(values.approvalList){
			var apvLst = values.approvalList;
		html += 	 	 '<div style="float:left;height:65px;">';
		html +=			 	'<table cellpadding="0" cellspacing="0" border="1" class="approval-list">';
		html +=             	'<tr>';
			for(i=0; i<apvLst.length; i++){
		html += 					'<td height="20" width="45" align="center" title="'+apvLst[i].user_name+'">';
		html +=                     	apvLst[i].user_duty;
		html += 					'</td>';
			}
		html +=             	'</tr><tr>';
			for(i=0; i<apvLst.length; i++){
		html += 					'<td height="45" align="center" valign="middle" bdIdx="'+values.bd_idx+'" checked="'+apvLst[i].ap_chk+'" userid="'+apvLst[i].user_id+'" class="apvUnit">';
				if(apvLst[i].ap_chk == 1){
		html +=                     	'<img src="resources/images/ico_check.png">';
				}
		html += 					'</td>';
			}
		html +=             	'</tr>';
		html +=			 	'</table>';
		html += 	 	 '</div>';
		}
		html +=	 	 	'<div style="float:right">';
		html +=	 	 		'<div style="text-align:right;padding:0 0 5px 0">' + locale.main.user + ': ' +values.bd_name+'</div>';
		html +=	 	 		'<div style="text-align:right;padding:0 0 5px 0">'+locale.main.regDate+': '+values.bd_regdate+'</div>';
		html +=     	 '</div>';
		html +=		 '</div>';
		/* category name */
		html +=  	 '<div style="width:100%;height:45px;background-color:'+baseColor+'">';
		if(values.bd_colortag !== ''){
		html += 		'<div style="float:left;width:10px;height:100%;background-color:'+values.bd_colortag+'"></div>';
		}
		html += 		'<span class="label-left-space" style="font-size:22px;line-height:45px;color:white">'+categoryName+'</span>';
		html +=      '</div>';
		html +=		 '<table cellpadding="10" cellspacing="0" width="100%">'
		
		var subject = values.bd_subject;
		if(values.bd_subject == '') subject = '';
		html +=	     	'<tr>';	
		html +=	     		'<td style="width:22%;text-align:right" class="simpleList">'+locale.main.title+spacer+'</td>';
	
		html +=	     		'<td '+subjectAttr+' style="width:78%">' + subject + '</td>';
		html +=	     	'</tr>';
		Ext.Array.each(values.bd_data, function(entry, index){
		var customAttr = ' class="custom-field simpleList" fieldIndex="'+index+'" bd_idx="'+values.bd_idx+'" cols_idx="'+entry.cols_idx+'" cols_name="'+entry.cols_name+'" cols_type="'+entry.cols_type + '"';
		if(entry.cols_type == 'dataset'){
		html +=		 	'<tr>';
		html +=		 		'<td style="text-align:right" class="simpleList">'+entry.cols_name+spacer+'</td>';		
		html += 			'<td '+customAttr+'>'+entry.data_html+'</td>';
		html +=		 	'</tr>';
		}
			/* link field */
		else if(entry.cols_type == 'link'){
		html +=		 	'<tr>';
		html +=		 		'<td style="text-align:right" class="simpleList">'+entry.cols_name+spacer+'</td>';
		html +=             '<td height=23 '+customAttr+'>';
		if(entry.data_val.length > 0){
		html += 				'<div style="width:100%">';
		var ids = entry.data_val.split(',');
		Ext.Array.each(ids, function(item){
		var url = domain + '/thumb/' + item.trim() + '/0/T';
		var parameters = item.trim() + ',' + item.cols_name;
		var clickEvt = 'getController(\'Viewer\').showLinkInformation('+parameters+')';
		html +=		 				'<div class="viewer-link" onclick="'+clickEvt+'" cols_name="'+item.cols_name+'" bd_idx="'+item.trim()+'"';
		html += 					' style="background:URL('+url+');background-repeat:no-repeat;background-position:center">';
		html += 					'</div>';
		});
		html += 				'</div>';
			}
		html +=		 		'</td>';
		html +=		 	'</tr>';
		}
		/* end link field */
		/* color radio field */
		else if(entry.cols_type == 'colorchk'){
		html +=		 	'<tr>';
		html +=		 		'<td style="text-align:right" class="simpleList">'+entry.cols_name+spacer+'</td><td '+customAttr+' class="simpleList">';
			if(entry.data_val.length > 0){
		html += ctlr.getColorradio(entry.data_val);
			}
		html += 			'</td>';
		html +=		 	'</tr>';
		}
		/* end color radio field */
		else if(entry.cols_type == 'color'){
		html +=		 	'<tr>';
		html +=		 		'<td style="text-align:right" class="simpleList">'+entry.cols_name+spacer+'</td>';
		html += 			'<td  '+customAttr+'><div  style="width:15px;height:15px;background-color:'+entry.data_val+'"></div></td>';
		html +=		 	'</tr>';
		}
		else if(entry.cols_type == 'color256'){
		html +=		 	'<tr>';
		html +=		 		'<td style="text-align:right" class="simpleList">'+entry.cols_name+spacer+'</td>';
		html += 			'<td  '+customAttr+'>';
		Ext.Array.each(entry.data_val.split(','), function(item){
			html += 			'<div class="color256" style="float:left;width:15px;height:15px;background-color:'+item.trim()+'"></div>';
		});
		html +=             '</td>';
		html +=		 	'</tr>';
		}
		/* datagroup field */
		else if(entry.cols_type == 'datagrp'){
		html +=		 	'<tr>';
		html +=		 		'<td style="text-align:right" class="simpleList">'+entry.cols_name+spacer+'</td>';
		html += 			'<td  '+customAttr+' value="'+entry.data_val+'" relatedCategory="'+entry.cols_category+'">';
			if(entry.data_val ==='' || entry.data_val === undefined || entry.data_val === null){

			}
			else{
		html +=                 '<div style="float:left">'+entry.data_val+'</div>';
		html +=                 '<img value="'+entry.data_val+'" onclick="getController(\'Viewer\').showDataGroupInfomation(this)" relatedCategory="'+entry.cols_category+'" src="resources/images/ico_view.png" style="float:left;margin-left:7px;cursor:pointer">';
			}
		html +=		 		'</td></tr>';
		}
		/* end datagroup field */
		else{
		html +=		 	'<tr>';
		html +=		 		'<td style="text-align:right" class="simpleList">'+entry.cols_name+spacer+'</td>';
		html += 			'<td  '+customAttr+'>' +entry.data_val+ '</td>';
		html +=		 	'</tr>';
		}
		});	
		var remark = values.bd_content;
		if(remark === undefined) remark = '';
		html +=		 		'<tr>';
		html +=		 			'<td class="simpleList" style="text-align:right">'+locale.main.description+spacer+'</td><td height=25 '+contentAttr+' colspan=4>'+remark+'</td>';
		html +=		 		'</tr>';
		html +=      	'</table>';
		/* attachment */
		if(values.bd_file.length > 0){
		html += 		'<table cellpadding=0 cellspacing=0 class="viewer-table section-space">';
		html += 		'<tr><td style="border-bottom:1px solid #c0c8d0; padding-bottom:5px">'+locale.main.attachFile+'</td></tr>';
		html += 		'<tr><td>';
		html += 			'<div style="width:100%;padding-top:10px">';
		Ext.Array.each(values.bd_file, function(entry, index){
			var tPath = entry.thumb_path.replace('/T', '');
			if(!Ext.isIE) tPath += '?c=' + randomString(16);
			var oPath = tPath.replace('thumb', 'file');//origial image(jpg) size path
			var dPath = 'binder/down/' + values.bd_idx + '/' + index;//original file download path
			var pixels = entry.file_height * entry.file_width;
			var sizeInFormat = ctlr.autoFilesizeFormat(entry.file_size);
			var resol = entry.file_width+'x'+entry.file_height;
			//var backSize = (entry.file_height < 120 && entry.file_width < 120)? 'auto' : 'cover';
			var backSize = 'contain';
			if(entry.file_width == 0){
				backSize = 'auto';
			}
			var attr = 'thumbSrc="'+tPath+'" viewSrc="'+oPath+'" downSrc="';
				attr += dPath+'" pixels="'+pixels+'" filesize="'+entry.file_size+'" resolution="'+resol+'" filename="'+entry.file_name+'"';
			html += 		'<div class="viewer-attach-unit">';
			html += 			'<div style="background-image:url('+tPath+');background-size:'+backSize+'" '+attr+' class="viewer-attach-image"></div>';
			html += 			'<div class="viewer-filename" title="'+entry.file_name+'">';
			html += 				entry.file_name;
			html += 			'</div>';
			html += 			'<div class="viewer-filename">'+sizeInFormat+'</div>';
			html += 		'</div>';
		});
		html += 	'</div>';
		html += '</td></tr>';
		html += '</table>';
		}
		html +=	'<div class="viewer-header" style="padding-top:10px;border-top:1px solid #C0C8D0 ">';
		if(values.companyInfo !== undefined){
		html +=  	'<img src="'+values.companyInfo.company_logo+'" class="viewer-logo">';
		html += 	 '<div style="float:left;height:100%;margin-left:10px">';
		html += 	 '<div class="viewer-companyname">'+ values.companyInfo.company_name +'</div>';
		html += 			'<div class="viewer-addr">'+ values.companyInfo.company_addr1 + ' ' + values.companyInfo.company_addr2 +'</div>';
		html += 	 '</div>';
		}
		html +=  '</div>';
		html += '</div>';
		return html;
	}	
});