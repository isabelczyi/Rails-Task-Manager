class TasksController < ApplicationController
  before_action :find_task, only: [:show, :edit, :update, :destroy, :completed_toggle]

  def index
    @tasks = Task.all
    @trash = "<i class='fa-solid fa-trash'></i>"
  end

  def show
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    @task.save

    redirect_to task_path(@task.id)
  end

  def edit
  end

  def update
    @task.update(task_params)

    redirect_to task_path(@task.id)
  end

  def destroy
    @task.destroy

    redirect_to tasks_path
  end

  def completed_toggle
    @task.toggle! :completed
    @task.save

    respond_to do |format|
      format.html  { redirect_to tasks_path }
      format.json  { render :json => @task }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :details, :completed)
  end

  def find_task
    @task = Task.find(params[:id])
  end
end
