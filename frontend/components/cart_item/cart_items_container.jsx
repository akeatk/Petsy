import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {updateCartItems,getCartItems} from '../../actions/cart_item_actions';
import StaticImg from '../static_img';


const mapStateToProps = (state,ownProps) => ({
    cart_items: state.entities.cart_items
    items:state.entities.items,
    user:state.entities.users,
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
      cart_items: {},
      user_id:props.currentUserId
    };
  }
  componentDidMount(){
    this,props.getCartItems(this.props.currentUserId).then(
      ()=>{

      },

    );
    this.props.getItem(this.props.match.params.itemId)
      .then(()=>{
        this.props.history.push('/');
        this.setState({loaded:true});
        window.scrollTo(0, 0);
      },()=>this.props.history.push('/'));
  }
  render(){

  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowCartItems));
