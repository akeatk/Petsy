import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {getItems} from '../../actions/item_actions';
import StaticImg from '../static_img';


const mapStateToProps = (state) => {
  return {
    items:state.entities.items,
    users:state.entities.users,
    photos:state.entities.photos
  };
};

const MapDispatchToProps = dispatch => ({
  getItems: (type,offset)=>dispatch(getItems(type,offset))
});

class ItemSplash extends React.Component{
  constructor(props){
    super(props);
    this.state={offset:0,loaded:false};
  }
  componentDidMount(){
    this.props.getItems(0,0)
      .then(()=>{
        window.scrollTo(0, 0);
        this.setState({loaded:true});
      },()=>this.props.history.push('/'));
  }
  render(){
    if( !this.state.loaded || !this.props.items || !this.state.loaded)
      return null;
    return (
    <div className='item-index'>
      <div className='show-all-items'>
        {Object.keys(this.props.items).map((itemId)=>{
          let item = this.props.items[itemId];
          let photo = this.props.photos[item.photo_ids[0]];
          let name = item.name;
          let username = this.props.users[item.user_id].name;
          return (
            <Link key={itemId} to={`/listing/${itemId}`}>
              <div>
                <StaticImg key={itemId}
                  src={photo.photo_url}
                  width='185px' height='185px' />
                <div>
                </div>
                <h3>
                  {name.slice(0,25)}
                  {name.length > 25 ? '...' : null}
                </h3>
                <h4>{username}</h4>
                <h5>${parseFloat(item.price).toFixed(2)} per pet</h5>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ItemSplash));
