 import config from "@/config.js";

const address = {
    logo:config.mmsHost + '/index/admin_index',
    company:config.mmsHost + `/company/companyView/id/${config.adminCompany}.html`,
    userCenter:config.mmsHost + '/user/index.html',
    message:config.mmsHost + '/user/systemmsg.html',
    noAllMessage:config.mmsHost + '/user/systemmsg.html',
    setting : `${config.mmsHost}/Config/index`,
}


export default address