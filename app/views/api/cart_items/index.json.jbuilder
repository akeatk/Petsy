json.cart_items do
  @cart_items.each do |item|
    json.set! item.id do
      json.item_id item.item_id
      json.quantity item.quantity
      json.bought item.bought
    end
  end
end

json.items do
  @items.each do |item|
    json.set! item.id do
      json.user_id item.user_id
      json.name item.name
      json.price item.price
      json.quantity item.quantity
      json.photo_id @item_photo_id[item.id]
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.id do
      if user.first_name && user.last_name
        json.name (user.first_name+" "+user.last_name)
      elsif user.first_name
        json.name user.first_name
      elsif user.last_name
        json.name user.last_name
      else
        json.name user.username
      end
      json.photo_id @user_photo_id[user.id]
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
