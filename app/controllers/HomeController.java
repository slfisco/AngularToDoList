package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.*;
import play.Logger;

class AppSummary {
    private String content;

    AppSummary(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

public class HomeController extends Controller {

    public Result appSummary() {
        JsonNode jsonNode = Json.toJson(new AppSummary("Java Play Angular Seed"));
        Logger.error("appSummary executed");
        return ok(jsonNode).as("application/json");
    }

    public Result postTest() {
        JsonNode json = request().body().asJson();
        JsonNode jsonNode = Json.toJson(new AppSummary(Json.stringify(json)));
        Logger.error("postTest executed");
        Logger.error(Json.stringify(json));
        return ok(jsonNode).as("application/json");
    }
}
