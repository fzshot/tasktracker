defmodule Tasktracker.Posts.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Posts.Task


  schema "tasks" do
    field :body, :string
    field :complete, :boolean, default: false
    field :hours, :integer, default: 0
    field :mins, :integer, default: 0
    field :title, :string
    belongs_to :user, Tasktracker.Accounts.User
    belongs_to :creator, Tasktracker.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:creator_id, :user_id, :title, :body, :hours, :mins, :complete])
    |> validate_required([:creator_id, :user_id, :title, :body, :hours, :mins, :complete])
  end
end
