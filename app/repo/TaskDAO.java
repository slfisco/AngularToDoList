package repo;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
import models.Task;
import play.db.ebean.EbeanConfig;
import javax.inject.Inject;
import java.util.List;
import play.mvc.*;
import play.Logger;

public class TaskDAO {
    private final EbeanServer ebeanServer;

    @Inject
    public TaskDAO(EbeanConfig ebeanConfig) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
    }
    public List<Task> getTasks(String accountName) {
        Logger.info("Getting task list for " + accountName);
        return ebeanServer.find(Task.class).where().eq("account_name", accountName).findList();
    }
    public Task getTask(Integer id) {
        Task foundTask = ebeanServer.find(Task.class).setId(id).findOne();
        Logger.info("Getting task with id: " + id);
        return foundTask;
    }
    public Task updateTask(Task task) {
        Ebean.update(task);
        Logger.info("Updated task: " + task.name);
        return task;
    }
    public void deleteTask(Integer id) {
        Task task = ebeanServer.find(Task.class).setId(id).findOne(); //find entity
        Ebean.delete(task); //delete entity
        Logger.info("Deleted task: " + task.name);
    }
    public Task createTask(Task task) {
        task.save();
        Logger.info("Created task: " + task.name);
        return task;
    }
}
