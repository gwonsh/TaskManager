/*
 * File: app/view/Preference.js
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

Ext.define('TaskManager.view.Preference', {
    extend: 'Ext.window.Window',
    alias: 'widget.preference',

    requires: [
        'TaskManager.view.PreferenceViewModel',
        'Ext.form.Label',
        'Ext.container.Container',
        'Ext.form.field.Radio',
        'Ext.toolbar.Spacer',
        'Ext.form.field.ComboBox'
    ],

    viewModel: {
        type: 'preference'
    },
    height: 600,
    width: 450,
    closeAction: 'hide',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 20
    },
    bind: {
        title: '{config}'
    },
    items: [
        {
            xtype: 'label',
            bind: {
                text: '{listDisplay}'
            }
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'radiofield',
                    flex: 1,
                    itemId: 'simpleMode',
                    hideEmptyLabel: false,
                    labelWidth: 50,
                    name: 'displayMode',
                    bind: {
                        fieldLabel: '{simpleMode}'
                    }
                },
                {
                    xtype: 'radiofield',
                    flex: 1,
                    itemId: 'detailMode',
                    hideEmptyLabel: false,
                    labelWidth: 50,
                    name: 'displayMode',
                    bind: {
                        fieldLabel: '{detailMode}'
                    }
                }
            ]
        },
        {
            xtype: 'tbspacer',
            height: 13
        },
        {
            xtype: 'label',
            bind: {
                text: '{selectForm}'
            }
        },
        {
            xtype: 'combobox',
            itemId: 'fDselectForm',
            maxWidth: 380,
            labelWidth: 70,
            displayField: 'name',
            valueField: 'formId',
            listeners: {
                afterrender: 'onFDselectFormAfterRender',
                select: 'onFDselectFormSelect'
            }
        }
    ],

    onFDselectFormAfterRender: function(component, eOpts) {
        var forms = app.doc.Viewer.FORMS;
        var formData = [];
        for(var i=0; i<forms.length; i++){
            formData.push({
                name:forms[i].getName(),
                formId:forms[i].CLASSNAME,
                index:i
            });
        }
        var store = Ext.create('Ext.data.Store', {
            fields: ['name', 'formId', 'index'],
            data:formData
        });
        component.setStore(store);
    },

    onFDselectFormSelect: function(combo, record, eOpts) {
        /* form mode update to server */
        var fi = record.get('formId');
        Ext.data.JsonP.request({
            url:getCategoryUpdateApi(),
            params:{
                ca_id:selectedCategory,
                ca_option:'--formMode:' + fi
            }
        });
    }

});