public class queueAllFetch{
@AuraEnabled(cacheable=true)
public static List<Group> getAllQueues()
{
   
    List<Group> A = [select Id,Name from Group where Type = 'Queue' ];
    return A;
}
}