import React from 'react';
import {connect} from 'react-redux';
import { Route,Switch,Redirect,withRouter } from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/routes_utils';
import NavbarContainer from './navbar/navbar_container';
import GreyScreenContainer from './session/grey_screen_container';
import ShowUserContainer from './user/show_user_container';
import EditUserContainer from './user/edit_user_container';
import ShowItemContainer from './item/show_item_container';
import CreateItemContainer from './item/create_item_container';
import UpdateItemContainer from './item/update_item_container';
import ItemSplashContainer from './item/item_splash_container';
import CartItemsContainer from './cart_item/cart_items_container';
import {hideDropdown} from '../actions/ui_actions';

const App = (props) => (
  <div onClick={props.dropdown ? props.hideDropdown : null}
      className={props.greyScreen==='none' ? '' : 'no-scroll'}>
    <NavbarContainer/>
    <GreyScreenContainer/>
    <Switch>
      <Route exact path='/' component={ItemSplashContainer}/>
      <Route exact path='/listing/:itemId/edit' component={UpdateItemContainer}/>
      <Route exact path='/listing/:itemId' component={ShowItemContainer}/>
      <Route exact path='/people/:username' component={ShowUserContainer}/>
      <ProtectedRoute exact path='/your/profile' component={EditUserContainer}/>
      <ProtectedRoute exact path='/your/listings/create' component={CreateItemContainer}/>
      <ProtectedRoute exact path='/listing/:itemId/update' component={UpdateItemContainer}/>
      <ProtectedRoute exact path='/cart' component={CartItemsContainer}/>
      <Redirect to="/"/>
    </Switch>
    <div className='footer'>
      <h1>Petsy</h1>
      <div>
        <a href='https://github.com/akeatk'>Github</a>
        <a href='https://www.linkedin.com/in/alex-kao-556799159/'>LinkedIn</a>
      </div>
    </div>
  </div>
);

const mapStateToProps = state=>({
  greyScreen:state.ui.greyScreen,
  dropdown:state.ui.dropdown
});
const MapDispatchToProps = dispatch=>({
  hideDropdown:()=>dispatch(hideDropdown())
});

export default withRouter(connect(mapStateToProps,MapDispatchToProps)(App));
