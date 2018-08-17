json.items do
  @items.each do |item|
    json.set! item.id do
      json.name item.name
      json.price item.price
      json.user_id item.user_id
      json.photo_ids @photo_ids[item.id]
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.id do
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
