
import mmsCommon from './mms_common/mms_common.js';
import plugin from './mms_common/plugin.js';
import systemApi from './system';

const $api = Object.assign({},
	mmsCommon,
	plugin,
    systemApi
);



export default $api;
