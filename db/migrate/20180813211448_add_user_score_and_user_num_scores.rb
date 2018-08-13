class AddUserScoreAndUserNumScores < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :score, :float
    add_column :users, :num_scores, :integer
  end
end
