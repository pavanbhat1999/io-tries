import { LightningElement,api, track } from 'lwc';
export default class PopUp extends LightningElement {
        isShowModal = false;
        @api objectApiName;
        @api recordId;
        status = '';

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }
        
    handleSuccess(event) { 
  alert('Record saved Successfully');
  this.isShowModal = false;
    
     
    
        } 
        getStatus(event){
        console.log(event.target.value);
        this.status = event.target.value;
        if(this.status == 'Closed'){
            confirm('Status is ' + this.status + ' please check before saving');
        }
    }

}