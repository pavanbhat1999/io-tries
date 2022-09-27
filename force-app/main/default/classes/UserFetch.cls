public class UserFetch{
@AuraEnabled(cacheable=true)
public static List<User> getUserName(String Id)
{
    List<User> usr = [select name from user where id in (Select UserOrGroupId From GroupMember where GroupId=:Id)];
    return usr;
}
}