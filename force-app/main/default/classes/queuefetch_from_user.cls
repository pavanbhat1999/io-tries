public class queuefetch_from_user {
@AuraEnabled(cacheable=true)
public static List<GroupMember> getQueueFromUser(String Id)
{
    
    List<GroupMember> A = [Select Id,Group.Name from GroupMember where UserOrGroupId = :Id and Group.Type = 'Queue'];
    return A;
}
}