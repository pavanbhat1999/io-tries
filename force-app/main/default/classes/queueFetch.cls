public class queueFetch{
@AuraEnabled
public static List<Group> getQueues(String Name)
{
    Name = '%' + Name + '%';
    List<Group> A = [select Id,Name from Group where Type = 'Queue' and Name LIKE :Name];
    return A;
}
}