# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
p User.
# purge all non guest, non seed users
User.destroy_all
u1=User.create(email:'guest@dot.com',first_name:'Guest',last_name:'User',
  about:'This is a guest user. The changes you make to this guest user may or may not stay, so in order to have longer lasting changes, you are recommended to create your own account.

  The changes made using your own account may also be reset or removed.',
  password:'123094812309478')

u2=User.create(email:'a@b.cd',first_name:'Steve',last_name:'Bob',
  about:"I like super cats. Cat's not so much.",password:'123456');

# purge all non-seed item photos
Item.destroy_all
i1=Item.create(
  user_id:u1.id,
  name:"Super Cat",
  description:"This cat has super powers, allegedly.",
  quantity:5,
  price:13.55,
  score:0,
  num_scores:0
)
i2=Item.create(
  user_id:u1.id,
  name:"Normal Cat",
  description:"The is allegedly a normal cat. Things may vary",
  quantity:2,
  price:10.55,
  score:5,
  num_scores:12
)
i3=Item.create(
  user_id:u1.id,
  name:"Normal Dog",
  description:"This is a very normal dog, though that makes it not very normal compared to most things.",
  quantity:14,
  price:10.99,
  score:4.5,
  num_scores:2
)
i4=Item.create(
  user_id:u1.id,
  name:"Super Dog",
  description:"The dog is super, more super than most dogs and definitely more super than most things.",
  quantity:3,
  price:12.99,
  score:3,
  num_scores:3
)
