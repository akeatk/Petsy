# <div style="text-align:center">Etsyclone README</div>

<div style="text-align:center">This app is a clone of etsy.</div>

## [Link to site](https://etsycloneaa.herokuapp.com/)

------------------------

This app is a clone of etsy. It allows users to view items being sold by other users, view the items of specific users, and create users and items of their own.

This site users rails, react, and redux, which separates the sever from the backend and allows the pages to change without reloading. Rails handles the data storage and manipulation (backend) and sends it to the user (frontend), where the html is processed such that parts of the page change based on the data sent from the rails server.

-----------------------------

Delving into the actual functionality of the app, the initial splash page shows items being sold by other uers. The navigation bar at the top shows the site name and lets you sign up or login. Whichever one you click will allow you to login/sign up as well as sign in as a guest user. If you have any invalid information in the fields when you submit, it will tell you when you submit the information.

Logging in as guest will allow you to use the site as normal with some bonuses of being logged in.

The sign up form is simply and provides users with the ability to create an account easily. To view your user account, go to the profile page through the dropdown menu after clicking the profile picture in the right side of the navigation bar.

![dfs](https://image.ibb.co/k3gFdK/Screen_Shot_2018_08_17_at_3_38_22_PM.png)

From there, you can view your personal user page, where you can view items you have posted or enter the edit profile page by clicking "Edit Profile". This button is only available when viewing your own profile page.

In the edit profile page, you can change your profile picture from the default picture, change or delete your first and last name, and write something about yourself that you want others to see. After you finish editing, you can click "Save Changes" at the bottom of the page, which should be available after you modify the page. It will notify you with a header whether you succeeded in editing your page or not

![asd](https://preview.ibb.co/hPOdyK/Screen_Shot_2018_08_17_at_3_45_39_PM.png)

The next step is to add an item to sell. If you click on the 'Your Shop' icon on the navigation bar (on the left of the profile picture), you will enter the item creation page.

Here, you can add multiple pictures, give it a name, description, price, and the quantity being sold. When adding pictures, you will be provided with small boxed previews of each picture.

When you click 'Save and continue' at the bottom, it will submit the item. If it is successful, it will redirect you to the page the shows the item.

The item show page shows the image of the item and some extra information about the item. and shows other items sold by the seller of that item.
