defmodule Tasktracker.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Accounts.User
  alias Tasktracker.Accounts.Manager


  schema "users" do
    field :email, :string
    field :name, :string
    field :manager, :boolean, default: false
    has_many :mgmt, Manager, foreign_key: :employee_id
    has_many :employees, through: [:mgmt, :employee]

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:manager, :email, :name])
    |> validate_required([:manager, :email, :name])
  end
end
