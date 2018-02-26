defmodule TasktrackerWeb.UserController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Accounts
  alias Tasktracker.Accounts.User
  alias TasktrackerWeb.ErrorView

  def index(conn, _params) do
    users = Accounts.list_users()
    current_user = conn.assigns[:current_user]
    if current_user do
      manage = Accounts.list_mgmt_user(current_user.id)
      render(conn, "index.html", users: users, manage: manage)
    else
      conn
      |> put_status(401)
      |> put_view(ErrorView)
      |> render(:"401")
    end
  end

  def new(conn, _params) do
    changeset = Accounts.change_user(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User " <> user.name <> " created successfully.")
        |> redirect(to: page_path(conn, :index))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    current_user = conn.assigns[:current_user]
    employees = Accounts.manage_map(id)
    managers = Accounts.employee_map(id)
    if current_user do
      render(conn, "show.html", user: user, employees: employees, managers: managers)
    else
      conn
      |> put_status(401)
      |> put_view(ErrorView)
      |> render(:"401")
    end
  end

  def edit(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    changeset = Accounts.change_user(user)
    current_user = conn.assigns[:current_user]
    if current_user do
      render(conn, "edit.html", user: user, changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    case Accounts.update_user(user, user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User updated successfully.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", user: user, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    {:ok, _user} = Accounts.delete_user(user)

    conn
    |> put_flash(:info, "User deleted successfully.")
    |> redirect(to: user_path(conn, :index))
  end
end
