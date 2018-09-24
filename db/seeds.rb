# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
u1=User.create(email:'guest@dot.com',first_name:'Guest',last_name:'User',
  about:'This is a guest user. The changes you make to this guest user may or may not stay, so in order to have longer lasting changes, you are recommended to create your own account.

  The changes made using your own account may also be reset or removed.',
  password:'123094812309478')

u2=User.create(email:'a@b.cd',first_name:'Bubble',last_name:'Turtle',
  about:"I like super cats. Cats, not so much.",password:'123456');
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/bubble-turtle.jpg')
u2.photo.attach(io:file,filename:'bubble-turtle.jpg')
u2.save!

u3=User.create(email:'a@b.cde',first_name:'Chameleon',
  about:'I am a chameleon',password:'132456')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/chameleon.jpg')
u3.photo.attach(io:file,filename:'chameleon.jpg')
u3.save!

#===============================================================================

Item.destroy_all
i1=Item.create(
  user_id:u1.id,
  name:"Blue Cat",
  description:"This cat has super powers, allegedly.",
  quantity:5,
  price:13.55,
  score:3,
  num_scores:139
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/blue-cat-1.png')
i1.photos.attach(io:file,filename:'blue-cat-1.png')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/blue-cat-2.jpg')
i1.photos.attach(io:file,filename:'blue-cat-2.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/blue-cat-3.jpg')
i1.photos.attach(io:file,filename:'blue-cat-3.jpg')
i1.save!

i2=Item.create(
  user_id:u2.id,
  name:"ferret",
  description:"The is allegedly a normal cat. Things may vary",
  quantity:2,
  price:10.55,
  score:5,
  num_scores:12
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-1.jpg')
i2.photos.attach(io:file,filename:'ferret-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-2.jpg')
i2.photos.attach(io:file,filename:'ferret-2.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-3.jpg')
i2.photos.attach(io:file,filename:'ferret-3.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-4.jpg')
i2.photos.attach(io:file,filename:'ferret-4.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-5.jpg')
i2.photos.attach(io:file,filename:'ferret-5.jpg')
i2.save!

i3=Item.create(
  user_id:u2.id,
  name:"Normal Dog",
  description:"This is a very normal dog, though that makes it not very normal compared to most things.",
  quantity:14,
  price:10.99,
  score:4.5,
  num_scores:2
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/lab-dog-1.jpg')
i3.photos.attach(io:file,filename:'lab-dog-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/lab-dog-2.jpg')
i3.photos.attach(io:file,filename:'lab-dog-2.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/lab-dog-3.jpg')
i3.photos.attach(io:file,filename:'lab-dog-3.jpg')
i3.save!

i4=Item.create(
  user_id:u2.id,
  name:"Super Cat",
  description:"The dog is super, more super than most dogs and definitely more super than most things.",
  quantity:3,
  price:12.99,
  score:3,
  num_scores:3
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/fluffy-cat-1.jpg')
i4.photos.attach(io:file,filename:'fluffy-cat-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/fluffy-cat-2.jpg')
i4.photos.attach(io:file,filename:'fluffy-cat-2.jpg')
i4.save!

#===============================================================================
