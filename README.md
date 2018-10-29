
<h1 align="center">Petsy</h1>

<h2 align="center"><a href="https://etsycloneaa.herokuapp.com/">Live Site</a></h2>

------------------------
## Overview

This app is a clone of etsy. It allows users to view listings from all users, purchase listings of other users, and create accounts and listings of their own.


![asd](https://i.imgur.com/o3k4WLe.jpg)

### Technologies
- React
- Redux
- Rails
- Postgresql
- Amazon Web Service

### Architecture

This site uses React for the front end,  Redux for the HTTP requests, and Rails for the back end.

The React front end consists of HTML, JavaScript, and HTML. React allows for the site to be a single page app. This allows the site to load components instead of loading the whole page when a user clicks a link or submits a form.

The HTTP requests are handled by Redux, with outgoing HTTP requests sent as AJAX calls dependent on user input and incoming HTTP responses processed by the React front end.

Ruby on Rails is used for the back end. It uses a Postgresql server to store and retrieve data and has jbuilder help generate json portion of the HTTP responses. The back end is a RESTful API. Amazon Web Service is used to store and access images posted by users for their profiles and listings.

-----------------------------

Delving into the functionality of the site, the initial splash page shows items being sold by other users. The navigation bar at the top shows the site name and lets you sign up or login. Whichever one you click will allow you to login/sign up as well as sign in as a guest user. If you have any invalid information in the fields when you submit, it will tell you when you submit the information.

Logging in as guest will allow you to use the site as normal with some bonuses of being logged in.

The sign up form is simple and provides users with the ability to create an account easily. To view your user account, go to the profile page through the dropdown menu after clicking the profile picture in the right side of the navigation bar.

![dfs](https://image.ibb.co/k3gFdK/Screen_Shot_2018_08_17_at_3_38_22_PM.png)

From there, you can view your personal user page, where you can view items you have posted or enter the edit profile page by clicking "Edit Profile". This button is only available when viewing your own profile page.

In the edit profile page, you can change your profile picture from the default picture, change or delete your first and last name, and write something about yourself that you want others to see. After you finish editing, you can click "Save Changes" at the bottom of the page, which should be available after you modify the page. It will notify you with a header whether you succeeded in editing your page or not

![asd](https://preview.ibb.co/hPOdyK/Screen_Shot_2018_08_17_at_3_45_39_PM.png)

The next step is to add a listing to sell. If you click on the 'Your Shop' icon on the navigation bar (on the left of the profile picture), you will enter the item creation page.

Here, you can add multiple pictures, give it a name, description, price, and the quantity being sold. When adding pictures, you will be provided with small boxed previews of each picture.

When you click 'Save and continue' at the bottom, it will submit the item. If it is successful, it will redirect you to the page the shows the item.

The item show page shows the image of the item and some extra information about the item and shows other items sold by the seller of that item.

-------------------------------------------------

The app uses BCrypt for encrypting passwords and authenticating users trying to log in. There is user authorization built into some of the pages to prevent new users from trying to create listings or purchasing listings.

Below are the two user authorization filters implemented with React components to control

~~~
const mapStateToProps=state=>({
  loggedIn: Boolean(state.session.currentUser)
});

const Auth=(({loggedIn,path,component:Component})=>(
  <Route
    path={path}
    render={props=>(
      loggedIn ? <Redirect to='/' /> : <Component {...props}/>
    )}
  />
));

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

const Protected=(({loggedIn,path,component:Component})=>(
  <Route
    path={path}
    render={props=>(
      loggedIn ? <Component {...props}/> : <Redirect to='/' />
    )}
  />
));

export const ProtectedRoute=withRouter(connect(mapStateToProps)(Protected));

~~~

The mapStateToProps function checks if there is a current user and sets the loggedIn variable in the state to true if there is. The Auth and Protected constants are react components that check the URL using React's router and render the React component from the Props passed in or redirects the user to the home page. Auth redirects if there is a user logged in, Protected redirections when there is not.

These two components are exported using the functions withRouter and connect to provide the React components to have access to the URL and have the State in Props.
