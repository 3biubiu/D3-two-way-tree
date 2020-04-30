
export default {
    watch: {
        'formData.item_id'(newVal){
            this.getSelectItems(newVal)
        },
        'formData.mot_id'(newVal){
            this.getSelectMots(newVal)
            
            this.getMotslist(newVal);
        },
        'formData.project_facilitator_id'(newVal){
            this.getUsers(newVal)
        },
        'formData.company_id'(newVal){
            this.getSettleComs(newVal)
        },
        'formData.tax'(){
            this.getDealApproval()
        },
        'formData.tax_unit'(){
            this.getDealApproval()
        },
        'formData.project_facilitator_id'(newVal){
            this.getUsers(newVal, 'facilitateUsers')
        },
        'formData.project_service'(newVal){
            this.getUsers(newVal, 'accendantUsers')
        },
     
     }
}