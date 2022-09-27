public class AllUserFetch {
@AuraEnabled
public static List<User> getUsers(String Name)
{
    Name = '%' + Name + '%';
    List<User> usr = [select name,id from User where name LIKE :Name];
    return usr;
}
}