class Item < ApplicationRecord
  validates :user_id, :name,:score,:description,:num_scores, presence:true
  validates :price,:quantity,:numericality => { :greater_than_or_equal_to => 0 }

  belongs_to :user

  after_initialize :initialize_defaults

  private

  def initialize_defaults
    unless self.score
      self.score = 0;
      self.num_scores = 0;
    end
  end
end
