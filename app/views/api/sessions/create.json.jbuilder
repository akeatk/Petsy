json.id @user.id
json.username @user.username
if @user.first_name && @user.last_name
  json.name (@user.first_name+" "+@user.last_name)
elsif @user.first_name
  json.name @user.first_name
elsif @user.last_name
  json.name @user.last_name
else
  json.name @user.username
end
