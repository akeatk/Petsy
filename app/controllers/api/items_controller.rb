class Api::ItemsController < ApplicationController
  def show
    @purchase = CartItem.where(user_id:current_user.id, item_id:params[:item_id],bought:true).length > 0
    @item=Item.find(params[:id])
    @user=@item.user

    @review = nil
    @review = @item.reviews.find_by(user_id: current_user.id) if current_user
    cuid = current_user ? current_user.id : nil
    @reviews = @item.reviews.select{|r|r.user_id != cuid}
    @reviews = @reviews.map{|e| e}
    @reviews.sort!{|a,b| b.created_at<=>a.created_at}

    existing_review_ids=@reviews.map{|rev| rev.id}
    if @reviews.length < 4
      reviews = @user.reviews.select do |r|
        r.user_id != cuid &&
        !existing_review_ids.include?(r.id)
      end
      @reviews += reviews.sort{|a,b|b.created_at<=>a.created_at}[0...4-@reviews.length]
    end

    @users = User.where(id:@reviews.map{|r| r.user_id}.uniq)
    ritems = Item.where(id: @reviews.map{|r|r.item_id}.uniq)

    @items=@user.items.select{|item|item.quantity > 0}
        .sort{|a,b|b.num_scores * b.score <=> a.num_scores * a.score}
    @item_count=@items.length
    @items=@items[0,8]
    @items += ritems.reject{|r| @items.map{|i|i.id}.include? r.id}
    @item_ids=@items.map{|item| item.id}
    @photos=@item.photos
    @photo_ids={}
    @photo_ids[@item.id]=@photos.map{|photo|photo.id}
    @items.each do |item|
      if(@item.id != item.id)
        photos=item.photos
        @photos += [photos[0]]
        @photo_ids[item.id]=[photos[0].id]
      end
    end
    @items.uniq!
    unless @item
      render json: 'no such item found', status:404
    end
  end

  def index
    offset=params[:offset].to_i || 0
    # @items = Item.find(:all, :order => "num_scores desc", :limit => 20, :offset=>0)
    @items=Item.all

    if @items
      @items=@items.select{|item|item.quantity > 0}
        .sort{|a,b|b.num_scores * b.score <=> a.num_scores * a.score}
      @items=@items[offset,offset + 20]
      @photo_ids={};
      @photos=[]
      @users=[]
      @items.each do |item|
        @users<<item.user
        photo=item.photos.first
        @photos << photo
        @photo_ids[item.id]=[photo.id]
      end
      render :index
    else
      render json: 'bad call to index somehow...', status:404
    end
  end

  def create
    @item=Item.new(item_params)
    @item.user_id = current_user.id
    files=params[:new_files] || []
    if @item.valid?
      i = 0
      files.each do |file|
        @item.photos.attach(file);
        i+= 1
        break if i == 10
      end
      @photos=@item.photos
      @photo_ids=@photos.map{|photo|photo.id}
      unless @item.save
        render json: 'error', status:422
        return
      end
      #--------------------------------------
      @user=@item.user
      @items=@user.items.select{|item|item.quantity > 0}
          .sort{|a,b|b.num_scores * b.score <=> a.num_scores * a.score}
      @item_count=@items.length
      @items=@items[0,8]
      @item_ids=@items.map{|item| item.id}
      @photos=@item.photos
      @photo_ids={}
      @photo_ids[@item.id]=[@photos.map{|photo|photo.id}]
      @items.each do |item|
        photos=item.photos
        @photos += photos
        @photo_ids[item.id]=photos.map{|photo|photo.id}
      end
      #--------------------------------------

      render :show
    end
  end

  def edit
    @item=Item.find(params[:id])
    @photos=@item.photos
    @photo_ids=@photos.map{|photo|photo.id}
    if @item
      render :edit
    end
  end

  def update
    @item=Item.find(params[:item][:id])
      render json:'error', status:422 unless current_user.id == @item.user_id
    files=params[:new_files]
    remove=params[:remove]
    @item.assign_attributes(item_params)
    return nil unless @item.valid?
    photos = @item.photos
    if photos && remove
      photos.each do |photo|
        photo.purge if remove.include? photo.id.to_s
      end
    end
    if files
      files.each do |file|
        @item.photos.attach(file);
      end
    end
    @item.save
    #--------------------------------------
    @user=@item.user
    @items=@user.items.select{|item|item.quantity > 0}
        .sort{|a,b|b.num_scores * b.score <=> a.num_scores * a.score}
    @item_count=@items.length
    @items=@items[0,8]
    @item_ids=@items.map{|item| item.id}
    @photos=@item.photos
    @photo_ids={}
    @photo_ids[@item.id]=[@photos.map{|photo|photo.id}]
    @items.each do |item|
      photos=item.photos
      @photos += photos
      @photo_ids[item.id]=photos.map{|photo|photo.id}
    end
    #--------------------------------------

    render :show
  end

  def destroy
    @item=Item.find(params[:id])
    @item.destroy
  end

  private

  def item_params
    params.require(:item).permit(:user_id,:name,:description,:price,:quantity)
  end
end
