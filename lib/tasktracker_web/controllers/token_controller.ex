defmodule TasktrackerWeb.TokenController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Accounts
  alias Tasktracker.Accounts.User

  action_fallback TasktrackerWeb.FallbackController

  def create(conn, %{"email" => email, "pass" => pass}) do
    with {:ok, %User{} = user} <- Accounts.get_and_auth(email, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
