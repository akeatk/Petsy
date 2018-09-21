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



json.users do
  @users.each do |user|
    json.set! user.id do
      json.username user.username
      if user.first_name && user.last_name
        json.name (user.first_name+" "+user.last_name)
      elsif user.first_name
        json.name user.first_name
      elsif user.last_name
        json.name user.last_name
      else
        json.name user.username
      end
      json.photo_url user.photo.attached? ? url_for(user.photo) : nil
    end
  end
end

if @review
  json.review do
    json.extract! @review, :user_id, :body, :score, :created_at
  end
end

json.reviews do
  @reviews.each do |review|
    json.set! review.id do
      json.extract! review, :user_id, :item_id, :body, :score, :created_at
    end
  end
end
