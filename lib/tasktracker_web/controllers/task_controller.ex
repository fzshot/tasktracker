defmodule TasktrackerWeb.TaskController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Posts
  alias Tasktracker.Posts.Task
  alias Tasktracker.Repo

  action_fallback TasktrackerWeb.FallbackController

  def index(conn, _params) do
    tasks = Posts.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params, "token" => token}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)
    if task_params["creator_id"] != user_id do
      IO.inspect(task_params["creator_id"])
      IO.inspect(user_id)
      raise "Not Authorized"
    end
    with {:ok, %Task{} = task} <- Posts.create_task(task_params) do
      task = task
      |> Repo.preload(:user)
      |> Repo.preload(:creator)
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Posts.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Posts.get_task!(id)

    with {:ok, %Task{} = task} <- Posts.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Posts.get_task!(id)
    with {:ok, %Task{}} <- Posts.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
