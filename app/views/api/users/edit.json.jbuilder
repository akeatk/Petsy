json.id @user.id
json.username @user.username
json.photo @user.photo.attached? ? url_for(@user.photo) : nil
if @user.first_name && @user.last_name
  json.name (@user.first_name+" "+@user.last_name)
elsif @user.first_name
  json.name @user.first_name
elsif @user.last_name
  json.name @user.last_name
else
  json.name @user.username
end
json.first_name @user.first_name
json.last_name @user.last_name
json.about @user.about
