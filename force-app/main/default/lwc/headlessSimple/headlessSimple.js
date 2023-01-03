import { LightningElement,api,wire } from 'lwc';
import { updateRecord,getRecord,getFieldValue } from 'lightning/uiRecordApi';
import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";
import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import Stage from '@salesforce/schema/Opportunity.StageName';
import getOpp from '@salesforce/apex/getOppList.getOpp';

export default class HeadlessSimple extends LightningElement {
  @api recordId;
  oppList;
  @wire(getRecord, { recordId: '$recordId', fields: [ID_FIELD,Stage] })
  opp;
      @wire(getOpp,{Id:'$recordId'}) wiredQueues({ error, data }) {
    if (data) {
        
        console.log('data = '+data[0].StageName);
    } else if (error) {
       console.log('errors'+JSON.stringify(error));
    }
}
    @api invoke() {
        console.log("Hi, I'm an action."+this.recordId);
        
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[Stage.fieldApiName] = 'Closed Won';
        const recordInput = {
          fields: fields
        };
        console.log('record'+recordInput);
        console.log('value field'+ getFieldValue(this.opp.data,Stage));
        const stage = getFieldValue(this.opp.data,Stage);

        //Method 2 using apex
        getOpp({Id:this.recordId}).then(
          (data) => {
            console.log('data from apex'+data);
            this.oppList = data;
            console.log('field = ' + this.oppList[0].StageName);
          }
        )

          console.log('Opp List = '+this.oppList);
        if(stage == 'Closed Won'){
          alert('Opprtunity is already in closed won');
        }
        else {
        updateRecord(recordInput).then((record) => {
          console.log(record);
        });
      }
      }
}