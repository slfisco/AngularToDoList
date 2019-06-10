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


public class TaskController extends Controller{

    private final TaskDAO taskRepository;

    @Inject
    public TaskController(TaskDAO taskRepository) {
        this.taskRepository = taskRepository;
    }
    public Result getTasks() {
        String username = session("username");
        List<Task> tasks = taskRepository.getTasks(username);
        Collections.sort(tasks, Comparator.comparing(Task::getId));
        return ok(Json.toJson(tasks.stream())).as("application/json");
    }
    public Result createTask() {
        //should return json of task
        JsonNode json = request().body().asJson();
        Task newTask = new Task();
        newTask.setName(json.get("name").textValue());
        newTask.setIsTaskComplete(false);
        newTask.setAccountName(session("username"));
        JsonNode taskNode = Json.toJson(taskRepository.createTask(newTask));
        return ok(taskNode).as("application/json");
    }
    public Result deleteTask(Integer id) {
        taskRepository.deleteTask(id);
        return noContent();
    }
    public Result updateStatus() {
        JsonNode json = request().body().asJson();
        Task task = Json.fromJson(json, Task.class);
        task.setIsTaskComplete((task.isTaskComplete == true) ? (false) : (true));
        JsonNode taskNode = Json.toJson(taskRepository.updateTask(task));
        return ok(taskNode).as("application/json");
    }
    public Result getTask(Integer id) {
        JsonNode taskNode = Json.toJson(taskRepository.getTask(id));
        return ok(taskNode).as("application/json");
    }
}
