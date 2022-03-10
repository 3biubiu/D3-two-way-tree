import Config from "@/config.js";
import {Message,Notice} from 'view-design';
import Cookies from 'js-cookie';

let utils = {

};

/**
 * 判断某个人是否拥有某个权限
 *
 * @param {array} authList 权限数组
 * 
 * @param {string} oneAuth 一个权限
 * 
 * @return true|false
 */
utils.codeStatus = (authList, oneAuth) => {
    let status = false;
    if (!oneAuth && !authList) return;
    if (oneAuth == '') {
        status = true;
    }
	else if (authList.indexOf(oneAuth, 0) >= 0) {
        status = true;
    }else if(oneAuth && oneAuth.indexOf(',') > -1){
        let arr = oneAuth.split(',');
        for(let i in arr){
            if(authList.indexOf(arr[i]) > -1){
                status = true
            }
        }
    }
    return status;
}

/**
 * post 方式下载文件
 *
 * @param {string} url 地址
 * 
 * @param {array} data [1,2,3,4]要导出的数据的id
 * 
 * @param {string} token 
 * 
 */
utils.downloadPost = (url, data,token) => {
    const form = document.createElement('form');
    form.action = `${Config.apiUrl}/${url}`;
    form.setAttribute = `${token}`;
    form.method = 'post';
    form.style.display = 'none';
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            for (var i = 0; i < data[key].length; i++) {
                const input = document.createElement('input');
                input.name = `${key}[]`;
                input.value = data[key][i];
                form.appendChild(input);
            }
        } else {
            const input = document.createElement('input');
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }
        
    });
    const button = document.createElement('input');
    button.type = 'submit';
    form.appendChild(button);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

utils.checkImg = function (filename) {
    const imgSuff = ['.jpeg', '.gif', '.jpg', '.png'];
    for (var i = imgSuff.length - 1; i >= 0; i--) {
        if (filename.indexOf(imgSuff[i]) != -1) {
            return true;
        }
    }
    return false;
}

/**
 * 获取字符型日期的开始时间（时间戳）或结束时间（时间戳）
 *
 * @param {string} stringTime 字符型日期
 * 
 * @param {string} type 开始时间(start)或结束时间(end)
 * 
 * @return {时间戳}
 */
utils.timeDiff = (stringTime,type) => {
    let timestamp2 = "";
    if(type == 'start'){
        timestamp2 = Date.parse(new Date(stringTime).toUTCString()) /1000;
    }else if(type == 'end'){
        timestamp2 = Date.parse(new Date(stringTime))/ 1000;
    }
    return timestamp2
}

/**
 * 日期时间----->时间戳
 *
 * @param {string} stringTime 字符型日期
 * 
 * @return 时间戳
 */
utils.deteDiff = stringTime => {
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    return timestamp2
}

/**
 * 时间戳----->时间
 * 
 * @param timestamp  时间戳
 * 
 * @returns 格式化的时间
 */
utils.timestampToTime = timestamp =>{
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}

/**
 * 对要提交的数据进行过滤（过滤了没有值得数据）
 * 
 * @param searchData  搜索数据，  
 * 
 * @param submitData  提交的数据，  
 * 
 * @returns 过滤后的的数据
 */
utils.filterSearchData = (searchData,submitData) =>{
    for(let key in searchData){
        if(searchData[key]){
            submitData[key] = searchData[key]
        }
      }
    return submitData;
}

/**
 * 验证身份证
 * 
 * @param {String} 输入身份证号
 * 
 * @return {Boolean} 验证状态 true为正确身份证号
 */
utils.isCard = (card)=> {
    var patrn = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!patrn.exec(card)) {
      return false;
    } else {
      return true;
    }
}

utils.notice = (content, action = 'warning', duration = 2) => {
    let config = {};
    config.duration = duration;
    config.content = content;
    switch (action) {
        case 'info':
            return Message.info(config);
        case 'success':
            return Message.success(config);
        case 'error':
            return Message.error(config);
        case 'loading':
            return Message.loading(config);
        default:
            return Message.warning(config);
    }
}

