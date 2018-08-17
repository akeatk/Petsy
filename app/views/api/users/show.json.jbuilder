json.user do
  json.id @user.id
  json.username @user.username
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
  json.score @user.score
  json.num_scores @user.num_scores
  json.about @user.about
  json.createdAt @user.created_at
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
