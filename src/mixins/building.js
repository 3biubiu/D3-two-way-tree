
export default {
  watch: {
    formData:{
      handler(newVal,oldVal) {
        this.handleAgreement(newVal);
      },
      deep: true
    },
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
    'formData.project_service'(newVal){
      this.getCarrierUsers(newVal)
    },

    'formData.company_id'(newVal){
      this.getSettleComs(newVal)
    }
  }

}