utils.message = (content, action = 'warning', duration = 2) => {
    let config = {};
    config.title = content.title;
    config.desc = content.desc || '';
    switch (action) {
        case 'open':
            return Notice.open(config);
        case 'info':
            return Notice.info(config);
        case 'success':
            return Notice.success(config);
        case 'error':
            return Notice.error(config);
        default:
            return Notice.warning(config);
    }
};

/**
 * 获取当前单位类型名
 *
 * @param type 单位类型id
 *
 * @date 2018-8-10 10:20:54
 *
 * @return string
 */
utils.getCompanyTypeName = type => {
    let name = "";
    switch (type){
        case "1":
            name = "各级政府";
            break;
        case "2":
            name = "产业园区";
            break;
        case "3":
            name = "商业项目";
            break;
        case "4":
            name = "写字楼项目";
            break;
        case "5":
            name = "其他单位";
            break;
        case "6":
            name = "服务机构";
            break;
        case "7":
            name = "品牌商家";
            break;
        case "8":
            name = "工业地产";
            break;
        case "9":
            name = "渠道（公司机构）";
            break;
        case "10":
            name = "渠道（个人）";
            break;
        case "11":
            name = "职能部门";
            break;
        default:
            name = "";
            break;
    }
    return name;
};

/**
 * 验证是否是手机号（以1开头，11位）
 *
 * @date 2018-08-13
 *
 * @param {int} phone 手机号
 *
 * @return bool
 */
    utils.isPhoneNum = (phone) => {
    let myreg=/^[1][0-9]{10}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
};

/**
 * 判断用户是否具有某些权限
 *
 * @param {string} authName 权限名数组
 * @param {int} type 类型1-基础权限，2-继承权限
 *
 * @date 2018-8-14 14:40:37
 *
 * @return {bool}
 */
utils.judgeAuth = (authName = [],type = 1) => {
    let res = false ;
    let list = JSON.parse(localStorage.getItem("_tanikawa_user_"+Cookies.get('uid')+"_auth"));
    if(!list){
        return res;
    }
    let AuthList;
    if(authName.length > 0 ){
        switch(type){
            case 1 :
                if(!list.basic){
                    return res;
                }
                AuthList = list.basic;
                if(!AuthList || AuthList.length<=0){
                    return res;
                }
                //取交集判断是否等于待判断的
                if([...new Set([...new Set(authName)].filter(x=>new Set(AuthList).has(x)))].sort().toString() === authName.sort().toString()){
                    res =  true
                }
                break;
            case 2 :
                if(!list.other){
                    return res;
                }
                AuthList = list.other;
                //TODO 继承权限的判断待补全[这块我看了下暂时用不到继承权限的判断]
                break;
            default:
                break;
        }
    }else{
        res = true;
    }

    //假结果，测试用
    // res = true;

    return res;
};

/**
 * 清空cookie 比如退出操作
 */
utils.clearUserCookie = () => {
    Cookies.remove('uid');
    Cookies.remove('token');
    Cookies.remove('theOne');
    localStorage.clear();
};
/**
 * 正则表达式去域名
 * @param {string} str 待操作的字符串
 * @returns {string}
 */
utils.removeDomain = (str = "")=>{
    if(str === ""){
        return str;
    }
    let pre =/^http(s)?:\/\/(.*?)\//;
    str = str.replace(pre,"");
    return "/"+str;
};

/**
 * 获取当前用户使用的浏览器内核版本之打倒IE浏览器
 * @returns {string}
 */
utils.getBrowserVersion = ()=>{
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    let isIE=window.ActiveXObject || "ActiveXObject" in window
    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1&&!isEdge; //判断Chrome浏览器

    if (isIE)
    {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        // reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if(userAgent.indexOf('MSIE 6.0')!=-1){
            return "IE6";
        }else if(fIEVersion == 7)
        { return "IE7";}
        else if(fIEVersion == 8)
        { return "IE8";}
        else if(fIEVersion == 9)
        { return "IE9";}
        else if(fIEVersion == 10)
        { return "IE10";}
        else if(userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)){
            return "IE11";
        }
        else
        { return "IE"}//IE版本过低
    }//isIE end

    if (isFF) { return "FF";}
    if (isOpera) { return "Opera";}
    if (isSafari) { return "Safari";}
    if (isChrome) { return "Chrome";}
    if (isEdge) { return "Edge";}
};

