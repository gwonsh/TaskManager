/*
 * File: app/controller/Login.js
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

Ext.define('TaskManager.controller.Login', {
    extend: 'Ext.app.Controller',

    refs: {
        loginWin: '#loginWin',
        shortcuts: '#shortcuts'
    },

    control: {
        "#loginButton": {
            click: 'onLoginButtonClick'
        }
    },

    onLoginButtonClick: function() {
        me = this;
        var usrVal = this.getLoginWin().down('#userId').getValue();
        var pasVal = this.getLoginWin().down('#password').getValue();
        Ext.data.JsonP.request({
            url:getLoginApi(),
            params:{
                nv_id:usrVal,
                nv_pass:pasVal
            },
            success:function(response){
                if(response.result){
                    localStorage.setItem('userId', usrVal);
                    me.sessionCheck();
                }
                else{
                    alert(locale.login.loginInfo);
                }
            },
            failure:function(response){
                alert('Network connection problem');
            }

        });
    },

    sessionCheck: function() {
        var me = this;
        Ext.data.JsonP.request({
            url:getSessionApi(),
            success:function(response){
                if(response.nvm_id !== '' && response.nvm_id !== undefined){
                    sessionId = response.nvm_id;
                    me.onLoginSuccess();
                }
                else{
                    me.getLoginWin().down('#loginBox').show();
                    me.getLoginWin().down('#languageBox').show();

                }
            }
        });
    },

    onLoginSuccess: function() {
        var me = this;
        var fdBox= me.getLoginWin().down('#feedBox');
        var scBox= me.getLoginWin().down('#shortcutsBox');
        if (localLanguage == 'Korean') setKoreanFormat();
        if(window.localStorage.getItem('isSimpleMode') === null){
            window.localStorage.setItem('isSimpleMode', true);
        }

        /* get conmpany information */
        Ext.data.JsonP.request({
            url:domain + '/json/site',
            success:function(response){
                companyInfo = response.siteConfig;
                /* newsfeed list */
                Ext.data.JsonP.request({
                    url:getDataListByCodeApi('pi_feed', ''),
                    success:function(response){
                        if(response.binderList.length !== 0){
                            fdBox.setData(response.binderList);
                            fdBox.show();
                        }
                    }
                });
            }
        });

        /* create category tree */
        var ctStore = Ext.getStore('CategoryStore');
        ctStore.on('load', function onStoreLoad(store){
            store.un('load', onStoreLoad);
            /* hide log in form */
            me.getLoginWin().down('#loginBox').setHidden(true);
            me.getLoginWin().down('#languageBox').setHidden(true);
            /* diplay shortcuts */
            scBox.setHidden(false);
            me.getLoginWin().down('#initShortcuts').setHidden(false);


            /* load user Info */
            Ext.data.JsonP.request({
                params:{
                    nvm_id:sessionId
                },
                url:getMemberViewApi(),
                success:function(response){
                    userInfo = response.member;


                    /* reset shortcuts */
        //             userInfo.nv_10 = "";
        //             /* save shortcut setting to server */
        //             Ext.data.JsonP.request({
        //                 params:userInfo,
        //                 url:getMemberUpdateApi(),
        //                 success:function(response){
        //                     Ext.toast(locale.upload.posted);
        //                     window.location.href = document.location.href;
        //                     scWin.close();
        //                 }
        //             });
        //             return;

                    /* the private information of shortcuts set */
                    var val = response.member.nv_10;
                    var scConfig = eval('(['+ val + '])');
                    var userShortcuts = [];
                    /* shorcut for customer choose */
                    if(scConfig.length === 0 || scConfig === null || scConfig === undefined || val === null){
                        var tipWin = Ext.create('Ext.window.Window', {
                            padding:20,
                            width:450,
                            height:140,
                            html:locale.config.noShortcut
                        }).show();
                    }
                    else{
                        Ext.Array.each(scConfig, function(entry){
                            var scId = 'shortcut_' + entry.ca_id;
                            var scUnit = Ext.create(appName + '.view.Shortcut', {
                                margin:'0 0 9 9',
                                itemId:scId,
                                listeners:[
                                    {
                                        click:function(){
                                            selectedCategory = entry.ca_id;
                                            categoryName = entry.ca_name;
                                            var ctlr = getController('Main');
                                            ctlr.createNewGrid(entry.ca_id, entry.ca_name, entry.displayType);
                                            /* do not execute whecn click from mainView header */
                                            if(me.getLoginWin() !== undefined){
                                                /* set shortcut at mainView header */
                                                ctlr.setShortcuts(scBox.items.items);
                                                me.getLoginWin().destroy();
                                            }
                                        }
                                    }
                                ]
                            });

                            var scInfo = {
                                piSrc:entry.src,
                                ca_id:entry.ca_id,
                                ca_name:entry.ca_name,
                                displayType:entry.displayType
                            };
                            scUnit.getViewModel().setData(scInfo);
                            /* save config infos to globals.js to use when setting shortcuts window opens */
                            userShortcuts.push(scInfo);
                            scBox.add(scUnit);
                        });
                    }

                    /* shorcut to smartori */
                    var scSmartori = Ext.create(appName + '.view.Shortcut', {
                        margin:'0 0 0 9',
                        listeners:[
                            {
                                click:function(){
                                    var openNewWindow = window.open("about:blank");
                                    openNewWindow.location.href = domain;
                                }
                            }
                        ]
                    });
                    scSmartori.getViewModel().setData({
                        piSrc:'resources/images/pi_smartori.png',
                        ca_name:'Smartori'
                    });
                    scBox.add(scSmartori);

                    /* shortcut for setting shortcuts */
                    var configIcon = Ext.create(appName + '.view.Shortcut', {
                        margin:'0 0 0 9',
                        isDefault:true,
                        listeners:[
                            {
                                click:function(){
                                    /* used afterrender #categoryTree at setShortcuts of Config controller  */
                                    getController('Config').setShortcuts(userShortcuts);
                                }
                            }
                        ]
                    });
                    configIcon.getViewModel().setData({
                        piSrc:'resources/images/pi_config.png',
                        ca_name:locale.config.config
                    });
                    scBox.add(configIcon);
                }
            });
        });
        ctStore.load();
        var tree = getController('Main').getEastPanel().down('#categoryTree');
        tree.setStore(ctStore);

        // Kakao.init('3e49309edb7446888986ec8a38ac5eaf');
        // console.log('kakao');
        // Kakao.Auth.createLoginButton({
        //     container: scBox.el.dom,
        //     success: function(authObj) {
        //         var refreshToken = Kakao.Auth.getRefreshToken();
        //         Kakao.Auth.setAccessToken(authObj.access_token);
        //         Ext.data.JsonP.request({
        //             url:'https://kapi.kakao.com/v1/user/ids',
        //             Autohorization:'35e4c76b343153cd5c8906482c5aee42',
        //             success:function(result){

        //             },
        //             fallure:function(err){

        //             }
        //         });
        //     },
        //     fail: function(err) {
        //         alert(JSON.stringify(err));
        //     }
        // });
    },

    viewNoticeFile: function(bdFile) {
        var imgUrl = bdFile.getAttribute('attached');
        imgUrl = imgUrl.replace('/file/', '/thumb/');
        var atWin = Ext.create('Ext.window.Window', {
            scrollable:true,
            ghost:false,
            modal:true,
            padding:'25',
            items:[
                {
                    xtype:'image',
                    src:imgUrl,
                    listeners:[
                        {
                            render:function(image){
                                image.getEl().on('load', function(e, target){
                                    image.setWidth(Ext.get(target).getWidth());
                                    image.setHeight(Ext.get(target).getHeight());
                                });
                            }
                        }
                    ]
                }
            ]
        }).show();
    }

});
