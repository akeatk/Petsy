import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {getItem} from '../../actions/item_actions';



const mapStateToProps = (state,ownProps) => {
  let items=state.entities.items;
  let item= items ? items[ownProps.match.params.itemId] : null;
  let user= item ? state.entities.users[item.user_id] : null;
  return {
    items,
    item,
    user
  };
};

const MapDispatchToProps = dispatch => ({
  getItem: itemId=>dispatch(getItem(itemId))
});

class ShowItem extends React.Component{
  componentDidMount(){
    this.props.getItem(this.props.match.params.itemId);
  }
  componentDidUpdate(){
    if(!this.props.item)
      this.props.history.push('/');
  }
  render(){
    if(!this.props.item)
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
          <div className='item-info'>
            <h1>Item name</h1>
            <h2>item price</h2>
          </div>
        </div>
      </div>
      <img src={window.images.profileIcon} className='profile-icon'/>
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowItem));
