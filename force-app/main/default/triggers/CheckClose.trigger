trigger CheckClose on Case (before update) {
 System.debug('asd');
    

for ( Case c: Trigger.New){
    Boolean val = !c.check_close__c;
    if(c.check_close__c == true){
        
    }
if(c.status == 'New'){
    c.check_close__c = true;
if(val){
    
c.AddError('This is one time warning that youre closing the case please press save agian if you want to go forward');

}
}
}
}