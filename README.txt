When a user logged in, they first see the index page, which will show all tasks assigned to them,
the can click the button on each task to track the start/stop time. When a task marked complete,
the start/stop work button will not be displayed on the taks card, since it doesn't make sense to
work on a completed task. However, user can use the edit task function to adjust time blocks,
since there may be accidentaly record/not record time blocks.

In the edit task page, if the current user is the manager of this task, they can only adjust the task
assignee, task title and body. They cannot adjust the completeness and time blocks, If the current user
is the assignee, they can only adjust the completeness and time blocks. If a time block is incorrect,
the user can first delete the time block, then manually add a time block.

The time displayed on the website are all in the EST timezone; however, the manually add time block
input will take the user's current timezone then transfer to EST timezone to be displayed.

At the index page, when user clicks the "You Created Taks" button, will direct to a new page, contains
all tasks they created. They can see the time spent and other raletive infomation. If the user clicks
the "show" link, then the user can see the detailed time blocks.

For the manager-user relationship, users can manage/unmanage a user in the "all user" page,
each user can manage everyone except for themself. Usually, the manager relation is manged by
HR department, but for this implementation, I decided to give users full control.

On the "All Users" page, a user can click the "show" link next to each user, to see their managers and
underlings.

