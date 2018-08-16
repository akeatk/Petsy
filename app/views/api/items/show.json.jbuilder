json.item do
  json.extract! @item, :id, :user_id, :name,:score,:description,:num_scores,:price,:quantity
  json.photo_ids @photo_ids[@item.id]
end

json.user do
  json.extract! @user, :id, :username
  json.photo_url @user.photo.attached? ? url_for(@user.photo) : nil
  if @user.first_name && @user.last_name
    json.name (@user.first_name+" "+@user.last_name)
  elsif @user.first_name
    json.name @user.first_name
  elsif @user.last_name
    json.name @user.last_name
  else
    json.name @user.username
  end
  json.item_ids @item_ids
  json.item_count @item_count
end

json.items do
  @items.each do |item|
    json.set! item.id do
      json.name item.name
      json.price item.price
      json.photo_ids @photo_ids[item.id]
    end
  end
end

json.photos do
  @photos.each do |photo|
    json.set! photo.id do
      json.photo_url url_for(photo)
    end
  end
end
