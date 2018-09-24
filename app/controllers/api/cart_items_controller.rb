class Api::CartItemsController < ApplicationController
  def index
    cuid = current_user ? current_user.id : nil
    @cart_items = CartItem.where(user_id:cuid, bought:false)
    @cart_items = [] unless @cart_items

    @past_purchases = CartItem.where(user_id:cuid, bought:true).order(updated_at: :desc)
    @past_purchases=[] unless @past_purchases

    @items = Item.where(id: (@cart_items.map{|e| e.item_id} + @past_purchases.map{|e|e.item_id}).uniq)
    @items = [] unless @items
    @items=@items.uniq

    @users = User.where(id: @items.map{|e| e.user_id}.uniq)
    @users = [] unless @users
    @users=@users.uniq

    @photos = []

    @item_photo_id={}
    @items.each do |item|
      unless @item_photo_id[item.id]
        photo = item.photos[0]
        @photos << photo
        @item_photo_id[item.id]=photo.id
      end
    end

    @photos=@photos.uniq

    render :index
  end

  def create
    cuid = current_user ? current_user.id : nil
    cart_item = CartItem.where(
      user_id:cuid,
      item_id:params[:cart_item][:item_id],
      bought:false
    )
    if Item.find(params[:cart_item][:item_id]).user_id == cuid
      render json:'bad input',status:422
    end

    unless cart_item.length > 0
      cart_item = CartItem.new(
        user_id:cuid,
        item_id:params[:cart_item][:item_id],
        quantity:params[:cart_item][:quantity]
      )
    else
      cart_item=cart_item[0]
      cart_item.quantity = params[:cart_item][:quantity].to_i

      if(Item.find(cart_item.item_id).quantity < cart_item.quantity)
        cart_item.quantity = Item.find(cart_item.item_id).quantity
      end
    end
    render json:'bad input',status:422 unless cart_item.save
  end

  def update
    cuid = current_user ? current_user.id : nil
    # takes in user id, array of cart item id's matched with quantities
    # params:
    #   cart_items: hash
    #     key = cart_item_id
    #     value = quantity

    @cart_items = CartItem.where(user_id:cuid, id:params[:cart_items].keys)
    return unless @cart_items.length > 0
    @items = Item.where(id: @cart_items.map{|e| e.item_id}.uniq)

    items = {}
    @items.uniq.each do |item|
      items[item.id]=item
    end
    @items = items

    errors={}

            10.times{puts 'askdlkfjahs'}
            p params[:cart_items]
            p params[:cart_items][13]
            10.times{puts 'askdlkfjahs'}
    @cart_items.each do |cart_item|
      cart_item.quantity = params[:cart_items][cart_item.id.to_s].to_i

              10.times{puts 'askdlkfjahs'}
              p cart_item
              10.times{puts 'askdlkfjahs'}
      return unless cart_item.save

      if cart_item.quantity > @items[cart_item.item_id].quantity
        errors[cart_item.item_id] = @items[cart_item.item_id].quantity
      end
    end

    if errors.keys.length > 0
      @cart_items = CartItem.where(user_id:cuid, bought:false)
      @cart_items = [] unless @cart_items

      @past_purchases = CartItem.where(user_id:cuid, bought:true).order(updated_at: :desc)
      @past_purchases=[] unless @past_purchases

      @items = Item.where(id: (@cart_items.map{|e| e.item_id} + @past_purchases.map{|e|e.item_id}).uniq)
      @items = [] unless @items
      @items=@items.uniq

      @users = User.where(id: @items.map{|e| e.user_id}.uniq)
      @users = [] unless @users
      @users=@users.uniq

      @photos = []

      @item_photo_id={}
      @items.each do |item|
        unless @item_photo_id[item.id]
          photo = item.photos[0]
          @photos << photo
          @item_photo_id[item.id]=photo.id
        end
      end

      @photos=@photos.uniq

      render :index
      return
    else
      @cart_items.each do |cart_item|
        item = @items[cart_item.item_id]
        item.quantity -= cart_item.quantity
        return unless item.save
        cart_item.bought = true
        return unless cart_item.save
      end
    end
    @cart_items = CartItem.where(user_id:cuid, bought:false)
    @cart_items = [] unless @cart_items

    @past_purchases = CartItem.where(user_id:cuid, bought:true).order(updated_at: :desc)
    @past_purchases=[] unless @past_purchases

    @items = Item.where(id: (@cart_items.map{|e| e.item_id} + @past_purchases.map{|e|e.item_id}).uniq)
    @items = [] unless @items
    @items=@items.uniq

    @users = User.where(id: @items.map{|e| e.user_id}.uniq)
    @users = [] unless @users
    @users=@users.uniq

    @photos = []

    @item_photo_id={}
    @items.each do |item|
      unless @item_photo_id[item.id]
        photo = item.photos[0]
        @photos << photo
        @item_photo_id[item.id]=photo.id
      end
    end

    @photos=@photos.uniq

    render :index
  end

  def destroy
    cuid = current_user ? current_user.id : nil
    @cart_item = CartItem.find(params[:id])
    if @cart_item.user_id == cuid
      @cart_item.destroy

      @cart_items = CartItem.where(user_id:cuid, bought:false)
      @cart_items = [] unless @cart_items

      @past_purchases = CartItem.where(user_id:cuid, bought:true).order(updated_at: :desc)
      @past_purchases=[] unless @past_purchases

      @items = Item.where(id: (@cart_items.map{|e| e.item_id} + @past_purchases.map{|e|e.item_id}).uniq)
      @items = [] unless @items
      @items=@items.uniq

      @users = User.where(id: @items.map{|e| e.user_id}.uniq)
      @users = [] unless @users
      @users=@users.uniq

      @photos = []

      @item_photo_id={}
      @items.each do |item|
        unless @item_photo_id[item.id]
          photo = item.photos[0]
          @photos << photo
          @item_photo_id[item.id]=photo.id
        end
      end

      @photos=@photos.uniq

      render :index
    end
  end
end
