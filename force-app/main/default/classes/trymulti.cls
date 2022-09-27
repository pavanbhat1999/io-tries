public class trymulti {
public Integer multi(){
List<Group> g = [select id from Group where type='queue'];
List<User> u =   [select name from user where id in (Select UserOrGroupId From GroupMember where GroupId in:g) ];
    System.debug(u);
        return 0;
        }
}