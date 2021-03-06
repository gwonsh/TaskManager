/*
 * File: app/view/DataGroupWindow.js
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

Ext.define('TaskManager.view.DataGroupWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.datagroupwindow',

    requires: [
        'TaskManager.view.LinkingWindowViewModel2',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.toolbar.Paging',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    config: {
        categoryId: ''
    },

    viewModel: {
        type: 'datagroupwindow'
    },
    height: 650,
    width: 850,
    bodyPadding: 20,
    bodyStyle: {
        'background-color': '#ffffff'
    },
    ghost: false,
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'listContainer',
            style: 'border:1px solid #cecece',
            layout: 'fit',
            items: [
                {
                    xtype: 'gridpanel',
                    type: 'normal',
                    itemId: 'dgGrid',
                    frameHeader: false,
                    header: false,
                    title: 'Data List',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'String'
                        }
                    ],
                    viewConfig: {
                        plugins: [
                            {
                                ptype: 'gridviewdragdrop',
                                ddGroup: 'gridData'
                            }
                        ]
                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            itemId: 'pagingToolbar',
                            width: 360,
                            displayInfo: true,
                            displayMsg: 'Data {0} - {1} of {2}',
                            items: [
                                {
                                    xtype: 'textfield',
                                    cls: 'searchbox',
                                    itemId: 'dgSearch',
                                    margin: '0 0 0 3',
                                    hideLabel: true,
                                    labelWidth: 0
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var val = button.up('pagingtoolbar').down('#dgSearch').getValue();
                                        var ctrl = getController('Main');
                                        var cId = button.up('window').relatedCategory;
                                        var query = "&se_all=" + val + '&ca_id=' + cId;
                                        ctrl.getServerData(cId, query, button.up('pagingtoolbar').up('gridpanel'));
                                    },
                                    itemId: 'findData',
                                    margin: '0 6 0 6',
                                    icon: 'resources/images/find.png'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        beforerender: 'onWindowBeforeRender'
    },

    onWindowBeforeRender: function(component, eOpts) {
        var ctrl = getController('Main');
        var rc = component.relatedCategory;
        ctrl.getServerData(rc, '&ca_id=' + rc, component.down('gridpanel'));
    }

});