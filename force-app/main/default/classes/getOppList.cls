public with sharing class getOppList {
    public getOppList() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpp(String Id){
        List<Opportunity> lst = [select Stagename,id from Opportunity where id=:Id];

        return lst;
    }
}
