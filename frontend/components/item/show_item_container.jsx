import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {getItem} from '../../actions/item_actions';



const mapStateToProps = (state,ownProps) => {
  console.log('mapStateToProps');
  console.log(state);
  let items=state.entities.items;
  let item= items ? items[parseInt(ownProps.match.params.itemId)] : null;
  let user= item ? state.entities.user[item.user_id] : null;
  console.log(items);
  console.log(ownProps.match.params.itemId);
  console.log(item);
  console.log(user);
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
    console.log('did mount');
    this.props.getItem(parseInt(this.props.match.params.itemId));
  }
  componentDidUpdate(){
    console.log('did update');
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
          rightbody
        </div>
      </div>
      <img src={window.images.profileIcon} className='profile-icon'/>
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowItem));
