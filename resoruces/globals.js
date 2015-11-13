/* Application name */
var appName = 'TaskManager';
var app;
var pluginId;
var domain = '';

if(document.location.hostname != 'localhost'){
    domain = 'http://' + document.location.hostname;
}
else{
    //     domain = 'http://smartdb.kr';
    domain = 'http://data.samwoodtp.com';
    //     domain = "http://samsung.dipol.co.kr";
}

var selectedCategory;

var sessionId;
/* for language setting */
var locale;
/* loged in uer info */
var userInfo;
/* current CategoryName */
var categoryName = '';

/* company information */
var companyInfo = '';
/* in case exists auto number field  */
var indexFieldId;

function getController(cName){
    var ctlr = eval(appName).app.getController(cName);
    return ctlr;
}

function getLoginApi(userId, password){
    return getDomain() + "/json/login";
}

function getDomain(){
    return domain;	
}

function getMemberViewApi(){
    return getDomain() + '/json/memberView';
}
function getMemberUpdateApi(){
    return getDomain() + '/json/memberUpdate';
}

/* 특정 카테고리정보는 id 받아서처리 아니면 고정 카테고리 id사용 */
function getCategoryViewApi(cId){
    if(cId === undefined) cId = '';
    return getDomain() + "/json/cateView?ca_id=" + cId;
}

function getCategoryListApi(){
    return domain + "/json/cateList?";
}
function getCategoryUpdateApi(){
    return domain + '/json/cateAddUpdate';
}
function getCategoryOptionUpdateApi(){
    return domain + '/cateOptionUpdate';
}
/**
 * @params ca_id category id
 * @params page current page number
 * @params page_size number of data per page
 * @params se_all searching for though all  
 * @params se_subject serching by subject
 * @params se_content serching by description
 * @params se_colortg searching by colortag
 * @params se_user_id serching by an user
 * @params se_user_name searching by an user name
 */

function getDataListByIdApi(query, isSimpleMode){
    if(query === undefined || query === '') query = '&ca_id=' + selectedCategory;
    var val = domain + "/json/list?" + query;
    if(isSimpleMode){
        val += '&o=s';
    }
    return val;
}

function getDataListByCodeApi(code, query, isSimpleMode){
    if(query === undefined) query = '';
    pluginId = code;
    var val = domain + "/json/list?ca_code=" + code + query;
    if(!isSimpleMode){
        val += '&o=s';
    }  
    return val;
}
/**
 * @params bd_idx code of row 
 * @params ca_id category id
 * @params ca_code category code 
 * @params html [0] toggle if use html format
 */

function getDataWriteApi(){
    return domain +'/json/write';
}

/**
 * @params bd_idx code of row 
 */
function getCommentListApi(idx){
    return domain + "/json/Comment"; 
}

/**
 * @params bd_idx row code of data list 
 * @params cmt_idx row code of comment list
 */
function getCommentViewApi(idx){
    return domain + "/json/CommentView"; 
}

/**
 * @params bd_idx row code of data list 
 * @params cmt_idx row code of comment list
 * @params cmt_content comment
 * @params cmt_name name in case of nonmember
 * @params cmt_passowrd password in case of nonmember
 */
function getCommentUpdateApi(){
    return domain + "/json/CommentUpdate"; 
}

/**
 * @params bd_idx row code of data list 
 * @params cmt_idx row code of comment list
 */
function getCommentDeleteApi(idx){
    return domain + "/json/CommentDel"; 
}
/**
 * @params bd_idx row code to delete
 */
function getDeleteDataApi(){
    return domain + "/json/delete";
}

/**
 * @params bd_idx row code of data list 
 * @params data_xxxx field idx, xxxx means field id
 *
 * for dataset field
 * value of data_is bd_idxs of sub category
 * ex) data_0027=,,&cols_data_0028=1&cols_data_0029=2&cols_data_0030=3//new post
 * ex) data_xxxx=970, 971, 972
 * data_idx=,,, in update mode
 * cols_data_xxxx data in each dataset column (values are separeted by ',')
 * ex) cols_data_xxxx=val1,val2,val3&cols_data_yyyy=val4,val5,val6
 */

