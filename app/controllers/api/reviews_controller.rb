class Api::ReviewsController < ApplicationController
  def create
    @purchase = CartItem.where(user_id:current_user.id, item_id:params[:review][:item_id],bought:true)
    render json:'error', status:422 if @purchase.length < 1
    @review = Item.find(params[:review][:item_id]).reviews
      .find_by(user_id: current_user.id)

    unless @review
      @review = Review.new(review_params)
      unless CartItem.find_by(user_id:current_user.id,item_id:params[:review][:item_id])
        render json: 'error', status:422
        return
      end
      @review.user_id = current_user.id
      if @review.save
        item = @review.item
        item.score=((item.score.to_i * item.num_scores + @review.score.to_i)/(item.num_scores.to_i + 1.0))
        item.num_scores = item.num_scores.to_i + 1
        unless item.save
          render json: 'error', status:422
          return
        end

        user=item.user
        user.score=(user.score * user.num_scores + @review.score)/(user.num_scores + 1)
        user.num_scores = user.num_scores + 1
        unless user.save
          render json: 'error', status:422
          return
        end
      else
        render json:'error', status: 422
        return
      end
    else
      render json: 'error', status:422
      return
    end
    render :show
  end

  def update
    unless current_user
      render json:'no user', status:422
      return
    end
    cuid = current_user ? current_user.id : nil
    @review=Review.find_by(user_id:cuid, item_id:params[:review][:item_id])
    unless @review
      render json: 'error', status:422
      return
    end
    old_score=@review.score

    if @review.update(review_params)
      item = @review.item
      item.score=(item.score.to_f * item.num_scores.to_i - old_score.to_i + @review.score.to_i)/(item.num_scores.to_i)
      item.save

      user=item.user
      user.score=(user.score.to_f * user.num_scores.to_i - old_score.to_i + @review.score.to_i)/(user.num_scores.to_i)
      user.save

      render :show
    else
      render json:'error', status:422
    end
  end

  def destroy
    @review= Review.find(params[:id])
    if @review
      unless @review.user_id == current_user.id
        render json: 'error', status:422
        return
      end
      item = @review.item
      item.score= (item.score * item.num_scores - @review.score) / (item.num_scores-1)
      item.num_scores = item.num_scores - 1
      item.save

      user=item.user
      user.score=(user.score * user.num_scores - @review.score)/(user.num_scores-1)
      user.num_scores = user.num_scores - 1
      user.save

      @review.destroy
    else
      render json:'error', status:422
      return
    end
  end

  private
  def review_params
    params.require(:review).permit(:body, :item_id, :score)
  end
end
