import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {updateCartItems,getCartItems,deleteCartItem} from '../../actions/cart_item_actions';
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
  updateCartItems: (user_id,cart_items)=>dispatch(updateCartItems(user_id,cart_items)),
  deleteCartItem: id=>dispatch(deleteCartItem(id))
});

class ShowCartItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loaded:false,
      cart_items: {},
      verifier:false,
      error:false
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.props.getCartItems(this.props.currentUserId)
      .then(()=>{
        Object.keys(this.props.cart_items).forEach((idx)=>{
          let ci = this.props.cart_items[idx];
          let item = this.props.items[ci.item_id]
          this.state.cart_items[idx]= parseInt(ci.quantity) <= parseInt(item.quantity) ? parseInt(ci.quantity) : 1;
        })
        this.setState({loaded:true})
      });
  }
  handleSubmit(){
    this.props.updateCartItems(this.state.cart_items).then(
      ()=>{
        if(Object.keys(this.props.cart_items).length > 0)
          this.state.error=true;
        this.setState({verifier:false});
      }
    );
  }
  render(){
    if(!this.state.loaded)
      return <div></div>
    const cartItems = Object.keys(this.props.cart_items);
    if(cartItems.length > 0)
      return (
        <div className='shopping-cart'>
          <h1>{cartItems.length}&nbsp;item{cartItems.length === 1 ? ' ' : 's '}in your cart</h1>
          {this.state.error ?
            <div id='error-message'>
              <h4>There was an error processing your purchases. Please double check purchase and resubmit it.</h4>
              <h4>&nbsp;</h4>
              <h4>Sorry for the inconvenience.</h4>
            </div> : null }
          <div>
            {cartItems.map((idx,i)=>{
                const cart_item = this.props.cart_items[idx];
                const item = this.props.items[cart_item.item_id];
                const user = this.props.users[item.user_id];
                return (
                  <div key={i}>
                    <div className='item-user'>
                      <StaticImg src={user.photo_url || window.images.profileIcon}
                         height='32px' width='32px' round={true} onClick={()=>this.props.history.push(`/people/${user.username}`)}/>
                      <h1 onClick={()=>this.props.history.push(`/people/${user.username}`)}>
                        {user.name}
                      </h1>
                    </div>

                    <div className='item-info'>
                      <div>
                        <StaticImg src={this.props.photos[item.photo_id].photo_url} height='160px'
                          width='200px' onClick={()=>this.props.history.push(`/listing/${cart_item.item_id}`)}/>
                        <div>
                          <h2 onClick={()=>this.props.history.push(`/listing/${cart_item.item_id}`)}>{item.name}</h2>
                          <h3 onClick={()=>{
                              this.props.deleteCartItem(idx);
                              delete(this.props.cart_items[idx]);
                              this.setState({loaded:true});
                            }}>Remove</h3>
                        </div>
                      </div>
                      <div>
                        <h3>Number of pets:&nbsp;</h3>
                        <select defaultValue={this.state.cart_items[idx]}
                          onChange={(e)=>{
                            this.state.cart_items[idx]=e.currentTarget.value;
                            this.setState({loaded:true});
                          }}>
                          {Array.apply(null, Array(parseInt(item.quantity))).map(()=>true).map((x,idx)=>(
                              <option key={idx}>
                                {idx + 1}
                              </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <p>Total price:&nbsp;</p>
                        <p>${(parseFloat(item.price)*parseInt(this.state.cart_items[idx])).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div id='submission'><span onClick={()=>this.setState({verifier:true})}>Proceed to checkout</span></div>
          <div className={this.state.verifier ? 'verifier' : 'invis'}>
            <div className='grey-screen' onClick={()=>this.setState({verifier:false})}>
              <div onClick={(e)=>e.stopPropagation()}>
                <h2>Due to the nature of petting animals, we will not be charging you for this transaction.</h2>
                <h2>Do you still want to submit your purchases?</h2>
                <h3 onClick={this.handleSubmit}>Submit purchases</h3>
              </div>
            </div>
          </div>
        </div>
      );
    return(
      <div className='empty-cart'>
        <h1>Your cart is empty.</h1>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowCartItems));
