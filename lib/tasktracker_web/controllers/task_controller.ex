defmodule TasktrackerWeb.TaskController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Posts
  alias Tasktracker.Posts.Task
  alias Tasktracker.Accounts
  alias TasktrackerWeb.ErrorView

  def index(conn, _params) do
    current_user = conn.assigns[:current_user]
    if current_user do
      tasks = Posts.list_creator_tasks(current_user.id)
      render(conn, "index.html", tasks: tasks)
    else
      conn
      |> put_status(401)
      |> put_view(ErrorView)
      |> render(:"401")
    end
  end

  def new(conn, _params) do
    changeset = Posts.change_task(%Task{})
    current_user = conn.assigns[:current_user]
    mgmt_users = Accounts.manage_map(current_user.id)
    render(conn, "new.html", changeset: changeset, all_users: mgmt_users, task: nil)
  end

  def create(conn, %{"task" => task_params}) do
    user_id = get_session(conn, :user_id)
    current_user = conn.assigns[:current_user]
    mgmt_users = Accounts.manage_map(current_user.id)
    task_params = Map.put(task_params, "creator_id", user_id)
    case Posts.create_task(task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task " <> task.title <> " created successfully.")
        |> redirect(to: page_path(conn, :index))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset, all_users: mgmt_users, task: nil)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Posts.get_task!(id)
    current_user = conn.assigns[:current_user]
    if current_user do
      if task.creator_id == current_user.id or
      task.user_id == current_user.id do
        render(conn, "show.html", task: task)
      end
    end
    conn
    |> put_status(401)
    |> put_view(ErrorView)
    |> render(:"401")
  end

  def edit(conn, %{"id" => id}) do
    task = Posts.get_task!(id)
    changeset = Posts.change_task(task)
    current_user = conn.assigns[:current_user]
    mgmt_users = Accounts.manage_map(current_user.id)
    render(conn, "edit.html", task: task, changeset: changeset, all_users: mgmt_users)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Posts.get_task!(id)
    current_user = conn.assigns[:current_user]
    mgmt_users = Accounts.manage_map(current_user.id)

    case Posts.update_task(task, task_params) do
      {:ok, _} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> redirect(to: page_path(conn, :index))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", task: task, changeset: changeset, all_users: mgmt_users)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Posts.get_task!(id)
    {:ok, _task} = Posts.delete_task(task)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: task_path(conn, :index))
  end
end