function getUpdateApi(){
    return getDomain() + '/json/addUpdate';
}
function getViewApi(){
    return getDomain() + '/json/view';
}
function getSessionApi(){
    return getDomain() + '/json/session';
}
function getLogoutApi(){
    return getDomain() + '/json/logout';
}
function getUpdateApprovalApi(){
    return getDomain() + '/json/approval';
}

var languageSet = {
    English:{
        login:{
            initShortcut:'Reset shortcuts',
            loginInfo:'The ID or the password is incorrect',
            login:'LOGIN',
            password:'Password',
            userId:'User ID'
        },
        menu:{
            clear:'Clear',
            close:'Close',
            copy:'Copy',
            download:'Download attached files',
            edit:'Edit',
            editable:'Editable/Uneditable',
            isEditable:'Activate the edit mode',
            newPost:'New',
            remove:'Remove',
            seeDetail:'See details',
            setting:'Setting',
            uneditable:'Deactivate the edit mode',
            update:'Update'
        },
        main:{
            add:'Add',
            attachFile:'Attachment',
            basicInfo:'Basic info.',
            browse:'Browse',
            canceled:'Canceled',
            category:'Category',
            caution:'Caution',
            commentList:'Comment list',
            complete:'Save',
            config:'Preference',
            copied:'copy complete',
            delAlert:'Are you sure? It can not be recovered',
            description:'Description:',
            download:'Download',
            dropHere:'Double click or drag and drop here to link',
            duplicated:'This data has been already added',
            editable:'Activated the edit mode, click an item to edit',
            emptyItem:'Select one',
            file:'File',
            gridTitle:'Data list',
            message:'Message',
            name:'Name',
            networkProblem:'Network connection has a problem',
            newComment: 'Leave comment', 
            noComment:'You comment nothing',
            noData:'No data found in this category',
            noPermission:'You have no permission to delete or edit it',
            nothingToPrint:'Nothing selcectd to print',
            notice:'Notification',
            ok:'OK',
            onlyNumber:'It allows only with numbers ',
            permissionError:'Permission Error',
            pluginIntro:'Click an item that you want to see the details from the list',
            pluginName:'Task Manager',
            preview:'View',
            printIt:'Print',
            referenceCategory:'Category',
            refImageTitle: 'Attachement',
            refresh:'Refresh',
            regDate:'Date',
            reset:'Reset',
            saveClose:'Save and Close',
            showImage:'Show image',
            submitComment:'Submit',
            title:'Title',
            user:'User'
        },
        upload:{
            addAttachFile:'Add attachment:',
            addRow:'Add a row',
            attachedFile:'Attached File:',
            autoText:'Input a letter that included',
            cancel:'Cancel',
            cellEditTip:'Press Enter key to save, Press ESC key to cancel',
            delRow:'Remove the selected row',
            delAllRow:'Remove all row',
            edited:'it updated successfully',
            entry:'Insert',
            fileName:'File name',
            fileSize:'File size',
            image:'Image',
            imageTooBig:'Image size is too big to display. It will show by small size or download it',
            modified:'Last Modified',
            noMoreDel:'No more column to delete',
            noneSelected:'Selected nothing to do',
            option1:'1st option',
            option2:'2nd option', 
            pleaseWait:'Plese wait while uploading...',
            posted:'Submit complete',
            selectFirstOption:'Please select the first option',
            selectSecondOption:'Are you sure that uploading without the second option?',            
            submit:'Submit',
            uploadTitle:' - New document',
            uploadTitleInEdit:' - Edit document'
        },
        config:{
            changeShortcut:'Change shortcut',
            config:'Setting Shorcuts',
            detailMode:'Detail list',
            listDisplay:'How to show the data list',
            noShortcut:'No shortcut found, please create shortcut by Setting Shorcuts menu',
            selectForm:'Select a form for current category',
            simpleMode:'Simple list'
        },
        search:{
            detailSearch:'Detail Search',
            from:'From',
            fromAll:'With all categroy',
            fromCurrent:'Within selected category',
            month:'Month',
            monthly:'By year/By Month',
            nothingToSearch:'Noting to search',
            search:'Search',
            to:'To',
            year:'Year',
            yearRequired:'Select year first'
        },
        viewer:{
            byImage:'By Image',
            defaultView:'Default',
            gallery:'Gallery',
            noPower:'You do not have enough permissions',
            simpleList:'Simple list'
        }
    },
    Korean:{
        login:{
            initShortcut:'바로가기 초기화',
            loginInfo:'아이디 또는 패스워드가 올바르지 않습니다.',
            login:'로그인',
            password:'패스워드',
            userId:'아이디'
        },
        menu:{
            clear:'초기화',
            close:'닫기',
            copy:'자료복사',
            edit:'수정',
            editable:'수정모드/보호모드',
            download:'첨부파일 다운로드',
            isEditable:'수정모드가 활성화 됐습니다.',
            newPost:'새로 작성',
            remove:'삭제',
            seeDetail:'자세히보기',
            setting:'설정',
            uneditable:'보호모드가 활성화 됐습니다.',
            update:'업데이트'
        },        
        main:{
            add:'추가',
            attachFile:'첨부파일',
            basicInfo:'기본정보',
            browse:'찾아보기',
            canceled:'취소 됐습니다.',
            category:'카테고리',
            caution:'주위',
            commentList:'댓글목록',
            complete:'완료',
            config:'설정',
            copied:'복사 되었습니다.',
            delAlert:'삭제된 내용은 복구 될 수 없습니다. 삭제 하시겠습니까?',
            description:'내용:',
            download:'다운로드',
            dropHere:'링크할 데이터를 두번 클릭하거나 끌어서 여기에 놓으세요',
            duplicated:'이미 추가 된 데이터 입니다.',
            editable:'수정모드가 활성화 됐습니다. 수정할 항목을 클릭 하세요',
            emptyItem:'선택',
            file:'파일',
            gridTitle:'자료목록',
            message:'메시지',
            name:'이름',
            networkProblem:'넷트웍 연결에 문제가 있습니다.',
            newComment: '새댓글 작성', 
            noComment:'작성한 댓글이 없습니다.',
            noData:'현재 카테고리에는 데이터가 없습니다.',
            noPermission:'글을 삭제하거나 변경하기 위한 권한이 부족합니다.',
            nothingToPrint:'인쇄할 내용이 없습니다.',
            notice:'알림',
            ok:'확인',
            onlyNumber:'숫자만 입력 가능합니다.',
            permissionError:'권한없음',
            pluginIntro:'내용을 보려면 해당 아이템을 클릭 하세요',
            pluginName:'Task Manager',
            preview:'내용보기',
            printIt:'인쇄',
            referenceCategory:'카테고리',
            refImageTitle: '첨부',
            refresh:'새로고침',
            regDate:'입력일',
            reset:'리셋',
            saveClose:'저장후 닫기',
            showImage:'이미지보기',
            submitComment:'댓글 올리기',
            title:'제목',
            user:'등록자'            
        },
        upload:{
            addAttachFile:'첨부파일 추가:',
            addRow:'열추가',
            attachedFile:'첨부된 파일:',
            autoText:'포함된 글자 입력 후 아래 방향키 사용',
            cancel:'취소',
            cellEditTip:'Enter 키를 누르면 적용, ESC를 누르면 취소',
            edited:'수정 됐습니다.',
            entry:'입력',
            delAllRow:'모든 열 제거',
            delRow:'선택된 열 제거',
            fileName:'파일명',
            fileSize:'파일크기',
            image:'이미지',
            imageTooBig:'이미지가 표시하기에 너무 커서 작게 표시합니다. 원본은 다운로드해서 보시기 바랍니다.',
            linkWindowTitle:'링크할 자료를 선택',  
            modified:'마지막 수정일',
            noMoreDel:'더 이상 삭제할 수 없습니다.',
            noneSelected:'선택된 아이템이 없습니다.',      
            option1:'첫째조건',
            option2:'둘째조건', 
            pleaseWait:'업로드 중입니다. 잠시만 기다려 주세요...',
            posted:'등록 됐습니다.',
            selectFirstOption:'첫번째 조건을 선택 해 주세요',
            selectSecondOption:'두번째 조건 없이 첫번째 값만 입력 하시겠습니까?',
            submit:'등록',
            uploadTitle:'새글작성',
            uploadTitleInEdit:'수정'
        },        
        config:{
            changeShortcut:'바로가기 변경',
            config:'바로가기설정',
            detailMode:'자세히',
            listDisplay:'자료목록 표시방법',
            noShortcut:'설정된 바로가기가 없습니다. 바로가기설정 메뉴를 클릭하여 만들수 있습니다.',
            selectForm:'현재 카테고리 양식 선택',
            simpleMode:'간단히'
        },
        search:{
            detailSearch:'상세검색',
            from:'부터',
            fromAll:'모든 카레고리에서',
            fromCurrent:'선택된 카테고리내에서',
            month:' 월',
            monthly:'연도별/월별',
            nothingToSearch:'검색할 내용이 없습니다.',
            search:'검색',
            to:'까지',  
            year:'년도',
            yearRequired:'연도 먼저 선택해 주세요'
        },
        viewer:{
            byImage:'이미지 강조',
            defaultView:'기본',
            gallery:'갤러리',
            noPower:'결재 권한이 없습니다.',
            simpleList:'단순나열'
        }        
    }
};

