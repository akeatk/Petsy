class Api::UsersController < ApplicationController
  def show
    if params[:id].to_i < 0
      @user=User.find_by(username:params[:user][:username])
    else
      @user=User.find_by(id:params[:id]);
    end
    if @user
      render :show
    else
      render json:{}
    end
  end

  def index

  end

  def edit
    @user=User.find(params[:id]);
    if @user
      render :edit
    else
      render json:{}
    end
  end

  def update
    @user=User.find(params[:id])
    if @user.update(edit_params)
      render :edit
    end
  end

  def create
    @user = User.new(user_params)
    if (@user.first_name.length && @user.first_name.length > 0) && @user.save
      render :create
    else
      errors={}
      if @user.email.length < 1
        errors[:email]="Can't be blank."
      elsif !User.valid_email?(@user.email)
        errors[:email]="Please enter a valid email address."
      end
      if @user.first_name.length < 1
        errors[:first_name]= "Can't be blank."
      end
      if @user.password.length < 1
        errors[:password]= "Can't be blank."
      elsif @user.password.length < 6
        errors[:password]="Must be at least 6 characters."
      end
      render json: errors, status:422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email,:first_name,:password)
  end
  def edit_params
    params.require(:user).permit(:first_name,:last_name,:about)
  end
end
