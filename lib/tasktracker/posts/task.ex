defmodule Tasktracker.Posts.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Posts.Task


  schema "tasks" do
    field :body, :string
    field :complete, :boolean, default: false
    field :hours, :integer
    field :mins, :integer
    field :title, :string
    field :user_id, :id
    field :creator_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:title, :body, :hours, :mins, :complete])
    |> validate_required([:title, :body, :hours, :mins, :complete])
  end
end
