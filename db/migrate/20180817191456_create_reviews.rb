class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :user_id, null:false
      t.integer :item_id, null:false
      t.text :body
      t.integer :score,null:false

      t.timestamps
    end

    # add_index [:item_id, :user_id], unique: true
  end
end
