defmodule Tasktracker.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Accounts.User
  alias Tasktracker.Accounts.Manager


  schema "users" do
    field :email, :string
    field :name, :string
    has_many :mgmt, Manager, foreign_key: :employee_id
    has_many :employees, through: [:mgmt, :employee]

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email, :name])
  end
end
