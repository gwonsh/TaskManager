Ext.define('TaskManager.doc.ByImage', {
	singleton : true,
	CLASSNAME:'ByImage',
	getName:function(){		
		return locale.viewer.byImage;
	},
	getHtml:function(values){
		var ctlr = getController('Viewer');
		var subjectAttr = ' class="basic-field" field_type="subject" bd_idx="'+values.bd_idx+'"';
		var contentAttr = ' class="basic-field" field_type="content" bd_idx="'+values.bd_idx+'"';
		var html;		
		html  =  '<div class="viewer-frame">';
		/* header */
		html +=		 '<div class="viewer-header">';
		if(values.companyInfo !== undefined){
			html += 	 	 '<img src="'+values.companyInfo.company_logo+'" class="viewer-logo">';
			html += 	 	 '<div style="float:left;height:100%;margin-left:10px">';
			html += 	 	    '<div class="viewer-companyname">'+ values.companyInfo.company_name +'</div>';
			html += 			'<div class="viewer-addr">'+ values.companyInfo.company_addr1 + ' ' + values.companyInfo.company_addr2 +'</div>';
			html += 	 	 '</div>';
		}
		html +=  	 '</div>';
		/* category name */
		html +=  	 '<div style="height:30px">';
			if(values.bd_colortag !== ''){
				html += '<div style="float:left;width:10px;height:100%;background-color:'+values.bd_colortag+'"></div>';
			}
		html += '<span class="label-left-space" style="font-size:25px;line-height:30px">'+categoryName+'<span></div>';
		/* subject */
		var subject = values.bd_subject;
		if(subject === undefined) subject = ' ';
		html +=  	 '<div class="viewer-title"><span class="label-left-space">'+subject+'<span></div>';
		var path;
		if(values.bd_file[0]){
			path = values.bd_file[0].thumb_path.replace('/T', '/M');
		}
		else{
			path = 'resources/images/ico_noimage.gif';
		}
		/* image */
		html +=      '<div style="width:100%;height:500px;background-image:url('+path+')" class="div-image"></div>';
		var remark = values.bd_content;
		if(remark === undefined) remark = '';
		html +=      '<div '+contentAttr+' style="width:100%;margin-top:10px;padding:5px;border:1px solid black">'+remark+'</div>';
		/* custom fields */
		if(values.bd_data.length > 0){
			html +=	 	'<div style="width:100%" class="section-space">';
			html +=		 	'<table border=1 cellpadding=0 cellspacing=0 class="viewer-table section-space">';
			Ext.Array.each(values.bd_data, function(entry, index){
				var customAttr = ' class="custom-field" fieldIndex="'+index+'" bd_idx="'+values.bd_idx+'" cols_idx="'+entry.cols_idx+'" cols_name="'+entry.cols_name+'" cols_type="'+entry.cols_type + '"';
				if(entry.cols_type == 'dataset'){
					html +=		 		'<tr>';
					html +=		 			'<th colspan=2 '+customAttr+'>'+entry.cols_name+'</th>';
					html +=		 		'</tr>';
					html +=		 		'<tr>';
					html += 				'<td colspan=2>';
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
						Ext.Array.each(ids, function(entry){
							var url = domain + '/thumb/' + entry.trim() + '/0/T';
							var parameters = entry.trim() + ',' + entry.cols_name;
							var clickEvt = 'getController(\'Viewer\').showLinkInformation('+parameters+')';
							html +=		 				'<div class="viewer-link" onclick="'+clickEvt+'" cols_name="'+entry.cols_name+'" bd_idx="'+entry.trim()+'"';
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
				else{
					html +=		 		'<tr>';
					html +=		 			'<th style="width:180px">'+entry.cols_name+'</th>';
					if(entry.cols_type != 'idx'){
						html += 				'<td  '+customAttr+'>' +entry.data_val+ '</td>';
					}
					else{
						html += 				'<td>' +entry.data_val+ '</td>';
					}
					html +=		 		'</tr>';
				}
			});
			html +=		 	'</table>';
			html +=  	'</div>';
		}
		/* attachment */
		if(values.bd_file.length > 0){
			html += '<table border=1 cellpadding=0 cellspacing=0 class="viewer-table section-space">';
			html += '<tr><th>'+locale.main.attachFile+'</th></tr>';
			html += '<tr><td>';
			html += 	'<div style="width:100%">';
			Ext.Array.each(values.bd_file, function(entry, index){
	//             if(index > 0){
					var tPath = entry.thumb_path.replace('/T', '');//thumbnail path
					if(!Ext.isIE) tPath += '?c=' + randomString(16);;
					var oPath = tPath.replace('thumb', 'file');//origial image(jpg) size path
					var dPath = 'binder/down/' + values.bd_idx + '/' + index;//original file download path
					var pixels = entry.file_height * entry.file_width;
					var sizeInFormat = ctlr.autoFilesizeFormat(entry.file_size);
					var resol = entry.file_width+'x'+entry.file_height;
					var backSize = (entry.file_height < 120 && entry.file_width < 120)? 'auto' : 'cover';
					var attr = 'thumbSrc="'+tPath+'" viewSrc="'+oPath+'" downSrc="';
					attr += dPath+'" pixels="'+pixels+'" filesize="'+entry.file_size+'" resolution="'+resol+'" filename="'+entry.file_name+'"';
					html += 		'<div class="viewer-attach-unit">';
					html += 			'<div style="background-image:url('+tPath+');background-size:'+backSize+'" '+attr+' class="viewer-attach-image"></div>';
					html += 			'<div class="viewer-filename" title="'+entry.file_name+'">';
					html += 				entry.file_name;
					html += 			'</div>';
					html += 			'<div class="viewer-filename">'+sizeInFormat+'</div>';
					html += 		'</div>';
	//             }
			});
			html += 	'</div>';
			html += '</td></tr>';
			html += '</table>';
		}

		html += '</div>';
		return html;
	}
});