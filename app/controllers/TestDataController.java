package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.*;
import play.Logger;

public class TestDataController extends Controller{
    //supplies json for testing
    public Result getTestData() {
        String jsonString = "[{\"id\":3,\"name\":\"task1\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/3\",\"updateLink\":\"http://localhost:9000/updateLink/3\",\"deleteLink\":\"http://localhost:9000/delete/3\"},{\"id\":4,\"name\":\"task2\",\"isTaskComplete\":true,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/4\",\"updateLink\":\"http://localhost:9000/updateLink/4\",\"deleteLink\":\"http://localhost:9000/delete/4\"},{\"id\":5,\"name\":\"task3\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/5\",\"updateLink\":\"http://localhost:9000/updateLink/5\",\"deleteLink\":\"http://localhost:9000/delete/5\"},{\"id\":6,\"name\":\"task4\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/6\",\"updateLink\":\"http://localhost:9000/updateLink/6\",\"deleteLink\":\"http://localhost:9000/delete/6\"}]";
        JsonNode jsonNode = Json.toJson(new AppSummary(jsonString));
        Logger.error("newController executed");
        return ok(jsonNode).as("application/json");
    }
}