var userLanguage = navigator.language;//Chrome
if(userLanguage === undefined){
    userLanguage = navigator.userLanguage; //IE
}
userLanguage  = userLanguage.slice(0, 2);

var localLanguage;
if(userLanguage == 'ko'){
    localLanguage = 'Korean';
}
if(userLanguage == 'en'){
    localLanguage = 'English';
}

// localLanguage = 'English';
locale = languageSet[localLanguage]; //globals.js의 locale에 저장
function callLanguagePack(type, name) {
    var value = locale[type][name];
    return value;
}

function setKoreanFormat(){
    submitDateFormat = 'Y/m/d';
    if (Ext.Date) {
        Ext.Date.monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

        Ext.Date.getShortMonthName = function(month) {
            return "" + (month + 1);
        };

        Ext.Date.monthNumbers = {
            "1월": 0,
            "2월": 1,
            "3월": 2,
            "4월": 3,
            "5월": 4,
            "6월": 5,
            "7월": 6,
            "8월": 7,
            "9월": 8,
            "10월": 9,
            "11월": 10,
            "12월": 11,
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4,
            "6": 5,
            "7": 6,
            "8": 7,
            "9": 8,
            "10": 9,
            "11": 10,
            "12": 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, name.length - 1)];
        };

        Ext.Date.dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 1);
        };

        Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '오전' : '오후')";

        Ext.form.DateField.prototype.format = 'Y/m/d';
        Ext.form.DateField.prototype.submitFormat = 'Y/m/d';
    }
}


Ext.define('CateModel', {
    extend: 'Ext.data.Model',
    fields:[
        {name:'title'},
        {name:'lazy'},
        /* category id to expand tree automactically when click expand icon */
        /* cateList?node = 'id' */
        {
            name:'id',
            mapping:'data.id'
        },
        {
            name:'text',
            mapping:'title'
        },
        /* check if need to show the expand icon  */
        {
            name:'leaf',
            convert:function(v, record){
                return (record.get('lazy') === false);
            }
        }
    ]
});
function isHtml5(){
    var canvasEl = document.createElement('canvas'); //create the canvas object
    value = true;
    if(!canvasEl.getContext){
        value = false;
    }
    return value;
}

function getIEVersion() {    
    var rv = 100; // Return value assumes failure.    
    if (navigator.appName == 'Microsoft Internet Explorer') {        
        var ua = navigator.userAgent;        
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
        if (re.exec(ua) !== null)            
            rv = parseFloat(RegExp.$1);    
    }   
    return rv; 
} 


function randomString(len, bits) {
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
}

/* override the sliding speed of Toast */
Ext.override(Ext.window.Toast, {
    slideInDuration: 200
});
/* Preference window */
var preference;
var config = {};
