class Api::SessionsController < ApplicationController
  def create
    errors = {}
    if params[:user][:field1].length < 1
      errors[:field1]="Can't be blank."
      if params[:user][:password].length < 1
        errors[:password]="Can't be blank."
      end
    elsif User.valid_email?(params[:user][:field1]) ||
        (params[:user][:field1].index('@')!=nil)
      @user = User.find_by(email:params[:user][:field1])
      errors[:field1]="Email address is invalid." unless @user
    else
      @user = User.find_by(username:params[:user][:field1])
      errors[:field1]='Email address is invalid.' unless @user
    end
    if @user && @user.is_password?(params[:user][:password])
      login(@user)
    else
      if @user
        if params[:user][:password].length > 0
          errors[:password]="Password was incorrect."
        else
          errors[:password]="Can't be blank."
        end
      end
      render json: errors, status: 401
    end
  end

  def destroy
    logout
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
