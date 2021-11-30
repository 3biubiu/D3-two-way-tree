let config = {
	// 上传下载地址
	downloadUrl:'http://mms.app_php.com/spa.php/Plugin/pluginDownload',
	uploadUrl: 'http://mms.app_php.com/spa.php/Plugin/plugInUpload',
	// 接口地址
	apiUrl: 'http://mms.app_php.com/spa.php',
	// apiUrl: 'http://mms-group1.dev.tanikawa.com/spa.php/',
	devUploadUrl:'http://mms-group1.dev.tanikawa.com/spa.php/Plugin/plugInUploads?testUid=920928',
	token:'123456',
	// layout.vue组件内用的---谷川币
	currencyApi: 'http://www.currency_api.com/api',// 谷川币 接口地址	
	currencyWs: 'wss://tcs.tanikawa.com/ws',// 谷川币ws host
	compaintLink: 'https://tanikawa.wjx.cn/jq/44181292.aspx',//挂件-投诉    

	// 登录地址，
	loginUrl : 'http://mms.app_php.com',  //不能和mmsHost合并。某些情况下两者不同
	// loginUrl : 'http://mms-group1.dev.tanikawa.com',  //不能和mmsHost合并。某些情况下两者不同

	// 头部菜单的跳转地址
	mmsHost:'http://mms.app_php.com',//mms域名
    biUrl : "https://bi2.tanikawa.com",//bi系统域名
	financeUrl:'https://oms.xuannaer.com/Reimbursement/add.html',   //财务
	progressUrl:'https://process.xuannaer.com/User/erpIdentityList.html',   //流程系统地址
	workflowUrl:'https://tms.xuannaer.com/Process/index.html',   //工作流
	amoebaUrl:'https://oms.xuannaer.com/AmoebaShare/share_expend.html',   //阿米巴
	trainUrl:'https://tms.xuannaer.com/index',  //培训  
    csmsUrl: 'https://csms.xuannaer.com',//客服域名  
	materialUrl:'https://ams.xuannaer.com/material/fixed-current',   //物资
};
export default config;
