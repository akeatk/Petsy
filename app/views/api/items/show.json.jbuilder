json.item do
  json.extract @item, :id, :user_id, :name,:score,:description,:num_scores,:price,:quantity
end

json.user do
  json.extract @user, :id, :username
  if @user.first_name && @user.last_name
    json.name (@user.first_name+" "+@user.last_name)
  elsif @user.first_name
    json.name @user.first_name
  elsif @user.last_name
    json.name @user.last_name
  else
    json.name @user.username
  end
end
