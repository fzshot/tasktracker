defmodule Tasktracker.PostsTest do
  use Tasktracker.DataCase

  alias Tasktracker.Posts

  describe "task" do
    alias Tasktracker.Posts.Tasks

    @valid_attrs %{body: "some body", complete: true, hours: 42, mins: 42, title: "some title"}
    @update_attrs %{body: "some updated body", complete: false, hours: 43, mins: 43, title: "some updated title"}
    @invalid_attrs %{body: nil, complete: nil, hours: nil, mins: nil, title: nil}

    def tasks_fixture(attrs \\ %{}) do
      {:ok, tasks} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_tasks()

      tasks
    end

    test "list_task/0 returns all task" do
      tasks = tasks_fixture()
      assert Posts.list_task() == [tasks]
    end

    test "get_tasks!/1 returns the tasks with given id" do
      tasks = tasks_fixture()
      assert Posts.get_tasks!(tasks.id) == tasks
    end

    test "create_tasks/1 with valid data creates a tasks" do
      assert {:ok, %Tasks{} = tasks} = Posts.create_tasks(@valid_attrs)
      assert tasks.body == "some body"
      assert tasks.complete == true
      assert tasks.hours == 42
      assert tasks.mins == 42
      assert tasks.title == "some title"
    end

    test "create_tasks/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_tasks(@invalid_attrs)
    end

    test "update_tasks/2 with valid data updates the tasks" do
      tasks = tasks_fixture()
      assert {:ok, tasks} = Posts.update_tasks(tasks, @update_attrs)
      assert %Tasks{} = tasks
      assert tasks.body == "some updated body"
      assert tasks.complete == false
      assert tasks.hours == 43
      assert tasks.mins == 43
      assert tasks.title == "some updated title"
    end

    test "update_tasks/2 with invalid data returns error changeset" do
      tasks = tasks_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_tasks(tasks, @invalid_attrs)
      assert tasks == Posts.get_tasks!(tasks.id)
    end

    test "delete_tasks/1 deletes the tasks" do
      tasks = tasks_fixture()
      assert {:ok, %Tasks{}} = Posts.delete_tasks(tasks)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_tasks!(tasks.id) end
    end

    test "change_tasks/1 returns a tasks changeset" do
      tasks = tasks_fixture()
      assert %Ecto.Changeset{} = Posts.change_tasks(tasks)
    end
  end

  describe "tasks" do
    alias Tasktracker.Posts.Task

    @valid_attrs %{body: "some body", complete: true, hours: 42, mins: 42, title: "some title"}
    @update_attrs %{body: "some updated body", complete: false, hours: 43, mins: 43, title: "some updated title"}
    @invalid_attrs %{body: nil, complete: nil, hours: nil, mins: nil, title: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Posts.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Posts.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Posts.create_task(@valid_attrs)
      assert task.body == "some body"
      assert task.complete == true
      assert task.hours == 42
      assert task.mins == 42
      assert task.title == "some title"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, task} = Posts.update_task(task, @update_attrs)
      assert %Task{} = task
      assert task.body == "some updated body"
      assert task.complete == false
      assert task.hours == 43
      assert task.mins == 43
      assert task.title == "some updated title"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_task(task, @invalid_attrs)
      assert task == Posts.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Posts.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Posts.change_task(task)
    end
  end
end
