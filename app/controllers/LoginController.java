package controllers;

import models.Account;
import repo.AccountDAO;
import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.*;
import play.Logger;
import javax.inject.Inject;
import repo.AccountValidationResult;

public class LoginController extends Controller {

    private final AccountDAO accountRepository;

    @Inject
    public LoginController(AccountDAO accountRepository) {
        this.accountRepository = accountRepository;
    }
    public Result authenticate() {
        JsonNode json = request().body().asJson();
        Account account = Json.fromJson(json, Account.class);
        AccountValidationResult accountValidationResult = accountRepository.loginIsValid(account);
        if (accountValidationResult.isSuccess) {
            session("username", account.getUsername());
        }
            return ok(Json.toJson(accountValidationResult)).as("application/json");
    }
    public Result createAccount() {
        JsonNode json = request().body().asJson();
        Account account = Json.fromJson(json, Account.class);
        AccountValidationResult accountValidationResult = accountRepository.newAccountIsValid(account);
        if (accountValidationResult.isSuccess) {
            session("username", account.getUsername());
            accountRepository.createAccount(account);
        }
        return ok(Json.toJson(accountValidationResult)).as("application/json");
    }
    public Result logOut() {
        session().clear();
        return ok();
    }
}
