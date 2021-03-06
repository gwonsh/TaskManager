/*
 * File: app/view/LinkUnit.js
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

Ext.define('TaskManager.view.LinkUnit', {
    extend: 'Ext.container.Container',
    alias: 'widget.linkunit',

    requires: [
        'TaskManager.view.LinkUnitViewModel1',
        'Ext.container.Container',
        'Ext.Img',
        'Ext.form.Label'
    ],

    config: {
        bd_idx: null
    },

    viewModel: {
        type: 'linkunit'
    },
    height: '',
    margin: '0 0 0 5',
    style: {
        border: '1px solid #cecece'
    },
    width: 80,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bind: {
        bd_idx: '{bdIdx}'
    },
    items: [
        {
            xtype: 'container',
            height: 20,
            itemId: 'header',
            style: 'text-align:right',
            items: [
                {
                    xtype: 'image',
                    height: 16,
                    itemId: 'delUnit',
                    margin: '2 0 0 0',
                    style: 'cursor:pointer',
                    width: 16,
                    src: 'resources/images/ico_minus.png',
                    listeners: {
                        render: 'onDelUnitRender'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            height: 80,
            itemId: 'image',
            style: {
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'background-color': 'white'
            },
            width: 80
        },
        {
            xtype: 'label',
            bind: {
                text: '{unitTitle}'
            }
        }
    ],

    onDelUnitRender: function(component, eOpts) {
        var unit = component.up('container').up('container');
        component.el.on('click', function(){
           unit.destroy();
        });
    },

    hideHeader: function() {
        this.down('#header').setHidden(true);
    }

});