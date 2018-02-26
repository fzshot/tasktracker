defmodule Tasktracker.Accounts.Manager do
  use Ecto.Schema
  import Ecto.Changeset

  alias Tasktracker.Accounts.Manager
  alias Tasktracker.Accounts.User


  schema "managers" do
    belongs_to :manager, User
    belongs_to :employee, User

    timestamps()
  end

  @doc false
  def changeset(%Manager{} = manager, attrs) do
    manager
    |> cast(attrs, [:manager_id, :employee_id])
    |> validate_required([:manager_id, :employee_id])
  end
end
