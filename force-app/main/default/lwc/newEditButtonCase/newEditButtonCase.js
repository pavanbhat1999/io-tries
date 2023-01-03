import { LightningElement,api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import 	Status from '@salesforce/schema/Case.Status';

export default class Detailcase extends LightningElement {
status = '';
isShowModal = true;
@api objectApiName;
@api recordId;
fields = [Status];
    handleSuccess(event) { 
  alert('Record saved Successfully');
  this.isShowModal = false;

        } 
        showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
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