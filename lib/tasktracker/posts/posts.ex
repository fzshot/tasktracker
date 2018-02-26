defmodule Tasktracker.Posts do
  @moduledoc """
  The Posts context.
  """

  import Ecto.Query, warn: false
  alias Tasktracker.Repo

  alias Tasktracker.Posts.Task

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  # def list_tasks do
  #   Repo.all(Task)
  #   |> Repo.preload(:user)
  #   |> Repo.preload(:creator)
  #   |> List.wrap
  # end
  def list_creator_tasks(user_id) do
    Repo.all(from f in Task,
      where: f.creator_id == ^user_id)
    |> Repo.preload(:creator)
    |> Repo.preload(:user)
    |> List.wrap
  end

  def list_user_tasks(user_id) do
    Repo.all(from f in Task,
      where: f.user_id == ^user_id)
    |> Repo.preload(:creator)
    |> Repo.preload(:user)
    |> List.wrap
  end

  # def get_task_by_user_creator(id) do
  #   query =
  #     from(
  #       t in Task,
  #       where: t.creator_id == ^id,
  #       select: t
  #     )
  #   Repo.all(query)
  #   |> Repo.preload(:user)
  #   |> Repo.preload(:creator)
  #   |> List.wrap
  # end

  # def get_task_by_user_creator(id) do
  #   query =
  #     from(
  #       t in Task,
  #       # where: t.user_id == ^id,
  #       where: t.creator_id == ^id,
  #       select: t
  #     )
  #   Repo.all(query)
  #   |> Repo.preload(:user)
  #   |> Repo.preload(:creator)
  #   |> List.wrap
  # end


  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id) do
    Repo.get!(Task, id)
    |> Repo.preload(:user)
    |> Repo.preload(:creator)
  end

  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
    %Task{}
    |> Task.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    task
    |> Task.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{source: %Task{}}

  """
  def change_task(%Task{} = task) do
    Task.changeset(task, %{})
  end
end
