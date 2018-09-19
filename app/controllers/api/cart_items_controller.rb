class Api::CartItemsController < ApplicationController
  def index
    @cart_items = CartItem.where(user_id:params[:user_id] , bought:false)
    @cart_items = [] unless @cart_items

    @items = Item.where(id: @cart_items.map{|e| e.item_id}.uniq)
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

    @user_photo_id={}
    @users.each do |user|
      unless @user_photo_id[user.id]
        photo = user.photo
        @photos << photo
        @user_photo_id[user.id]=photo.id
      end
    end

    @photos=@photos.uniq

    render :index
  end

  def create
    cart_item = CartItem.where(
      user_id:params[:cart_item][:user_id],
      item_id:params[:cart_item][:item_id],
      bought:false
    )
    if Item.find(params[:cart_item][:item_id]).user_id == params[:cart_item][:user_id]
      render json:'bad input',status:422
    end

    unless cart_item.length > 0
      cart_item = CartItem.new(cart_item_params)
    else
      cart_item=cart_item[0]
      cart_item.quantity += params[:cart_item][:quantity]
    end
    render json:'bad input',status:422 unless cart_item.save
  end

  def update
    # takes in user id, array of cart item id's matched with quantities
    # params:
    #   user_id:
    #     int
    #   cart_items: hash
    #     key = cart_item_id
    #     value = quantity

    @cart_items = CartItem.where(user_id: params[:user_id])
    @items = Item.where(id: @cart_items.map{|e| e.item_id}.uniq)

    items = {}
    @items.uniq.each do |item|
      items[item.id]=item
    end
    @items = items

    errors={}

    @cart_items.each do |cart_item|
      if params[:cart_items][cart_item.id]
        cart_item.quantity = params[:cart_items][cart_item.id]
        return unless cart_item.save
      end
      if cart_item.quantity > @items[cart_item.item_id].quantity
        errors[cart_item.item_id] = @items[cart_item.item_id].quantity
      end
    end

    if errors.keys.length > 0
      render json:errors, status:422
    else
      @cart_items.each do |cart_item|
        item = @items[cart_item.item_id]
        item.quantity -= cart_item.quantity
        return unless item.save
        cart_item.bought = true
        return unless cart_item.save
      end
    end
  end

  private
  def cart_item_params
    params.require(:cart_item).permit(:user_id, :item_id, :quantity)
  end
end
