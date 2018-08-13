class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.integer :user_id,null:false
      t.string :name,null:false
      t.float :price,null:false
      t.integer :quantity,null:false
      t.text :description,null:false
      t.float :score,null:false
      t.integer :num_scores,null:false

      t.timestamps
    end
    add_index :items,:user_id
  end
end
