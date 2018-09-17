class Api::ItemsController < ApplicationController
  def show
    @item=Item.find(params[:id])
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
      @photos += [photos[0]]
      @photo_ids[item.id]=[photos[0].id]
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
