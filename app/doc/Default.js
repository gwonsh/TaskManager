Ext.define('TaskManager.doc.Default', {
	singleton : true,
	CLASSNAME:'Default',
	getName:function(){
		return locale.viewer.defaultView;
	},
	getHtml:function(values){
		var ctlr = getController('Viewer');
		var subjectAttr = ' class="basic-field" field_type="subject" bd_idx="'+values.bd_idx+'"';
		var contentAttr = ' class="basic-field" field_type="content" bd_idx="'+values.bd_idx+'"';
		var html;
		var i;
		html  =  '<div class="viewer-frame">';
		/* header */
		html +=		 '<div class="viewer-header">';
			if(values.companyInfo !== undefined){
		html += 	 	 '<img src="'+values.companyInfo.company_logo+'" class="viewer-logo">';
		html += 	 	 '<div style="float:left;height:100%;margin-left:10px">';
		html += 	 	    '<div class="viewer-companyname">'+ values.companyInfo.company_name +'</div>';
		html += 			'<div class="viewer-addr">'+ values.companyInfo.company_addr1 + ' ' + values.companyInfo.company_addr2 +'</div>';
		html += 	 	 '</div>';
				if(values.approvalList){
					var apvLst = values.approvalList;
		html += 	 	 '<div style="float:right;height:100%;margin-left:10px">';
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
			}
		html +=  	 '</div>';
		/* category name */
		html +=  	 '<div class="viewer-title">';
			if(values.bd_colortag !== ''){
		html += 	 '<div style="float:left;width:10px;height:100%;background-color:'+values.bd_colortag+'"></div>';
			}
		html += 	 '<span class="label-left-space">'+categoryName+'<span></div>';
		/* basic info */
		html +=		 '<div style="width:100%">';
		html +=		 	'<table border=1 cellpadding=0 cellspacing=0 class="viewer-table section-space">';
		var subject = values.bd_subject;
		if(subject === undefined) subject = ' ';
		html +=		 		'<tr>';
		html +=		 			'<th height="25" '+subjectAttr+' colspan=4>'+subject+'</th>';
		html +=		 		'</tr>';
		html +=		 		'<tr>';
		html +=		 			'<th>'+locale.main.user+'</th>';
		html +=		 			'<td>'+values.bd_name+'</td>';
		html +=		 			'<th>'+locale.main.regDate+'</th>';
		html +=		 			'<td>'+values.bd_regdate+'</td>';
		html +=		 		'</tr>';
		var remark = values.bd_content;
		if(remark === undefined) remark = '';
		html +=		 		'<tr>';
		html +=		 			'<td height="25" '+contentAttr+' colspan=4>'+remark+'</td>';
		html +=		 		'</tr>';
		html +=		 	'</table>';
		html +=		 '</div>';
		/* custom fields */
		if(values.bd_data.length > 0){
		html +=	 	'<div style="width:100%" class="section-space">';
		html +=		 	'<table border=1 cellpadding=0 cellspacing=0 class="viewer-table section-space">';
			Ext.Array.each(values.bd_data, function(entry, index){
				var customAttr = ' class="custom-field" fieldIndex="'+index+'" bd_idx="'+values.bd_idx+'" cols_idx="'+entry.cols_idx+'" cols_name="'+entry.cols_name+'" cols_type="'+entry.cols_type + '"';
				if(entry.cols_type == 'dataset'){
		html +=		 		'<tr>';
		html +=		 			'<th colspan=2>'+entry.cols_name+'</th>';
		html +=		 		'</tr>';
		html +=		 		'<tr>';
		html += 				'<td colspan=2 '+customAttr+'>';
		html +=                 	entry.data_html+'</td>';
		html +=		 		'</tr>';
				}
				/* link field */
				else if(entry.cols_type == 'link'){
		html +=		 		'<tr>';
		html +=		 			'<th colspan=2>'+entry.cols_name+'</th>';
		html +=		 		'</tr>';
		html +=		 		'<tr>';
		html += 				'<td height=23 colspan=2 '+customAttr+'>';
					if(entry.data_val.length > 0){
		html += 					'<div style="width:100%">';
						var ids = entry.data_val.split(',');
						Ext.Array.each(ids, function(item){
							var url = domain + '/thumb/' + item.trim() + '/0/T';
						 var parameters = item.trim() + ',' + item.cols_name;
							var clickEvt = 'getController(\'Viewer\').showLinkInformation('+parameters+')';
		html +=		 				'<div class="viewer-link" onclick="'+clickEvt+'" cols_name="'+item.cols_name+'" bd_idx="'+item.trim()+'"';
		html += 					' style="background:URL('+url+');background-repeat:no-repeat;background-position:center">';
		html += 				    '</div>';
						});
		html += 					'</div>';
					}
		html +=		 			'</td>';
		html +=		 		'</tr>';
				}
				/* end link field */
				/* color radio field */
				else if(entry.cols_type == 'colorchk'){
		html +=		 		'<tr>';
		html +=		 			'<th>'+entry.cols_name+'</th>';
		html += 				'<td  '+customAttr+'>';
					if(entry.data_val.length > 0){
		html += 					ctlr.getColorradio(entry.data_val);
					}
		html += 				'</td>';
		html +=		 		'</tr>';
				}
				/* end color radio field */
				else if(entry.cols_type == 'color'){
		html +=		 		'<tr>';
		html +=		 			'<th>'+entry.cols_name+'</th>';
		html += 				'<td  '+customAttr+'><div  style="width:15px;height:15px;background-color:'+entry.data_val+'"></div></td>';
		html +=		 		'</tr>';
				}
				else if(entry.cols_type == 'color256'){
		html +=		 		'<tr>';
		html +=		 			'<th>'+entry.cols_name+'</th>';
		html += 				'<td  '+customAttr+'>';
						Ext.Array.each(entry.data_val.split(','), function(item){
		html += 			    	'<div class="color256" style="float:left;width:15px;height:15px;background-color:'+item.trim()+'"></div>';
						});
		html +=                  '</td>';
		html +=		 		'</tr>';
				}
				else if(entry.cols_type == 'datagrp'){
		html +=		 		'<tr>';
		html +=		 			'<th>'+entry.cols_name+'</th>';
		html += 				'<td  '+customAttr+' value="'+entry.data_val+'" relatedCategory="'+entry.cols_category+'">';
					if(entry.data_val ==='' || entry.data_val === undefined || entry.data_val === null){

					}
					else{
		html +=                 	'<div style="float:left">'+entry.data_val+'</div>';
		html +=                 	'<img value="'+entry.data_val+'" onclick="getController(\'Viewer\').showDataGroupInfomation(this)" relatedCategory="'+entry.cols_category+'" src="resources/images/ico_view.png" style="float:left;margin-left:7px;cursor:pointer">';
					}
		html +=		 		'</td></tr>';
				}
				else{
		html +=		 		'<tr>';
		html +=		 			'<th style="width:180px">'+entry.cols_name+'</th>';
		html += 				'<td  '+customAttr+'>' +entry.data_val+ '</td>';
		//			if(entry.cols_type != 'idx'){
		//html += 				'<td  '+customAttr+'>' +entry.data_val+ '</td>';
		//			}
		//			else{
		//html += 				'<td>' +entry.data_val+ '</td>';
		//			}
		html +=		 		'</tr>';
				}
			});
		html +=		 	'</table>';
		html +=  	'</div>';
		}
		/* attachment */
		if(values.bd_file.length > 0){
		html += 	'<table border=1 cellpadding=0 cellspacing=0 class="viewer-table section-space">';
		html += 	'<tr><th>'+locale.main.attachFile+'</th></tr>';
		html += 	'<tr><td>';
		html += 		'<div style="width:100%">';
			Ext.Array.each(values.bd_file, function(entry, index){
				var tPath = entry.thumb_path.replace('/T', '');
				if(!Ext.isIE) tPath += '?c=' + randomString(16);
				var oPath = tPath.replace('thumb', 'file');//origial image(jpg) size path
				var dPath = 'binder/down/' + values.bd_idx + '/' + index;//original file download path
				var pixels = entry.file_height * entry.file_width;
				var sizeInFormat = ctlr.autoFilesizeFormat(entry.file_size);
				var resol = entry.file_width+'x'+entry.file_height;
				//var backSize = (entry.file_height < 120 && entry.file_width < 120)? 'auto' : 'cover';
				//if(entry.file_width > entry.file_height){
				//	var ratio =  250/entry.file_width;
				//	var tw = entry.file_height * ratio;
				//	console.log(tw);
				//	if(tw < 120){
				//		backSize = 'auto';
				//		console.log(backSize);
				//	}
				//}
				var backSize = 'contain';
				if(entry.file_width == 0){
					backSize = 'auto';
				}
				var attr = 'thumbSrc="'+tPath+'" viewSrc="'+oPath+'" downSrc="';
					attr += dPath+'" pixels="'+pixels+'" filesize="'+entry.file_size+'" resolution="'+resol+'" filename="'+entry.file_name+'"';
		html += 				'<div class="viewer-attach-unit">';
		html += 					'<div style="background-image:url('+tPath+');background-size:'+backSize+'" '+attr+' class="viewer-attach-image"></div>';
		html += 					'<div class="viewer-filename" title="'+entry.file_name+'">';
		html += 					entry.file_name;
		html += 					'</div>';
		html += 					'<div class="viewer-filename">'+sizeInFormat+'</div>';
		html += 				'</div>';
			});
		html += 			'</div>';
		html += 		'</td></tr>';
		html += 	'</table>';
		}
		html += '</div>';
		return html;		
	}	
});