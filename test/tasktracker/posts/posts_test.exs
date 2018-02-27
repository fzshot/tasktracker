defmodule Tasktracker.PostsTest do
  use Tasktracker.DataCase

  alias Tasktracker.Posts

  describe "tasks" do
    alias Tasktracker.Posts.Task

    @valid_attrs %{body: "some body", complete: true, time: 42, title: "some title"}
    @update_attrs %{body: "some updated body", complete: false, time: 43, title: "some updated title"}
    @invalid_attrs %{body: nil, complete: nil, time: nil, title: nil}

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
      assert task.time == 42
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
      assert task.time == 43
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

  describe "timeblocks" do
    alias Tasktracker.Posts.Timeblock

    @valid_attrs %{interval: 42, start_time: ~N[2010-04-17 14:00:00.000000], stop_time: ~N[2010-04-17 14:00:00.000000]}
    @update_attrs %{interval: 43, start_time: ~N[2011-05-18 15:01:01.000000], stop_time: ~N[2011-05-18 15:01:01.000000]}
    @invalid_attrs %{interval: nil, start_time: nil, stop_time: nil}

    def timeblock_fixture(attrs \\ %{}) do
      {:ok, timeblock} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_timeblock()

      timeblock
    end

    test "list_timeblocks/0 returns all timeblocks" do
      timeblock = timeblock_fixture()
      assert Posts.list_timeblocks() == [timeblock]
    end

    test "get_timeblock!/1 returns the timeblock with given id" do
      timeblock = timeblock_fixture()
      assert Posts.get_timeblock!(timeblock.id) == timeblock
    end

    test "create_timeblock/1 with valid data creates a timeblock" do
      assert {:ok, %Timeblock{} = timeblock} = Posts.create_timeblock(@valid_attrs)
      assert timeblock.interval == 42
      assert timeblock.start_time == ~N[2010-04-17 14:00:00.000000]
      assert timeblock.stop_time == ~N[2010-04-17 14:00:00.000000]
    end

    test "create_timeblock/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_timeblock(@invalid_attrs)
    end

    test "update_timeblock/2 with valid data updates the timeblock" do
      timeblock = timeblock_fixture()
      assert {:ok, timeblock} = Posts.update_timeblock(timeblock, @update_attrs)
      assert %Timeblock{} = timeblock
      assert timeblock.interval == 43
      assert timeblock.start_time == ~N[2011-05-18 15:01:01.000000]
      assert timeblock.stop_time == ~N[2011-05-18 15:01:01.000000]
    end

    test "update_timeblock/2 with invalid data returns error changeset" do
      timeblock = timeblock_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_timeblock(timeblock, @invalid_attrs)
      assert timeblock == Posts.get_timeblock!(timeblock.id)
    end

    test "delete_timeblock/1 deletes the timeblock" do
      timeblock = timeblock_fixture()
      assert {:ok, %Timeblock{}} = Posts.delete_timeblock(timeblock)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_timeblock!(timeblock.id) end
    end

    test "change_timeblock/1 returns a timeblock changeset" do
      timeblock = timeblock_fixture()
      assert %Ecto.Changeset{} = Posts.change_timeblock(timeblock)
    end
  end
end
