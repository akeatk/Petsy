# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
u1=User.create(email:'a@b.cd',first_name:'Guest',password:'123094812309478')

Item.destroy_all
i1=Item.create(
  user_id:u1.id,
  name:"item number one",
  description:"item one's description",
  quantity:5,
  price:13.55,
  score:0,
  num_scores:0
)
