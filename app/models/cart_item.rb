class CartItem < ApplicationRecord
  validates :user_id, :item_id,:bought, presence:true
  validates :quantity, presence:true,:numericality => { :greater_than => 0 }

  belongs_to :user
  belongs_to :item
  
  after_initialize :initialize_defaults

  private

  def initialize_defaults
    if self.bought.nil?
      self.bought = false
    end
  end
end
