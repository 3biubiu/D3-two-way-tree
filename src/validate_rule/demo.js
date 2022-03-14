export const attrInfoRule = {
    lastApproveTime: [
        {
            required: true,
            message: '请选择最晚审批时间',
            type: 'string',
            trigger: 'change'
        }
    ],
    mainContractId: [
        {
            required: true,
            message: '请选择主合同',
            type: 'string',
            trigger: 'change'
        }
    ],
    categoryData: [
        {
            required: true,
            message: '请选择合同分类',
            type: 'array',
            trigger: 'change'
        }
    ]
}