/**
 * 通过传入的类型获取项目详情页跳转路由name
 *
 * @param {string} type 项目类型1：土地，2：厂房，3：商业，4：写字楼，5：注册，6：客户，7：仓库，10：其他’|路由name,
 * @param {string} model 输出结果 "route" 输出路由名,"num":数据对应值
 *
 * @date 2018-10-8 15:39:46
 *
 * @return {string}
 */
utils.getItemDetailUrl = (type,model="route")=>{
    let obj = {
        "1"     :   "land-item-all-detail",
        "2"     :   "factory-item-all-detail",
        "3"     :   "business-item-all-detail",
        "4"     :   "building-item-all-detail",
        "5"     :   "register-item-all-detail",
        "6"     :   "customer-item-all-detail",
        "7"     :   "repertory-item-all-detail",
        "10"    :   "other-item-all-detail",
    };
    let res = "";
    switch (model){
        case "route":
            res = obj[type] ? obj[type] : "/";
            break;
        case "num":
            for(let i in obj){
                if(obj[i] === type){
                    res = i;
                    break;
                }
            }
            break;
        default:
            break;
    }
    return res;
};

/**
 * 通过传入的类型获取载体详情页跳转路由name
 *
 * @param {string} type 项目类型1：土地，2：厂房，3：商业，4：写字楼，5：注册，6：客户，7：仓库，10：其他’|路由name,
 * @param {string} model 输出结果 "route" 输出路由名,"num":数据对应值
 *
 * @date 2018-12-13 18:54:25
 *
 * @return {string}
 */
utils.getCarrierDetailUrl = (type,model="route")=>{
    let obj = {
        "1"     :   "land-carrier-all-detail",
        "2"     :   "factory-carrier-all-detail",
        "3"     :   "business-carrier-all-detail",
        "4"     :   "building-carrier-all-detail",
        "5"     :   "register-carrier-all-detail",
        "6"     :   "customer-carrier-all-detail",
        "7"     :   "repertory-carrier-all-detail",
        "10"    :   "other-carrier-all-detail",
    };
    let res = "";
    switch (model){
        case "route":
            res = obj[type] ? obj[type] : "/";
            break;
        case "num":
            for(let i in obj){
                if(obj[i] === type){
                    res = i;
                    break;
                }
            }
            break;
        default:
            break;
    }
    return res;
};

/**
 * 通过文件后缀名获取对应font-awesome图标
 *
 * @param {string} ext 文件后缀名（推荐小写）
 *
 * @date 2018-10-11 10:19:12
 *
 * @returns {string}
 */
utils.getIconByFileType = (ext="")=>{
    let res = "";
    switch(ext.toLowerCase()){
        case "txt":
            res = "fa-file-text-o";
            break;
        case "jpg":
            res = "fa-file-image-o";
            break;
        case "gif":
            res = "fa-file-image-o";
            break;
        case "png":
            res = "fa-file-image-o";
            break;
        case "doc":
            res = "fa-file-word-o";
            break;
        case "docx":
            res = "fa-file-word-o";
            break;
        case "xls":
            res = "fa-file-excel-o";
            break;
        case "xlsx":
            res = "fa-file-excel-o";
            break;
        case "ppt":
            res = "fa-file-powerpoint-o";
            break;
        case "pptx":
            res = "fa-file-powerpoint-o";
            break;
        case "pdf":
            res = "fa-file-pdf-o";
            break;
        case "chm":
            res = "fa-file";
            break;
        case "rar":
            res = "fa-file-zip-o";
            break;
        case "zip":
            res = "fa-file-zip-o";
            break;
        case "dwg":
            res = "fa-file-zip-o";
            break;
        default:
            res = "fa-file";
            break;
    }
    return res;
};

/**
 * 通过文件后缀名获取预览地址(图片文件返回"pic",不满足情况的一律返回"download")
 *
 * @param {string} ext 文件后缀名（推荐小写）
 *
 * @date 2018-10-11 10:25:46
 *
 * @returns {string}
 */
utils.getPreviewUrlByFileType = (ext="")=>{
    let name = ext.toLowerCase();
    if(["jpg","png","gif"].indexOf(name) > -1){
        //返回pic
        return "pic";
    }else if(["doc","docx","xls","xlsx","ppt","pptx","pdf"].indexOf(name) > -1){
        //返回下载地址
        let url = `${Config.dcsApiBaseUrl}&url=`;
        return url;
    }else{
        //返回download
        return "download";
    }
};

