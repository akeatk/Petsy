json.item do
  json.extract! @item, :id, :user_id, :name,:score,:description,:num_scores,:price,:quantity
  json.photo_ids @photo_ids
end

json.photos do
  @photos.each do |photo|
    json.set! photo.id do
      json.extract url_for(photo)
    end
  end
end
