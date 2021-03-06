/*
 * File: app/view/LinkedData.js
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

Ext.define('TaskManager.view.LinkedData', {
    extend: 'Ext.container.Container',
    alias: 'widget.linkeddata',

    requires: [
        'TaskManager.view.LinkedDataViewModel',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'linkeddata'
    },
    width: '100%',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'label',
                    flex: 1,
                    baseCls: 'x-form-item-label-default',
                    itemId: 'linkFieldTitle'
                },
                {
                    xtype: 'button',
                    height: 80,
                    itemId: 'addLink',
                    ui: 'plain-toolbar-large',
                    width: 80,
                    icon: 'resources/images/big_plus.png',
                    scale: 'large'
                }
            ]
        }
    ],

    setFieldLabel: function(str) {
        var label = this.down('#linkFieldTitle');
        label.setText(str);
    }

});