defmodule Tasktracker.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Accounts.User


  schema "users" do
    field :email, :string
    field :name, :string
    field :admin, :boolean, default: false

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:admin, :email, :name])
    |> validate_required([:admin, :email, :name])
  end
end
