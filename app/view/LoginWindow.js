/*
 * File: app/view/LoginWindow.js
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

Ext.define('TaskManager.view.LoginWindow', {
    extend: 'Ext.container.Container',
    alias: 'widget.loginwindow',

    requires: [
        'Ext.Img',
        'Ext.form.Label',
        'Ext.toolbar.Spacer',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.panel.Panel',
        'Ext.XTemplate'
    ],

    height: '100%',
    id: 'loginWin',
    itemId: 'loginWin',
    width: '100%',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'container',
            hidden: true,
            itemId: 'loginBox',
            style: {
                border: '1px solid #cecece',
                'border-radius': '12px',
                'background-color': '#ffffff'
            },
            width: 450,
            layout: {
                type: 'vbox',
                pack: 'center',
                padding: '30 40 30 40'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'image',
                            flex: 1,
                            height: 32,
                            width: 32,
                            src: 'resources/images/ico_task.png'
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            margin: '0 0 0 10',
                            style: {
                                'font-weight': 'bold',
                                'font-size': '25px'
                            },
                            text: 'Smartori Task Manager'
                        }
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 15
                },
                {
                    xtype: 'textfield',
                    itemId: 'userId',
                    width: '100%',
                    labelAlign: 'top',
                    labelWidth: 65,
                    bind: {
                        fieldLabel: '{userId}'
                    },
                    listeners: {
                        render: 'onUserIdRender'
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 3
                },
                {
                    xtype: 'textfield',
                    itemId: 'password',
                    width: '100%',
                    labelAlign: 'top',
                    labelWidth: 65,
                    inputType: 'password',
                    bind: {
                        fieldLabel: '{password}'
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 15
                },
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '8 0 0 0',
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            flex: 1,
                            height: 30,
                            itemId: 'loginButton',
                            width: 100,
                            bind: {
                                text: '{login}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            hidden: true,
            itemId: 'languageBox',
            margin: '10 0 0 0',
            items: [
                {
                    xtype: 'radiogroup',
                    items: [
                        {
                            xtype: 'radiofield',
                            itemId: 'rdKorean',
                            name: 'language',
                            boxLabel: '한국어',
                            checked: true,
                            listeners: {
                                change: 'onRdKoreanChange'
                            }
                        },
                        {
                            xtype: 'radiofield',
                            itemId: 'rdEnglish',
                            margin: '0 0 0 25',
                            name: 'language',
                            boxLabel: 'English'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            frame: true,
            height: 300,
            hidden: true,
            html: '',
            itemId: 'feedBox',
            margin: '0 0 20 0',
            maxWidth: 700,
            padding: 30,
            scrollable: {
                direction: 'vertical'
            },
            tpl: Ext.create('Ext.XTemplate', 
                '<tpl for=\'.\'>    ',
                '        <table style=\'width:100%;border-top:1px solid #cecece;border-spacing:0;margin-bottom:-1px\' border=0>',
                '            <tr>',
                '                <td style=\'padding:6px;border-bottom:1px solid #cecece;cursor:point;\'>',
                '                    <div name=\'subject\' index=\'{#}\' style=\'width:100%;float:left\'>{bd_subject}',
                '                        <span style=\'float:right;color:#357dc7;font-size:12px\'>{bd_regdate} / {bd_name}</span>',
                '                    </div>',
                '                </td>',
                '            </tr>',
                '            <tr>',
                '                <td index=\'{#}\' class=\'feedContent\' style=\'padding:5px;font-size:12px;color:#333333;display:{[this.checkCount(xindex)]};background-color:#ebf1f2\'>',
                '                    <div style=\'width:100%;height:100%;background-color:#ebf1f2\'>{bd_content}</div>',
                '                </td>',
                '            </tr>',
                '        </table>',
                '</tpl>',
                {
                    checkCount: function(index) {
                        if(index == 1){
                            val = 'block';
                        }
                        else{
                            val = 'none';
                        }
                        return val;
                    }
                }
            ),
            width: 700,
            title: '\'  \'',
            listeners: {
                afterrender: 'onFeedBoxAfterRender'
            }
        },
        {
            xtype: 'button',
            handler: function(button, e) {
                /* reset shortcuts */
                userInfo.nv_10 = "";
                /* save shortcut setting to server */
                Ext.data.JsonP.request({
                    params:userInfo,
                    url:getMemberUpdateApi(),
                    success:function(response){
                        window.location.href = document.location.href;
                    }
                });
            },
            hidden: true,
            itemId: 'initShortcuts',
            bind: {
                text: '{initShortcut}'
            }
        },
        {
            xtype: 'tbspacer',
            height: 10
        },
        {
            xtype: 'container',
            itemId: 'shortcutsBox',
            scrollable: true,
            width: '90%',
            layout: {
                type: 'hbox',
                pack: 'center'
            }
        }
    ],
    listeners: {
        beforerender: 'onLoginWinBeforeRender'
    },

    onUserIdRender: function(component, eOpts) {
        if(localStorage.getItem('userId') !== undefined){
            component.setValue(localStorage.getItem('userId'));
        }
    },

    onRdKoreanChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            localStorage.setItem('baseLanguage', 'korean');
            localLanguage = 'Korean';
            locale = languageSet.Korean;
        }
        else{
            localStorage.setItem('baseLanguage', 'english');
            localLanguage = 'English';
            locale = languageSet.English;
        }
    },

    onFeedBoxAfterRender: function(component, eOpts) {
        var header = component.getHeader();
        header.setTitle(locale.main.notice);
        var headerEl = header.el.select('.x-box-item');
        header.setIcon('resources/images/ico_mic.png');
        /* shortcut for notification detail list */
        var shortcut = {
            xtype:'button',
            text:locale.menu.seeDetail,
            style:'float:right;cursor:point:font-size:12px;border:1px solid #cecece',
            ui: 'plain-toolbar-small',
            handler:function(button){
                var info = component.getData();
                var ctlr = getController('Login');
                var scBox= ctlr.getLoginWin().down('#shortcutsBox');
                getController('Main').setShortcuts(scBox.items.items);
                ctlr.getLoginWin().destroy();
                getController('Main').createNewGrid(info[0].ca_id, locale.main.notice, 'normal');
            }
        };

        header.add(shortcut);
        /* when click title of notice show content div */
        component.el.on('click', function(e){
            if(e.target.getAttribute('name') == 'subject'){
                var index = e.target.getAttribute('index');
                var tds = component.getEl().query('.feedContent');
                var target = component.getEl().query('.feedContent[index="' + index + '"]');
                for(var i=0; i<tds.length; i++){
                    if(tds[i] == target[0]){
                        tds[i].style.display = 'block';
                    }
                    else{
                        tds[i].style.display = 'none';
                    }
                }
            }
        });
    },

    onLoginWinBeforeRender: function(component, eOpts) {
        getController('Login').sessionCheck();
    }

});