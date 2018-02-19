defmodule TasktrackerWeb.TaskController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Posts
  alias Tasktracker.Posts.Task
  alias Tasktracker.Accounts
  alias TasktrackerWeb.ErrorView

  def index(conn, _params) do
    tasks = Posts.list_tasks()
    current_user = conn.assigns[:current_user]
    if current_user do
      if current_user.admin do
        render(conn, "index.html", tasks: tasks)
      end
    end
    conn
    |> put_status(401)
    |> put_view(ErrorView)
    |> render(:"401")
  end

  def new(conn, _params) do
    changeset = Posts.change_task(%Task{})
    users = Accounts.list_users
    render(conn, "new.html", changeset: changeset, all_users: users, task: nil)
  end

  def create(conn, %{"task" => task_params}) do
    user_id = get_session(conn, :user_id)
    users = Accounts.list_users
    task_params = Map.put(task_params, "creator_id", user_id)
    case Posts.create_task(task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task " <> task.title <> " created successfully.")
        |> redirect(to: page_path(conn, :index))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset, all_users: users, task: nil)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Posts.get_task!(id)
    current_user = conn.assigns[:current_user]
    if current_user do
      if current_user.admin or
      task.creator_id == current_user.id or
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
    users = Accounts.list_users
    render(conn, "edit.html", task: task, changeset: changeset, all_users: users)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Posts.get_task!(id)
    users = Accounts.list_users

    case Posts.update_task(task, task_params) do
      {:ok, _} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> redirect(to: page_path(conn, :index))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", task: task, changeset: changeset, all_users: users)
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
