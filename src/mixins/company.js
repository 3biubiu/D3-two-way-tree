
export default {
    watch: {
        'formData.mot_id'(newVal){
            this.getMotslist(newVal);
        },
        'formData.company_id'(){
            this.getSelectMots();
            this.companyServiceType();
            this.companyMotRelate();
        },
        'formData.percent_unit'(){
            this.getDealApproval();
        },
     }
}