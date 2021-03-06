/*
 * File: app/view/NewRequest.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TaskManager.view.NewRequest', {
    extend: 'Ext.form.Panel',
    alias: 'widget.newrequest',

    requires: [
        'TaskManager.view.NewRequestViewModel',
        'TaskManager.view.FormSpacer',
        'Ext.form.Label',
        'Ext.toolbar.Spacer',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Hidden',
        'Ext.form.action.StandardSubmit'
    ],

    config: {
        bdIdx: '',
        isEditMode: false
    },

    viewModel: {
        type: 'newrequest'
    },
    itemId: 'newRequest',
    width: '100%',
    bodyPadding: '0 30 30 30',
    header: false,
    manageHeight: false,
    baseParams: {
        
    },
    method: 'POST',
    standardSubmit: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bind: {
        title: '{uploadTitle}'
    },
    items: [
        {
            xtype: 'label',
            flex: 1,
            cls: 'requestform-space',
            itemId: 'requestTitle',
            style: {
                'font-size': '17px',
                'font-weight': 'bold'
            },
            text: 'My Label'
        },
        {
            xtype: 'formspacer',
            flex: 1
        },
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'textfield',
                    flex: 1,
                    cls: 'requestform-space',
                    itemId: 'fdSubject',
                    name: 'bd_subject',
                    bind: {
                        fieldLabel: '{title}'
                    }
                },
                {
                    xtype: 'combobox',
                    itemId: 'fdColortag',
                    margin: '0 0 0 15',
                    width: 200,
                    fieldLabel: 'Color tag',
                    labelWidth: 70,
                    name: 'bd_colortag',
                    displayField: 'colorname',
                    valueField: 'colorcode',
                    listeners: {
                        render: 'onComboboxRender'
                    },
                    listConfig: {
                        xtype: 'boundlist',
                        itemSelector: 'div',
                        itemTpl: [
                            '<tpl for=\'.\'>',
                            '    <div style=\'background-color:{colorcode};width:100%;height:100%;font-size:12px\'>{colorname}</div>',
                            '</tpl>'
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'formspacer',
            flex: 1
        },
        {
            xtype: 'container',
            itemId: 'customFieldCon',
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
        },
        {
            xtype: 'container',
            itemId: 'attachCon',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'label',
                    flex: 1,
                    cls: 'x-form-item-label-default',
                    hidden: true,
                    itemId: 'titleExistFile',
                    bind: {
                        text: '{attachedFile}'
                    }
                },
                {
                    xtype: 'container',
                    delEntry: [
                        
                    ],
                    attachedfileLength: 0,
                    flex: 1,
                    hidden: true,
                    itemId: 'existFilesCon'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    hidden: true,
                    itemId: 'attachboxHeader',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-form-item-label-default',
                            itemId: 'title',
                            bind: {
                                text: '{addAttachFile}'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            height: 24,
                            itemId: 'btnAddAttach',
                            margin: '5 2 0 0',
                            ui: 'plain-toolbar-small',
                            width: 24,
                            icon: 'resources/images/ico_plus.png',
                            listeners: {
                                click: 'onBtnAddAttachClick'
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var atcCon = button.up('#attachCon');
                                var atcs = Ext.ComponentQuery.query('filefield', atcCon);
                                if(atcs.length === 1){
                                    Ext.toast(locale.upload.noMoreDel);
                                    return;
                                }
                                atcs[atcs.length - 1].destroy();
                            },
                            height: 24,
                            itemId: 'btnAttachDell',
                            margin: '5 2 0 0',
                            ui: 'plain-toolbar-small',
                            width: 24,
                            icon: 'resources/images/ico_minus.png'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    hidden: true,
                    itemId: 'fileCon',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                },
                {
                    xtype: 'container',
                    hidden: true,
                    itemId: 'multiFileCon',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        padding: '0 0 10 0'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'selectedFileHeader',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-form-item-label-default',
                                    itemId: 'title',
                                    bind: {
                                        text: '{addAttachFile}'
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var grid = button.up('#multiFileCon').down('grid');
                                        var selected = grid.getSelectionModel().getSelection();
                                        grid.getStore().remove(selected);
                                    },
                                    height: 24,
                                    itemId: 'btnSelectedDel',
                                    margin: '5 2 0 0',
                                    ui: 'plain-toolbar-small',
                                    width: 24,
                                    icon: 'resources/images/ico_minus.png',
                                    bind: {
                                        tooltip: '{remove}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'selectedFilesCon'
                        }
                    ]
                }
            ],
            listeners: {
                render: 'onAttachConRender'
            }
        },
        {
            xtype: 'formspacer',
            margin: '5 0 0 0'
        },
        {
            xtype: 'container',
            margin: '10 0 0 0',
            padding: 5,
            style: 'background-color:#ededed;border:1px solid #cecece',
            items: [
                {
                    xtype: 'label',
                    cls: 'x-form-item-label-default',
                    margin: '10 0 0 0',
                    bind: {
                        text: '{description}'
                    }
                }
            ]
        },
        {
            xtype: 'htmleditor',
            height: 150,
            itemId: 'fdContent',
            margin: '-1 0 0 0',
            width: '100%',
            labelAlign: 'top',
            name: 'bd_content',
            enableFont: false
        },
        {
            xtype: 'hiddenfield',
            flex: 1,
            itemId: 'bdIdx',
            fieldLabel: 'Label',
            name: 'bd_idx'
        }
    ],

    onComboboxRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields:[
                {
                    name:'colorcode'
                },
                {
                    name:'colorname'
                }
            ],
            data:companyInfo.colortag
        });
        component.setStore(store);
    },

    onBtnAddAttachClick: function(button, e, eOpts) {
        var atcCon = this.down('#attachCon');
        var fileCon = atcCon.down('#fileCon');
        var childs = fileCon.items.items;
        var fileIdx = childs.length;
        /* get selected item from list */
        var wPan = getController('Main').getWestPanel();
        var grid = wPan.getActiveTab();
        var chks = grid.getSelectionModel().getSelection();
        var files = [];
        if(chks.length > 0){
            files = chks[0].get('bd_file');
        }
        var fn = files.length;
        var fName = 'file_' + (fileIdx + fn).toString();

        atcCon.down('#fileCon').add(
            {
                xtype: 'filefield',
                cls: 'requestform-space',
                itemId: 'fdAttach_' + fileIdx.toString(),
                fieldLabel: 'File',
                labelWidth:35,
                name:fName,
                listeners: {
                    render: function(component){
                        component.setFieldLabel(locale.main.file);
                        component.button.setText(locale.main.browse);
                    }
                }
            }
        );
    },

    onAttachConRender: function(component, eOpts) {
        if(isHtml5()){
            if(navigator.appName == 'Microsoft Internet Explorer' && getIEVersion() < 10){
                component.down('#fileCon').setHidden(false);
                component.down('#attachboxHeader').setHidden(false);

                /* add one fileField to set the multipart upload form*/
                component.down('#btnAddAttach').fireEvent('click');
            }
            else{
                component.down('#multiFileCon').setHidden(false);
                component.down('#multiFileCon').add(
                    {
                        xtype: 'multifileinput',
                        multiple: true,
                        itemId: 'files',
                        name:'files'
                    }
                );
            }
        }
        else{
            component.down('#fileCon').setHidden(false);
            component.down('#attachboxHeader').setHidden(false);

            /* add one fileField to set the multipart upload form*/
            component.down('#btnAddAttach').fireEvent('click');
        }
    },

    setSubject: function(value) {
        this.down('#fdSubject').setValue(value);
    },

    setRemark: function(value) {
        this.down('#fdContent').setValue(value);
    },

    setColortag: function(value) {
        this.down('#fdColortag').setValue(value);
    }

});