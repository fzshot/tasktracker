defmodule TasktrackerWeb.PageController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Posts

  def index(conn, _params) do
    user_id = get_session(conn, :user_id)
    if user_id do
      tasks = Posts.list_tasks
      render conn, "index.html", tasks: tasks, user_id: user_id
    else
      render conn, "index.html", tasks: []
    end
  end
end
