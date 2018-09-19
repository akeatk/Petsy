import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {updateCartItems,getCartItems} from '../../actions/cart_item_actions';
import StaticImg from '../static_img';


const mapStateToProps = (state,ownProps) => ({
    cart_items: state.entities.cart_items,
    items:state.entities.items,
    users:state.entities.users,
    photos:state.entities.photos,
    currentUserId:state.session.currentUser
});

const MapDispatchToProps = dispatch => ({
  getCartItems: (user_id)=>dispatch(getCartItems(user_id)),
  updateCartItems: (user_id,cart_items)=>dispatch(updateCartItems(user_id,cart_items))
});

class ShowCartItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loaded:false,
      cart_items: {},
      user_id:props.currentUserId
    };
  }
  componentDidMount(){
    this.props.getCartItems(this.props.currentUserId)
      .then(()=>this.setState({loaded:true}));
  }
  render(){
    if(!this.state.loaded)
      return <div></div>
    const cartItems = Object.keys(this.props.cart_items);
    return (
      <div className='shopping-cart'>
        <h1>{cartItems.length}&nbsp;item{cartItems.length === 1 ? ' ' : 's '}in your cart</h1>
        <div>
          {cartItems.map((idx,i)=>{
              const cart_item = this.props.cart_items[idx];
              const item = this.props.items[cart_item.item_id];
              const user = this.props.users[item.user_id];
              return (
                <div key={i}>
                  hi
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowCartItems));
