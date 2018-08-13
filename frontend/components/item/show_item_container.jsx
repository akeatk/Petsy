import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {getItem} from '../../actions/item_actions';



const mapStateToProps = (state,ownProps) => {
  let items=state.entities.items;
  let item=items[ownProps.match.params.userId];
  return {
    items,
    item,
    user:state.entities.user[item.user_id],
  };
};

const MapDispatchToProps = dispatch => ({
  getItem: itemId=>dispatch(getItem(itemId)),
});

class ShowItem extends React.Component{
  componentDidMount(){
    this.props.getItem(this.props.match.params.itemId)
    this.props.getUsername(this.props.match.params.username);
    if(this.props.user && this.props.user.about && this.props.user.about.length > 300)
      this.props.showAbout();
    else
      this.props.hideAbout();

    let foundUsername;
    Object.keys(this.props.users).map((userId)=>
      this.props.users[userId]).forEach((user)=>{
        if(user.username == this.props.match.params.username)
          foundUsername = user;
      }
    );
    if(!foundUsername)
      this.props.history.push('/');
  }
  render(){
    if(!this.props.user)
      return null;
    return (
    <div className='show-item'>
      <div className='header'>
        <img src={window.images.profileIcon} className='profile-icon'/>
      </div>
      <div className='body'>
        <div className='left-body'>
          <div className='item-images'>
            item images
          </div>
          <div className='item-description'>
            item description
          </div>
          <div className='item-reviews'>
            item reviews
          </div>
        </div>
        <div className='right-body'>
          rightbody
        </div>
      </div>
      <img src={window.images.profileIcon} className='profile-icon'/>
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowItem));
