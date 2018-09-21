class Review < ApplicationRecord
  validates :score, inclusion: { in: (1..5) }

  belongs_to :user
  belongs_to :item
end
