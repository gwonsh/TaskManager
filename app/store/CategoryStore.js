/*
 * File: app/store/CategoryStore.js
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

Ext.define('TaskManager.store.CategoryStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'TaskManager.model.CategoryModel',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CategoryStore',
            autoLoad: false,
            model: 'TaskManager.model.CategoryModel',
            proxy: {
                type: 'jsonp',
                api: {
                    read: getCategoryListApi(),
                    
                },
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});