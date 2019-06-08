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
        //successful validation should return json for that account
        JsonNode json = request().body().asJson();
        Account account = Json.fromJson(json, Account.class);
        AccountValidationResult accountValidationResult = new AccountValidationResult();
        if (accountRepository.loginIsValid(account)) {
            session("username", account.getUsername());
            accountValidationResult.isSuccess = true;
            JsonNode jsonNode = Json.toJson(accountValidationResult);
            return ok(jsonNode).as("application/json");
        }
        else {
            accountValidationResult.isSuccess = false;
            accountValidationResult.errorMessage = "login not valid. please try again";
            JsonNode jsonNode = Json.toJson(accountValidationResult);
            return ok(jsonNode).as("application/json");
        }
    }
    public Result createAccount() {
        //should redirect to task list
        JsonNode json = request().body().asJson();
        Account account = Json.fromJson(json, Account.class);
        AccountValidationResult accountValidationResult = accountRepository.newAccountIsValid(account);
        if (accountValidationResult.isSuccess) {
            accountRepository.createAccount(account);
            JsonNode jsonNode = Json.toJson(new AppSummary("new account is valid and has been added"));
            return ok(jsonNode).as("application/json");
        }
        else {
            JsonNode jsonNode = Json.toJson(new AppSummary(accountValidationResult.errorMessage));
            return ok(jsonNode).as("application/json");
        }
    }
}
