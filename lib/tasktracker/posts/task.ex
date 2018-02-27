defmodule Tasktracker.Posts.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Posts.Task
  alias Tasktracker.Posts.Timeblock


  schema "tasks" do
    field :body, :string
    field :complete, :boolean, default: false
    # field :mins, :integer
    # field :hours, :integer
    field :title, :string
    belongs_to :creator, Tasktracker.Accounts.User
    belongs_to :user, Tasktracker.Accounts.User
    has_many :task_interval, Timeblock, foreign_key: :task_id
    has_many :intervals, through: [:task_interval, :task_id]

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:creator_id, :user_id, :title, :body, :complete])
    |> validate_required([:creator_id, :user_id, :title, :body, :complete])
  end

end
