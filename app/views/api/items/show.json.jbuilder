json.item do
  json.extract! @item, :id, :user_id, :name,:score,:description,:num_scores,:price,:quantity
end

json.user do
  json.extract! @user, :id, :username
  if @user.first_name && @user.last_name
    json.name (@user.first_name+" "+@user.last_name)
  elsif @user.first_name
    json.name @user.first_name
  elsif @user.last_name
    json.name @user.last_name
  else
    json.name @user.username
  end
  json.items @item_ids
end

json.items do
  @items.each do |item|
    json.set! item.id do
      json.name item.name
      json.price item.price
    end
  end
end
