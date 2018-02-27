defmodule Tasktracker.Posts.Timeblock do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Posts.Timeblock
  alias Tasktracker.Posts.Task


  schema "timeblocks" do
    field :start_time, :utc_datetime
    field :stop_time, :utc_datetime
    belongs_to :task, Task

    timestamps()
  end

  @doc false
  def changeset(%Timeblock{} = timeblock, attrs) do
    timeblock
    |> cast(attrs, [:task_id, :start_time, :stop_time])
    |> validate_required([:task_id, :start_time, :stop_time])
  end
end
