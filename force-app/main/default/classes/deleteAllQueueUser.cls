public class deleteAllQueueUser {
@AuraEnabled
public static Integer deleteUser(List<String> Names)
{
    
	GroupMember[] grp = [SELECT Group.Name,Id,UserOrGroupId FROM GroupMember where Group.Name in :Names];
	System.debug(grp);
	delete grp;    
    return 0;
}
}