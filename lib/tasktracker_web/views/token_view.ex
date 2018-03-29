defmodule TasktrackerWeb.TokenView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.TokenView

  def render("token.json", %{user: user, token: token}) do
    %{
      user_name: user.name,
      user_id: user.id,
      token: token,
    }
  end
end
