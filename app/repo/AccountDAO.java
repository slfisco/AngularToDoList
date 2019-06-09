package repo;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
import models.Account;
import org.mindrot.jbcrypt.BCrypt;
import play.db.ebean.EbeanConfig;
import play.Logger;
import javax.inject.Inject;
import java.util.List;

//should rewrite as interface implementation
public class AccountDAO {
    private final EbeanServer ebeanServer;

    @Inject
    public AccountDAO(EbeanConfig ebeanConfig) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
    }

    public AccountValidationResult loginIsValid(Account account) { //testing account
        Account foundAccount = ebeanServer.find(Account.class).where().eq("username", account.username).findOne();
        if (foundAccount != null && BCrypt.checkpw(account.password, foundAccount.password)) {
            return new AccountValidationResult(true);
        }
        else {
            return new AccountValidationResult(false,"Login details not valid. Please try again");
        }
    }
    public void createAccount(Account account) {
        account.setPassword(BCrypt.hashpw(account.password, BCrypt.gensalt()));
        account.save();
    }
    public AccountValidationResult newAccountIsValid(Account account) {

        if (ebeanServer.find(Account.class).where().eq("username", account.username).findOne() != null) {
            return new AccountValidationResult(false, "Error: Username already exists. Please choose another username.");
        }
        else if (account.username == "") {
            return new AccountValidationResult(false, "Error: Username cannot be blank.");

        }
        else if (account.password == "") {
            return new AccountValidationResult(false,"Error: Password cannot be blank.");
        }
        else {
            return new AccountValidationResult(true);
        }
    }
    //split to different class?

}
