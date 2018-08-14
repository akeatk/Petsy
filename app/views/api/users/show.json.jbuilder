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
json.score @user.score
json.num_scores @user.num_scores
json.about @user.about
json.createdAt @user.created_at
