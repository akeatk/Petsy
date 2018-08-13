class Api::ItemsController < ApplicationController
  def show
    @item=Item.find(params[:id])
    @user=@item.user
    @items=@user.items.select{|item|item.quantity > 0}
        .sort{|a,b|b.num_scores <=> a.numscores}[0,8]
    @item_ids=@item.map{|item| item.id}
    unless @item
      render json: 'no such item found', status:404
    end
  end

  def index
    @items = Item.find(:all, :order => "num_scores desc", :limit => 20, :offset=>0)
  end

  def create
    @item=Item.new(create_params)
    unless @item.save
      # upload atleast one image error message?
      render json: process_errors(@item), status:422
    end
  end

  def update
    @item=Item.find(params[:id])
    unless @item.update(item_params)
      render json: process_errors, status:422
    end
  end

  def destroy
    @item=Item.find(params[:id])
    @item.destroy
  end

  private

  def item_params
    params.require(:item).permit(:name,:description,:price,:quantity)
  end

  def process_errors(item)
    errors={}
    unless item.name && item.name.length < 1
      errors[:name]=true
    end
    unless item.description && item.description < 1
      errors[:description]=true
    end
    unless item.price && item.price < 1
      errors[:price]=true
    end
    unless item.quantity && item.quantity < 1
      errors[:quantity]=true
    end
    errors
  end
end
