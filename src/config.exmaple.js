let config = {
	routerPrefix:'',//路由
	// 上传下载地址
	downloadUrl:'http://mms.app_php.com/spa.php/Plugin/pluginDownload',
	uploadUrl: 'http://mms.app_php.com/spa.php/Plugin/plugInUpload',
	// 接口地址
	// apiUrl: 'http://mms.app_php.com/spa.php',
	apiUrl: 'http://tis.app_php.com/api',
	devUploadUrl:'http://mms-group1.dev.tanikawa.com/spa.php/Plugin/plugInUploads',
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
	//流程域名
	processHost: 'https://process.tanikawa.com',
	workflowUrl:'https://tms.xuannaer.com/Process/index.html',   //工作流
	amoebaUrl:'https://oms.xuannaer.com/AmoebaShare/share_expend.html',   //阿米巴
    //培训域名
    tmsHost: 'https://tms.tanikawa.com',
    //客服域名
	csmsUrl: 'https://csms.tanikawa.com',
    //物资域名
    amsHost: 'https://ams.tanikawa.com',
    logoutUrl:"https://ums.xuannaer.com/auth/logout?redirectUrl=https%3A%2F%2Fmms.xuannaer.com",
	//财务域名
	erpHost: 'https://oms.tanikawa.com',
	//合同
	contractHost :'https://contract.tanikawa.com',
	//客户中台域名
	customerHost: 'https://crms.tanikawa.com',
	//绩效系统
	perfHost : 'http://tps-group1.dev.tanikawa.com',
	//问答学院
	questionAnswerHost: 'http://tanikawa.xuannaer.com',
	//T-learning学院
	eduHost: 'http://edu.tanikawa.com',
	//电台
	fmHost : 'https://fm.tanikawa.com',
	//谷川币域名
	currencyHost :'https://tcs.tanikawa.com',
	//官方单位
	adminCompany : 6,
	//谷川社区
	communityUrl: 'https://community.xuannaer.com/redirect',
	//鹰眼系统
	hawkeyeUrl: "http://www.baidu.com",
};
export default config;
