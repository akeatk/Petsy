json.cart_items do
  @cart_items.each do |item|
    json.set! item.id do
      json.item_id item.item_id
      json.quantity item.quantity
    end
  end
end

json.past_purchases do
  @past_purchases.length.times do |idx|
    json.set! idx do
      json.extract! @past_purchases[idx], :item_id, :user_id, :updated_at, :quantity
    end
  end
  json.length @past_purchases.length
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

json.photos do
  @photos.each do |photo|
    json.set! photo.id do
      json.photo_url url_for(photo)
    end
  end
end
