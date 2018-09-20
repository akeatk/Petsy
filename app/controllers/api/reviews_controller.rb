class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id
    if @review.save
      item = @review.item
      item.score=((item.score.to_i * item.num_scores + @review.score.to_i)/(item.num_scores.to_i + 1.0))
      item.num_scores = item.num_scores.to_i + 1
      return unless item.save

      user=item.user
      user.score=(user.score * user.num_scores + @review.score)/(user.num_scores + 1)
      user.num_scores = user.num_scores + 1
      user.save

      render :show
    end
  end

  def update
    @review=current_user.reviews.find(params[:id])
    return if @review && @review.user.id != current_user.id
    old_score=@review.score

    if @review.update(review_params)
      item = @review.item
      item.score=(item.score.to_f * item.num_scores.to_i - old_score.to_i + @review.score.to_i)/(item.num_scores.to_i)
      return unless item.save

      user=item.user
      user.score=(user.score.to_f * user.num_scores.to_i - old_score.to_i + @review.score.to_i)/(user.num_scores.to_i)
      return unless user.save

      render :show
    end
  end

  def destroy
    @review=current_user.reviews.find(params[:id])
    if @review
      item = @review.item
      item.score=(item.score * item.num_scores - @review.score)/(item.num_scores-1)
      item.num_scores = item.num_scores -1

      user=item.user
      user.score=(user.score * user.num_scores -@review.score)/(user.num_scores-1)
      user.num_scores = user.num_scores-1

      @review.destroy
    end
  end

  private
  def review_params
    params.require(:review).permit(:body, :item_id, :score)
  end
end
