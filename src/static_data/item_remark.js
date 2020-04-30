
/**
    * 项目状态
    * @author liujuan & 2020-3-16 10:31:59
    *  4重点   1接洽中 5暂缓  2成功  3回收
*/
export const itemStatus = [
    {
        key: "4",
        value: "重点",
    },
    {
        key: "1",
        value: "接洽中",
    },
    {
        key: "5",
        value: "暂缓",
    },
    {
        key: "2",
        value: "成功",
    },
    {
        key: "3",
        value: "回收",
    }
];


/**
    * 联系类型
    * @author liujuan & 2020-3-16 10:31:59
    *  1电话 2邮件 3短信 4见面拜访 5勘察 6带看 7线上联络 8微信QQ 9未联系 11来访接待 12分配项目 10其他 13视频见面
*/
export const contactType = [
    {
        key:"1",
        value:"电话" 
    },  
    {
        key:"8",
        value:"微信/QQ" 
    }, 
    {
        key:"2",
        value:"邮件" 
    }, 
    {
        key:"3",
        value:"短信" 
    }, 
    {
        key:"4",
        value:"见面拜访" 
    }, 
    {
        key:"13",
        value:"视频见面" 
    },
    {
        key:"6",
        value:"带看" 
    }, 
    {
        key:"7",
        value:"线上联络" 
    },
    {
        key:"11",
        value:"来访接待" 
    }, 
    {
        key:"12",
        value:"分配项目" 
    }, 
    {
        key:"9",
        value:"未联系" 
    }, 
    {
        key:"5",
        value:"勘察" 
    }, 
    {
        key:"10",
        value:"其他" 
    }
];

/**
    * 回访时间
    * @author liujuan & 2020-3-16 10:31:59
    *  1 2天 2半月 3 1个月 4 3个月 9半年
*/
export const timeList = [
    {
        key:2,
        value:"2天" 
    }, 
    {
        key:15,
        value:"半月" 
    }, 
    {
        key:30,
        value:"1个月" 
    }, 
    {
        key:90,
        value:"3个月" 
    }, 
    {
        key:180,
        value:"半年" 
    }
];
/**
    * 回访时间
    * @author liujuan & 2020-3-16 10:31:59
    *  1 2天 2半月 3 1个月 4 3个月 9半年
*/
export const progressOther = [
    {
        name: '■',
        id: "1",
        value: "1"
    }, 
    {
        name: '■■',
        id: "2",
        value: "2"
    },
    {
        name: '■■■',
        id: "3",
        value: "3"
    },
    {
        name: '■■■■',
        id: "4",
        value: "4"
    },
    {
        name:'■■■■■',
        id:"5",
        value:"5" 
    }
];

/**
 * 选择提醒方式
 * @author zhouna & 2020-04-01 14:26:40
 * QQ通知 简洁短信 详细短信
 */
export const tipType = [{
        name: 'QQ通知',
        value: "1",
        choice:false,
        tips:''
    },
    {
        name: '简洁短信',
        value: "2",
        choice: false,
        tips: '系统短信：只显示项目ID，请他登录系统或进 App 查看'
    },
    {
        name: '详细短信',
        value: "3",
        choice: false,
        tips: '短信中显示填写的跟进信息'
    }
];
 
// /**
//     * 回访通知方式
//     * @author liujuan & 2020-3-17 12:48:15
//     *  APP 微信 QQ 短信 电话
// */
// export const itemStatus = [
//     {
//         key: "4",
//         value: "APP",
//     },
//     {
//         key: "1",
//         value: "微信",
//     },
//     {
//         key: "5",
//         value: "QQ",
//     },
//     {
//         key: "2",
//         value: "短信",
//     },
//     {
//         key: "3",
//         value: "电话",
//     }
// ];