/**
 * 转换字符串中回车换行符及空格成Html元素
 *
 * @param {string} str 待转换的字符串
 * @param {string} type 装换模式1-\n\r\s 2-\n\r[这个主要用在备注]
 *
 * @date 2018-10-15 09:37:38
 *
 * @return string
 */
utils.changeWarpToBr = (str = "",type="1")=>{
    if(!str){
        return "";
    }
    //替换所有的换行符
    let res = "";
    if(type === "1"){
        res = str.replace(/\r\n/g,"<br/>");
        res = res.replace(/\n/g,"<br/>");
        //替换所有的空格（中文空格、英文空格都会被替换）
        res = res.replace(/\s/g,"&nbsp;");
    }else{
        res = str.replace(/\r\n/g,"<br/>");
        res = res.replace(/\n/g,"<br/>");
        // res = res.replace(/\s/g,"&nbsp;");
    }
    return res;
};

/**
 * 根据项目类型获取对应的前缀缩写
 *
 * @param {string} str 项目类型编号
 *
 * @date 2018-11-29 10:50:39
 *
 * @return {string}
 */
utils.getItemCateAbbreviation = (str="")=>{
    let res = "";
    switch (str){
        case "1":
            res = "TD";
            break;
        case "2":
            res = "CF";
            break;
        case "3":
            res = "SY";
            break;
        case "4":
            res = "XZL";
            break;
        case "5":
            res = "ZC";
            break;
        case "6":
            res = "KH";
            break;
        case "7":
            res = "CK";
            break;
        case "10":
            res = "QT";
            break;
        default:
            res = "";
            break;
    }
    return res;
};

/**
 * 换算汇率
 * @param {Number} money 钱
 * @param {Number} moneyType 钱单位
 * @param {Object} rate 汇率（dollar，euro，yen）
 * @return {float|Number}
 */
utils.calrate = (rate,money, moneyType)=>{
    switch(moneyType){
        //美元
        case 2:
            money = money * rate.dollar;
            break;
        //欧元
        case 3:
            money = money * rate.euro;
            break;
        //日元
        case 4:
            money = money * rate.yen;
            break;
    }
    return Number(money);
}





/**
 * 在数组中查找所有出现的x，并返回一个包含匹配索引的数组
 * @param {Number} a 数组
 * @param {String} x  要查找的元素
 * @return {Array}
 */
utils.findAll = (a, x)=>{
    var results=[],
        len=a.length,
        pos=0;
    while(pos<len){
        pos=a.indexOf(x,pos);
        if(pos===-1){//未找到就退出循环完成搜索
            break;
        }
        results.push(pos);//找到就存储索引
        pos+=1;//并从下个位置开始搜索
    }
  return results;
};

/**
 * 在数组中查找所有出现的x，并返回一个包含匹配索引的数组,部分数字和字符串
 * @param {Number} a 数组
 * @param {String} x  要查找的元素
 * @return {Array}
 */
utils.findIndex = (a, x)=>{
    x = !x ? "" : x.toString();
    for(let i = 0 ; i < a.length;i++){
        a[i] = a[i] ?  a[i].toString() : "";
    }
    let results=[],
        len=a.length,
        pos=0;
    while(pos<len){
        pos=a.indexOf(x,pos);
        if(pos===-1){//未找到就退出循环完成搜索
            break;
        }
        results.push(pos);//找到就存储索引
        pos+=1;//并从下个位置开始搜索
    }
    return results;
};

utils.getNameFromQuery = (str) => {
    if (str && typeof str == 'string') {
        let begin = str.search('【');
        let end = str.search('】');
        if (begin == 0 && end > -1) {
            return str.slice(end+1);
        } else {
            return str;
        }
    } else {
        return str;
    }
};
/**
 * 过滤对象属性，undefined||null => String
 * @param data
 * @constructor
 */
utils.ObjectPropertyToString = (data={})=>{
    for (let i in data) {
        if (data.hasOwnProperty(i) && (data[i] === undefined || data[i] === null)) {
            data[i] = "";
        }
    }
    return data;
};



export default utils;