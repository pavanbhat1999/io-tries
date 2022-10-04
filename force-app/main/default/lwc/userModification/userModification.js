import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
// Fetch Data from apex using LDS
import getQueus from '@salesforce/apex/queueFetch.getQueues';
//import getAllQueus from '@salesforce/apex/queueAllFetch.getAllQueues';
import userfetch from '@salesforce/apex/UserFetch.getUserName';
import AllUserFetch from '@salesforce/apex/AllUserFetch.getUsers';
import queuefetch_from_user from '@salesforce/apex/queuefetch_from_user.getQueueFromUser';
import deleteAllQueueUser from '@salesforce/apex/deleteAllQueueUser.deleteUser';
import insertUserQueue from '@salesforce/apex/insertUserQueue.insertUser';
import getps from '@salesforce/apex/UserPS.getPS';


export default class UserModification extends LightningElement {
// Variables required for PART 1 
    Id;
    searchName;
    queueList;
    userList;
    queueName;
    allUser;
    selectedUserName;
    selectedUserId;
    userQueueList;
    removeAllUserChecked;
    queues = new Set();
    queuesId = [];
    userListjson;
    showQueuesSelected=false;
    // PART 2 Variables
    searchUserName;
    queueList2;
    queues2 = new Set();
    pslist;
// Initial data load Method 1 - Using Connected Callback
connectedCallback() {
        getQueus({Name : ''}).then(
            (data) => {
           this.queueList = data; 
           console.log(this.queueList);
            });

        AllUserFetch({UserName : ''}).then(
                (data) => {
                    console.log(data);
                    this.allUser = data;
                }
            );
}
//     @wire(getQueus,{Name:''}) wiredQueues({ error, data }) {
//     if (data) {
//         this.queueList = data;
//         console.log(data);
//         console.log('asdasda');
//     } else if (error) {
//         this.error = error;
//     }
// }

    // @wire(AllUserFetch,{Name:''}) wiredUsers({error,data}){
    //     if(data){
    //         this.allUser = data;
    //         console.log(data);
    //     }
    //     else if(error){
    //         this.error = error;
    //     }
    // }

    
// onchange event for queue search
    searchQueue(event) { 
 
            this.searchName = event.target.value; 
            this.showQueus();
     
    }
// onchange for user search
    searchUser(event){
        console.log('search changing = '+event.target.value);
        this.searchUserName = event.target.value;
        this.showUser();
    } 
// on change queue search 2 TODO:
    searchQueue2(event){
        console.log('a');
    }
//show users dynamically 
    showUser(){
        console.log('search User Name = '+this.searchUserName);
        AllUserFetch({UserName: this.searchUserName}).then(
            (data)=> {
                console.log(data);
                this.allUser = data;
            }
        );
    }
// showing queues dynamically
    showQueus(){
        getQueus({Name : this.searchName}).then(
            (data) => {
           this.queueList = data; 
           console.log(this.queueList);
            });
           

    }
//TODO: All functions for Part 1---------------------------------------------------------------
        // Submit button for removal of users
        showToast(title, message) {
            const event = new ShowToastEvent({
                title: title,
                message: message,
                
            });
            this.dispatchEvent(event);
        }
        submitRemoveUser(){
            console.log('submit pressed');
            console.log(this.queueName);
            let text;
            if (confirm("You are deleting the Users from queues shown:  "+Array.from(this.queues)) == true) {
           console.log('continued the execution')
            } else {
            text = "You canceled!";
            return;
            }
            // for further processing
            // let statusCheckbox = this.template.querySelector('.removeall');
            // let statusCheckboxVal = statusCheckbox.checked;
            //  if(!statusCheckboxVal){
            //    console.log('Not checked');
            // }else{
            //     console.log('Checked');
            //     console.log(statusCheckbox.label);
            // }
            console.log(this.queues);
            console.log(Array.from(this.queues));
            // Delete all the users from selected queue
            deleteAllQueueUser({Names : Array.from(this.queues)}).then(
                (data) => {
                    console.log('delete succesfull');
                    this.showToast('Success','Removal Successful for the queue');
                    location.reload()
                } 
            )
        }
        //
    handleClickChange(event){
        console.log('Any checkbox clicked');
        console.log("Data from Lwc name = "+event.target.dataset.name);
        console.log("Data from Lwc id = "+event.target.dataset.id);
        console.log('checkbox value = '+event.target.checked);
        //this.queueUserJson.push({'Qname':event.target.dataset.name,'Qid':event.target.dataset.id});
        //console.log("sample json = "+JSON.stringify(this.queueUserJson));
        //console.log("sample json = "+this.queueUserJson);
        //this.queueUserJson = Array.from(this.queueUserJson);
        //console.log("sample json = "+JSON.stringify(this.queueUserJson));
        if(event.target.checked){
            this.showQueuesSelected = false;
            if(this.userListjson)
            this.userListjson.length = 0;
            this.queues.add(event.target.dataset.name);
            this.queuesId.push(event.target.dataset.id);

        }
        if(!event.target.checked){
            this.showQueuesSelected = false;
            if(this.userListjson)
            this.userListjson.length = 0;
            this.queues.delete(event.target.dataset.name);
            for( var i = 0; i < this.queuesId.length; i++){ 
                                       
                if ( this.queuesId[i] === event.target.dataset.id) { 
                    this.queuesId.splice(i, 1); 
                    i--; 
                }
            }
        
    
    
    
        }
    }
    queueShow(){
        console.log('show clicked');
        console.log('selected queues name = '+Array.from(this.queues));
        console.log('Id of selected queues = '+this.queuesId);
        const fetchdata = async (i,q,qname) => {
            const res = await userfetch({Id :this.queuesId[i]});
            console.log('Result = '+JSON.stringify(res));
            let newres = [];
            for(var j=0;j<res.length;j++)
            newres.push({'Name':res[j].Name,'Qid':q,'Qname':qname});
           // this.queueUserJson.push({'Qname':event.target.dataset.name,'Qid':event.target.dataset.id});
            if(!this.userListjson)
            this.userListjson = newres;
            else
            this.userListjson = this.userListjson.concat(newres);
            console.log('Id of selected queues in for = '+q);
            console.log('in for await = '+i);
            
        }
        for( var i = 0; i < this.queuesId.length; i++){ 
        console.log('queues first for = '+this.queuesId[i]);
       
        
        fetchdata(i,this.queuesId[i],Array.from(this.queues)[i]);
        console.log('type of data'+JSON.stringify(this.userListjson));
        
            // userfetch({Id :this.queuesId[i]}).then(
            //     (data) => {
            //         console.log('Data from Apex = '+JSON.stringify(data));
            //         this.userListjson.push(data);
            //         console.log('data = '+JSON.stringify(this.userListjson));
            //     }
                
            // )
            
        }
        
        
        this.showQueuesSelected = true;
    }

//TODO: Part 2---------------------------------------------------------------


