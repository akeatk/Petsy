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
  password:'123094812309478',
  score:5,
  num_scores:3
)

u2=User.create(email:'a@b.cd',first_name:'Bubble',last_name:'Turtle',
  about:"I like super cats. Cats, not so much.",password:'123456',
  score:4.2,
  num_scores:6);
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/bubble-turtle.jpg')
u2.photo.attach(io:file,filename:'bubble-turtle.jpg')
u2.save!

u3=User.create(email:'a@b.cde',first_name:'Chameleon',
  about:'I am a chameleon',password:'132456',
score:3,
num_scores:1)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/chameleon.jpg')
u3.photo.attach(io:file,filename:'chameleon.jpg')
u3.save!

u4=User.create(
  email:'as@bc.sdf',
  first_name:'Jelly',
  last_name:'Fishness',
  about:'BLUB BLUb BLub Blub blub lub ub',
  password:'1234988',
  score:4,
  num_scores:16
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/jellyfish.jpg')
u4.photo.attach(io:file,filename:'jellyfish.jpg')
u4.save!

u5=User.create(
  email:'manta@ray.com',
  first_name:'Manta',
  last_name:'Raya',
  about:'I cannot easily pet things, not because I live in the ocean, but because I have flaps instead of arms.',
  password:'032814s',
  score:4.9,
  num_scores:45
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/manta-ray.jpg')
u5.photo.attach(io:file,filename:'manta-ray.jpg')
u5.save!

u6=User.create(
  email:'sea@turtle.com',
  first_name:'Seymore',
  last_name:'Turtles',
  about:"There comes a time in everyone's life when you realize that the best things in life are the little things, for other people and for yourself.

Travel the world.
Meet others likes you.",
  password:'asdkfjalsd',
  score:5,
  num_scores:3
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/sea-turtle.jpg')
u6.photo.attach(io:file,filename:'sea-turtle.jpg')
u6.save!

u7=User.create(
  email:'tree@boa.com',
  first_name:'Boa',
  last_name:'',
  about:"Hi.

I am quite happy to see you. I promise I won't eat you. Trust me.

Anyways, Thank you for visiting my profile. Look around and see what you like.",
  password:'asldljf',
  score:5,
  num_scores:1
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/tree-boa.jpg')
u7.photo.attach(io:file,filename:'tree-boa.jpg')
u7.save!

u8=User.create(
  email:'whale@shark.com',
  first_name:'Whale',
  last_name:'Sharkian',
  about:'I am the biggest fish. Not the biggest bony fish, but nonetheless.',
  password:'asdlfkjas',
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/whale-shark.jpg')
u8.photo.attach(io:file,filename:'whale-shark.jpg')
u8.save!

#===============================================================================

Item.destroy_all
i1=Item.create(
  user_id:u1.id,
  name:"Majestic Blue Cat",
  description:"This cat has super powers, allegedly. If you have never seen a blue cat before, you have now. Now imagine how much value it would be to pet one.",
  quantity:100,
  price:29.99,
  score:5,
  num_scores:3
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/blue-cat-2.jpg')
i1.photos.attach(io:file,filename:'blue-cat-2.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/blue-cat-3.jpg')
i1.photos.attach(io:file,filename:'blue-cat-3.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/blue-cat-1.png')
i1.photos.attach(io:file,filename:'blue-cat-1.png')
i1.save!

i2=Item.create(
  user_id:u2.id,
  name:"Ferret the Third",
  description:"Ferret is a rather peculiar animal. If you look from far away, he actually looks like a panda. Not to worry, he has plenty of family in the wild.",
  quantity:50,
  price:10.55,
  score:4.5,
  num_scores:4
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-1.jpg')
i2.photos.attach(io:file,filename:'ferret-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-5.jpg')
i2.photos.attach(io:file,filename:'ferret-5.jpg')
i2.save!

i3=Item.create(
  user_id:u2.id,
  name:'Winter the Magnificent',
  description:"Winter only looks like winer in the winter due to molting, but that is okay. His title matches his presence any time of the year.",
  quantity:50,
  price:19.99,
  score:4,
  num_scores:1
);
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-2.jpg')
i3.photos.attach(io:file,filename:'ferret-2.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-3.jpg')
i3.photos.attach(io:file,filename:'ferret-3.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/ferret-4.jpg')
i3.photos.attach(io:file,filename:'ferret-4.jpg')
i3.save!

i4=Item.create(
  user_id:u2.id,
  name:"A Certain Lion",
  description:"I cannot disclose the location of this lion. However, it is in dire need of pets. It is definitely worth it.",
  quantity:250,
  price:12.99,
  score:5,
  num_scores:1
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/fluffy-cat-1.jpg')
i4.photos.attach(io:file,filename:'fluffy-cat-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/fluffy-cat-2.jpg')
i4.photos.attach(io:file,filename:'fluffy-cat-2.jpg')
i4.save!

i5=Item.create(
  user_id:u3.id,
  name:"Wood the Fox",
  description:"My family named it Wood because of it's affinity for tree climbing. I can't attest to it's ability to get down, however.",
  quantity:15,
  price:15.90,
  score:3,
  num_scores:1
);
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/fox-1.jpg')
i5.photos.attach(io:file,filename:'fox-1.jpg')
i5.save!

i6=Item.create(
  user_id:u4.id,
  name:"Bernard",
  description:"Bernard may have some years on him, but he has earned every single one. There are some days where he just takes a break from being tired and runs about.
Those are the days.",
  quantity:97,
  price:10.99,
  score:4,
  num_scores:3
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/lab-dog-1.jpg')
i6.photos.attach(io:file,filename:'lab-dog-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/lab-dog-3.jpg')
i6.photos.attach(io:file,filename:'lab-dog-3.jpg')
i6.save!

i7=Item.create(
  user_id:u4.id,
  name:'Lamp, the Eternal Puppy',
  description:'As his name suggests, he is an eternal puppy. There are no amount of pets that can satisfy him. If you think that is a bad thing, you are very much wrong.',
  quantity:9999,
  price:0.99,
  score:4,
  num_scores:13
);
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/lab-dog-2.jpg')
i7.photos.attach(io:file,filename:'lab-dog-2.jpg')
i7.save!

i8=Item.create(
  user_id:u5.id,
  name:'The Mole',
  description:"The mole is a rather peculiar animal. He may not be fully aware of what is around him sometimes, but his great sense of smell if what he used to develop trust with us.

Though I am one of the few people he trusts, he deserves so much more. I guarantee you that the pets you buy will be worth their value.",
  quantity:130,
  price:15.99,
  score:4.75,
  num_scores:25
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/mole-1.jpg')
i8.photos.attach(io:file,filename:'mole-1.jpg')
i8.save!

i9=Item.create(
  user_id:u5.id,
  name:'Garfield',
  description:"Despite his name, he is nothing like his namesake. He is a glorious, active cat that loves anybody that will give him time.

I guarantee you that petting him will make him love you. Your money back guaranteed",
  quantity:65,
  price:2.50,
  score:5,
  num_scores:20
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/orange-cat-1.jpg')
i9.photos.attach(io:file,filename:'orange-cat-1.jpg')
i9.save!

i10=Item.create(
  user_id:u6.id,
  name:'Tiger Lite',
  description:"Despite her appearance, she is far more than any cat could ever hope to be. Fearless, proud, and utterly unstoppable when it comes to getting what she wants.

That is where you come in. You can pet her and gain her favor. With great power, however, comes great responsibility. Be careful what you do with that favor.",
  quantity:10,
  price:99.99,
  score:5,
  num_scores:3
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/orange-cat-2.jpg')
i10.photos.attach(io:file,filename:'orange-cat-2.jpg')
i10.save!

i11=Item.create(
  user_id:u7.id,
  name:'Your Average Housecat',
  description:"This cat is a lovely house cat. There is no chair scratching, begging for food, or vengeful acts. That is why she deserves mroe pets than I can ever offer.",
  quantity:87,
  price:10.33,
  score:5,
  num_scores:1
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/orange-super-cat-1.jpg')
i11.photos.attach(io:file,filename:'orange-super-cat-1.jpg')
i11.save!

i12=Item.create(
  user_id:u8.id,
  name:'Ferdinand the Stoic',
  description:"Ferdinand is the bravest cat you can ever know. He will not flinch, cry, or run from anything you do. He does, however, love pets.",
  quantity:126,
  price:15.80,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/square-cat-1.jpg')
i12.photos.attach(io:file,filename:'square-cat-1.jpg')
i12.save!

i13=Item.create(
  user_id:u8.id,
  name:'Saint Ferdinand',
  description:"Despite his appearance, Saint is the most caring dog you can know. He will save your life if you let him. If you don't he will do it anyways.",
  quantity:193,
  price:25.03,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/super-dog-1.jpg')
i13.photos.attach(io:file,filename:'super-dog-1.jpg')
i13.save!

i13=Item.create(
  user_id:u8.id,
  name:'Puppy Ferdinand',
  description:"Puppy is a lovely dog. We call him puppy because his age doesn't catch up to him, both phyiscall and behaviorally.",
  quantity:300,
  price:12.99,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/super-dog-2.jpg')
i13.photos.attach(io:file,filename:'super-dog-2.jpg')
i13.save!

i14=Item.create(
  user_id:u8.id,
  name:'Amber',
  description:"The name is really quite self explanatory. Just like every puppy, she loves pets.",
  quantity:50,
  price:5.78,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/super-dog-4.jpg')
i14.photos.attach(io:file,filename:'super-dog-4.jpg')
i14.save!

i15=Item.create(
  user_id:u8.id,
  name:'Winter',
  description:"Winter is the one you rely on in the winter. Come storm or hail, Winter will lead you to safety.",
  quantity:100,
  price:30,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/super-dog-3.jpg')
i15.photos.attach(io:file,filename:'super-dog-3.jpg')
i15.save!

i16=Item.create(
  user_id:u8.id,
  name:'Squeak-Gui',
  description:"Despite his name, he doesn't squeak much. He is accustomed to people, so he is very welcoming of visitors.

If there were one flaw of his that could be listed, it would be his overwhelming ability to captivate others. You should have seen what he did to Winter, one of our dogs.",
  quantity:15,
  price:4.58,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/tan-hamster-1.jpg')
i16.photos.attach(io:file,filename:'tan-hamster-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/tan-hamster-2.jpg')
i16.photos.attach(io:file,filename:'tan-hamster-2.jpg')
i16.save!

i17=Item.create(
  user_id:u8.id,
  name:'Mouse-Gui',
  description:"Despite his name, he is very much a hamster. He is from Siberia and has the physique to survive its winters, though mostly by burrowing and sleeping.",
  quantity:15,
  price:4,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/tan-hamster-3.jpg')
i17.photos.attach(io:file,filename:'tan-hamster-3.jpg')
i17.save!

i18=Item.create(
  user_id:u8.id,
  name:'Rabbit-Gui',
  description:"Rabbit-Gui is probably one of the few rabbits that you can whole-heartedly love and be loved back by.

Most other rabbits don't quite have the heart to love you back. Literally. Their hearts can't take the stress.",
  quantity:1473,
  price:12.54,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/wild-rabbit-1.jpg')
i18.photos.attach(io:file,filename:'wild-rabbit-1.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/wild-rabbit-2.jpg')
i18.photos.attach(io:file,filename:'wild-rabbit-2.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/widl-rabbit-3.jpg')
i18.photos.attach(io:file,filename:'widl-rabbit-3.jpg')
i18.save!

i19=Item.create(
  user_id:u8.id,
  name:'Alucard',
  description:"I wouldn't say he's a vampire, but he's quite hard to account for during the day and journeys out somewhere at night. What to do...",
  quantity:25,
  price:250.49,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-9.jpg')
i19.photos.attach(io:file,filename:'white-rabbit-9.jpg')
i19.save!

i20=Item.create(
  user_id:u8.id,
  name:'Socks',
  description:"Socks is a rather nice rabbit. He poses for pictures, accepts pets, and doesn't pout when dinner is late.",
  quantity:34,
  price:10,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-7.jpg')
i20.photos.attach(io:file,filename:'white-rabbit-7.jpg')
i20.save!

i21=Item.create(
  user_id:u8.id,
  name:'Spots, the Adventurer',
  description:"Spots is a fearless, at least as much as a bunny can be. He deserves all the pets humanity can give",
  quantity:9999,
  price:1.99,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-6.jpg')
i21.photos.attach(io:file,filename:'white-rabbit-6.jpg')
i21.save!

i22=Item.create(
  user_id:u8.id,
  name:'Magic',
  description:"Magic is a lovely rabbit. His winter coat doesn't always show in the winter, but when it does, he becomes a beacon for all to strive for.

Or you get blinded if the sun is too bright. Either or.",
  quantity:15,
  price:15,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-3.jpg')
i22.photos.attach(io:file,filename:'white-rabbit-3.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-4.jpg')
i22.photos.attach(io:file,filename:'white-rabbit-4.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-2.jpg')
i22.photos.attach(io:file,filename:'white-rabbit-2.jpg')
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-5.jpg')
i22.photos.attach(io:file,filename:'white-rabbit-5.jpg')
i22.save!

i23=Item.create(
  user_id:u8.id,
  name:'Clockman',
  description:"Clockman is a rabbit that can run. If you give him room, he will show you the limits of rabbit kind.",
  quantity:20,
  price:14,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-10.jpg')
i23.photos.attach(io:file,filename:'white-rabbit-10.jpg')
i23.save!

i24=Item.create(
  user_id:u8.id,
  name:'Eurasia',
  description:"His name is for his indominable will to survive. He escaped into the winter storm as a baby bunny and came back a full grown rabbit. There is nothing you can do but give in to his demand for pets.",
  quantity:103,
  price:12.50,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-8.jpg')
i24.photos.attach(io:file,filename:'white-rabbit-8.jpg')
i24.save!

i25=Item.create(
  user_id:u8.id,
  name:'France',
  description:"His white coat is quite amazing, making him look like a ghost in the winter snow. I promise he isn't named for his color.",
  quantity:15,
  price:0.55,
  score:0,
  num_scores:0
)
file=EzDownload.open('https://s3-us-west-1.amazonaws.com/etsyclone-dev/defaults/white-rabbit-1.jpg')
i25.photos.attach(io:file,filename:'white-rabbit-1.jpg')
i25.save!

#===============================================================================

r1=Review.create(
  user_id:u8.id,
  item_id:i1.id,
  body:'This is a stellar cat.',
  score:5
)

r2=Review.create(
  user_id:u2.id,
  item_id:i1.id,
  body:'',
  score:5
)

r3=Review.create(
  user_id:u4.id,
  item_id:i1.id,
  body:'Who could ask for more',
  score:5
)

r4=Review.create(
  user_id:u1.id,
  item_id:i2.id,
  body:'Ferret is a true ferret among ferrets',
  score:5
)

r5=Review.create(
  user_id:u3.id,
  item_id:i2.id,
  body:'',
  score:4
)

r6=Review.create(
  user_id:u8.id,
  item_id:i2.id,
  body:'Not sure if a ferret or a long cat',
  score:4
)

r7=Review.create(
  user_id:u5.id,
  item_id:i2.id,
  body:'',
  score:5
)

r8=Review.create(
  user_id:u3.id,
  item_id:i3.id,
  body:'',
  score:4
)

r9=Review.create(
  user_id:u8.id,
  item_id:i4.id,
  body:'It seemed too safe. That\'s good.',
  score:5
)

r10=Review.create(
  user_id:u8.id,
  item_id:i5.id,
  body:'',
  score:3
)

r11=Review.create(
  user_id:u5.id,
  item_id:i6.id,
  body:'That is a lovely fox, but only when he\'s nto stuck in a tree',
  score:4
)

r12=Review.create(
  user_id:u8.id,
  item_id:i6.id,
  body:'Lovely labrador',
  score:5
)

r13=Review.create(
  user_id:u8.id,
  item_id:i6.id,
  body:'',
  score:3
)

r14=Review.create(
  user_id:u2.id,
  item_id:i7.id,
  body:'Truly able to light up your life.',
  score:5
)

r15=Review.create(
  user_id:u3.id,
  item_id:i7.id,
  body:'Lovely dog',
  score:5
)

r16=Review.create(
  user_id:u8.id,
  item_id:i7.id,
  body:'',
  score:1
)

r17=Review.create(
  user_id:u7.id,
  item_id:i7.id,
  body:'',
  score:5
)

r18=Review.create(
  user_id:u2.id,
  item_id:i8.id,
  body:'',
  score:4
)

r20=Review.create(
  user_id:u3.id,
  item_id:i8.id,
  body:'',
  score:5
)

r21=Review.create(
  user_id:u4.id,
  item_id:i8.id,
  body:'',
  score:5
)

r22=Review.create(
  user_id:u7.id,
  item_id:i8.id,
  body:'',
  score:5
)

r23=Review.create(
  user_id:u2.id,
  item_id:i9.id,
  body:'',
  score:4
)

r24=Review.create(
  user_id:u4.id,
  item_id:i9.id,
  body:'',
  score:5
)

r25=Review.create(
  user_id:u3.id,
  item_id:i9.id,
  body:'Cat is odd',
  score:4
)

r26=Review.create(
  user_id:u8.id,
  item_id:i9.id,
  body:'',
  score:4
)

r27=Review.create(
  user_id:u2.id,
  item_id:i10.id,
  body:'',
  score:5
)

r28=Review.create(
  user_id:u5.id,
  item_id:i10.id,
  body:'',
  score:5
)

r29=Review.create(
  user_id:u3.id,
  item_id:i10.id,
  body:'',
  score:5
)

r30=Review.create(
  user_id:u8.id,
  item_id:i11.id,
  body:'',
  score:5
)
