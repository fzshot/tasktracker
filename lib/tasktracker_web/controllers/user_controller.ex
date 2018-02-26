defmodule TasktrackerWeb.UserController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Accounts
  alias Tasktracker.Accounts.User
  alias TasktrackerWeb.ErrorView

  def index(conn, _params) do
    users = Accounts.list_users()
    current_user = conn.assigns[:current_user]
    manage = Accounts.manage_map(current_user.id)
    if current_user do
      if current_user.manager do
        render(conn, "index.html", users: users, manage: manage)
      end
    end
    conn
    |> put_status(401)
    |> put_view(ErrorView)
    |> render(:"401")
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
    if current_user do
      if current_user.manager or current_user.id == user.id do
        render(conn, "show.html", user: user)
      end
    end
    conn
    |> put_status(401)
    |> put_view(ErrorView)
    |> render(:"401")
  end

  def edit(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    changeset = Accounts.change_user(user)
    current_user = conn.assigns[:current_user]
    if current_user do
      if current_user.id == user.id or current_user.manager do
        render(conn, "edit.html", user: user, changeset: changeset)
      end
    end
    conn
    |> put_status(401)
    |> put_view(ErrorView)
    |> render(:"401")
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
