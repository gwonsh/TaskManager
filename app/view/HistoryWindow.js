/*
 * File: app/view/HistoryWindow.js
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

Ext.define('TaskManager.view.HistoryWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.historywindow',

    requires: [
        'TaskManager.view.HistoryWindowViewModel',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column'
    ],

    viewModel: {
        type: 'historywindow'
    },
    height: 768,
    itemId: 'historyWindow',
    width: 1024,
    layout: 'border',
    ghost: false,
    modal: true,

    bind: {
        title: '{history}'
    },
    items: [
        {
            xtype: 'container',
            region: 'north',
            height: 37,
            itemId: 'historyHeader',
            style: 'background-color:#f5f5f5;border-bottom:1px solid #cccccc',
            items: [
                {
                    xtype: 'checkboxfield',
                    itemId: 'showChanged',
                    margin: '8 20 0 0',
                    style: 'float:right',
                    checked: true,
                    bind: {
                        boxLabel: '{activateChanged}'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            flex: 1,
            region: 'west',
            split: true,
            autoShow: true,
            itemId: 'historyGrid',
            bodyStyle: {
                'background-color': '#999999'
            },
            header: false,
            bind: {
                title: '{historyList}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'string',
                    text: 'String'
                }
            ]
        },
        {
            xtype: 'panel',
            flex: 3,
            region: 'center',
            split: true,
            itemId: 'historyViewer',
            scrollable: true,
            animCollapse: false,
            collapseDirection: 'right',
            collapsed: true,
            collapsible: true
        }
    ]

});