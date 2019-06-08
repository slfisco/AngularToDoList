package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.*;
import play.Logger;
import javax.inject.Inject;
import repo.TaskDAO;
import models.Task;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;


public class TestDataController extends Controller{

    private final TaskDAO taskRepository;

    @Inject
    public TestDataController(TaskDAO taskRepository) {
        this.taskRepository = taskRepository;
    }
    //supplies json for testing
    public Result getTestData() {
        /*
        String jsonString = "[{\"id\":3,\"name\":\"task1\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/3\",\"updateLink\":\"http://localhost:9000/updateLink/3\",\"deleteLink\":\"http://localhost:9000/delete/3\"},{\"id\":4,\"name\":\"task2\",\"isTaskComplete\":true,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/4\",\"updateLink\":\"http://localhost:9000/updateLink/4\",\"deleteLink\":\"http://localhost:9000/delete/4\"},{\"id\":5,\"name\":\"task3\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/5\",\"updateLink\":\"http://localhost:9000/updateLink/5\",\"deleteLink\":\"http://localhost:9000/delete/5\"},{\"id\":6,\"name\":\"task4\",\"isTaskComplete\":false,\"accountName\":\"testname\",\"link\":\"http://localhost:9000/getTask/6\",\"updateLink\":\"http://localhost:9000/updateLink/6\",\"deleteLink\":\"http://localhost:9000/delete/6\"}]";
        JsonNode jsonNode = Json.toJson(new AppSummary(jsonString));
        Logger.error("newController executed");
        return ok(jsonNode).as("application/json");
        */
        String username = session("username");
        Logger.error("Rendering task list for " + username);
        List<Task> tasks = taskRepository.getTasks(username);
        Collections.sort(tasks, Comparator.comparing(Task::getId));
        String jsonString = Json.stringify(Json.toJson(tasks.stream()));
        JsonNode jsonNode = Json.toJson(new AppSummary(jsonString));
        return ok(jsonNode).as("application/json");
    }
    public Result createTask() {
        //should return json of task
        JsonNode json = request().body().asJson();
        Task newTask = new Task();
        newTask.setName(json.get("name").textValue());
        newTask.setIsTaskComplete(false);
        newTask.setAccountName(session("username"));
        Logger.error(Json.stringify(Json.toJson(newTask)));
        JsonNode taskNode = Json.toJson(taskRepository.createTask(newTask));
        JsonNode jsonNode = Json.toJson(new AppSummary(Json.stringify(taskNode)));
        return ok(jsonNode).as("application/json");
    }
    public Result deleteTask(Integer id) {
        taskRepository.deleteTask(id);
        JsonNode jsonNode = Json.toJson(new AppSummary("deletion complete"));
        return ok(jsonNode).as("application/json");
    }
    public Result updateStatus(Integer id) {
        Task task = taskRepository.getTask(id);
        task.setIsTaskComplete((task.isTaskComplete == true) ? (false) : (true));
        JsonNode taskNode = Json.toJson(taskRepository.updateTask(task));
        JsonNode jsonNode = Json.toJson(new AppSummary(Json.stringify(taskNode)));
        return ok(jsonNode).as("application/json");
    }
    public Result getTask(Integer id) {
        JsonNode taskNode = Json.toJson(taskRepository.getTask(id));
        JsonNode jsonNode = Json.toJson(new AppSummary(Json.stringify(taskNode)));
        return ok(jsonNode).as("application/json");
    }
}