    userShowSelectedQueue(event){
       console.log("Data from Lwc = "+event.target.dataset.id);
        this.Id = event.target.dataset.id;
        this.queueName=event.target.dataset.name;
        userfetch({Id : this.Id}).then(
            (data) => {
           this.userList = data; 
           console.log(this.userList);
            });
        console.log("Data from Lwc = "+event.target.dataset.id);
          
    }
    clickUser(event){
        console.log("Data from Lwc name = "+event.target.dataset.name);
        console.log("Data from Lwc id = "+event.target.dataset.id);
        this.selectedUserName = event.target.dataset.name;
        this.selectedUserId = event.target.dataset.id;
        queuefetch_from_user({Id : this.selectedUserId}).then(
            (data) => {
                this.userQueueList = data;
                console.log(this.userQueueList);
            }
        )
        getps({'usernameps':this.selectedUserName}).then(
            (data) => {
                console.log(data);
                this.pslist = data;
            }
        )
    }
    handleClickChange2(event){
        console.log('Any checkbox clicked');
        console.log("Data from Lwc name = "+event.target.dataset.name);
        console.log("Data from Lwc id = "+event.target.dataset.id);
        console.log('checkbox value = '+event.target.checked);
        //this.queueUserJson.push({'Qname':event.target.dataset.name,'Qid':event.target.dataset.id});
        //console.log("sample json = "+JSON.stringify(this.queueUserJson));
        //console.log("sample json = "+this.queueUserJson);
        //this.queueUserJson = Array.from(this.queueUserJson);
        //console.log("sample json = "+JSON.stringify(this.queueUserJson));
        if(event.target.checked){
            this.queues2.add(event.target.dataset.id);
          
          
        }
        if(!event.target.checked){
            this.queues2.delete(event.target.dataset.id);
           
        }
    }
    handleClick(event){
        console.log('This is the queue added = '+Array.from(this.queues2)+'selected user Id = '+this.selectedUserId);
        let queueId = Array.from(this.queues2);
        insertUserQueue({Qname:queueId[0],UserId:this.selectedUserId}).then(
            (data) => {
                this.showToast('Success','Addition of user to queue successful');
                location.reload()
            });
    }


}