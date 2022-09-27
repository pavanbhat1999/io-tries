import { LightningElement } from 'lwc';

export default class Detailcase extends LightningElement {
status = '';

    getStatus(event){
        console.log(event.target.value);
        this.status = event.target.value;
        if(this.status){
            //confirm('Status is ' + this.status);
        }
    }
}