defmodule Tasktracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :text, null: false
      add :body, :text, null: false
      add :hours, :integer, default: 0, null: false
      add :mins, :integer, default: 0, null: false
      add :complete, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :creator_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:tasks, [:user_id])
    create index(:tasks, [:creator_id])
  end
end
