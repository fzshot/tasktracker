defmodule TasktrackerWeb.PageController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Posts

  def index(conn, _params) do
    user_id = get_session(conn, :user_id)
    if user_id do
      tasks = Posts.list_user_tasks(user_id)
      time_id = Enum.map(tasks, fn x ->
        Posts.list_incomplete_interval(x.id)
      end)
      |> List.flatten
      |> Enum.into(%{})
      time_interval = Enum.map(tasks, fn x ->
        Posts.calc_time_interval(x.id)
      end)
      |> List.flatten
      |> Enum.into(%{})
      render conn, "index.html", tasks: tasks, user_id: user_id, time_id: time_id, time_interval: time_interval
    else
      render conn, "index.html", tasks: []
    end
  end
end
