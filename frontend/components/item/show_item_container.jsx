import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {getItem} from '../../actions/item_actions';
import ReviewStars from '../review_stars';
import {ProfImg} from '../prof_img';


const mapStateToProps = (state,ownProps) => {
  let items=state.entities.items;
  let item= items ? items[ownProps.match.params.itemId] : null;
  let user= item ? state.entities.users[item.user_id] : null;
  return {
    items,
    item,
    user,
    photos:state.entities.photos
  };
};

const MapDispatchToProps = dispatch => ({
  getItem: itemId=>dispatch(getItem(itemId))
});

class ShowItem extends React.Component{
  constructor(props){
    super(props);
    this.state={showDescription:false,quantity:1,currentImg:0};
  }
  componentDidMount(){
    this.props.getItem(this.props.match.params.itemId)
      .then(()=>window.scrollTo(0, 0),()=>this.props.history.push('/'));
  }
  componentWillReceiveProps(newProps){
    if(newProps.match.params.itemId !== this.props.match.params.itemId)
      this.props.getItem(newProps.match.params.itemId)
        .then(()=>window.scrollTo(0, 0),()=>{
          window.scrollTo(0, 0);
          this.props.history.push('/');
        });
  }
  quantityOptions(quantity){
    let arr = [];
    for(let i = 1;i <= quantity;i++)
      arr.push(
        <option key={i}>
          {i}
        </option>
      );
    return arr;
  }
  render(){
    if(!this.props.item || !this.props.user || !this.props.user.item_ids)
      return null;
    if(parseInt(this.props.match.params.itemId) !== this.props.item.id)
      this.props.getItem(this.props.match.params.itemId)
        .then(()=>window.scrollTo(0, 0),()=>this.props.history.push('/'));
    if(this.props.item.quantity < 1)
      return <Redirect to='/'/>;
    return (
    <div className='show-item'>
      <div className='header'>
        <div className='left-header'>
          <ProfImg src={this.props.user.photo_url || window.images.profileIcon}
             length='75px' onClick={()=>this.props.history.push(`/people/${this.props.user.username}`)}/>
          <h1 onClick={()=>this.props.history.push(`/people/${this.props.user.username}`)}>
            {this.props.user.name}
          </h1>
        </div>
        <div className='right-header'>
          {this.props.user.item_ids.slice(0,4).map(itemId=>
            <ProfImg key={itemId}
              src={this.props.photos[this.props.items[itemId].photo_ids[0]].photo_url}
              length='69px' onClick={()=>
              {
                let name=this.props.items[itemId].name;
                if(name.length > 45){
                  name=name.slice(0,45).split(' ');
                  name.pop();
                  name=name.join('-');
                }
                else
                  name=name.split(' ').join('-');
                this.props.history.push(`/listing/${itemId}/${name}`);
              }
            }/>)
          }
          <div className='item-count'
              onClick={()=>this.props.history.push(`/people/${this.props.user.username}`)}>
            <h3>{this.props.user.item_count}</h3>
            <h4>items</h4>
          </div>
        </div>
      </div>
      <div className='body'>
        <div className='left-body'>
          <div className='item-images'>
            <img src={this.props.photos[this.props.item.photo_ids[this.state.currentImg]].photo_url}/>
          </div>
          <div className='item-description'>
            <h3>Description</h3>
            <p className={this.state.showDescription ? '' : 'cutoff'}>
              {this.props.item.description}
            </p>
          </div>
          <div className='item-reviews'>
            <div className='review-header'>
              <h3>Reviews</h3>
              <ReviewStars score={this.props.item.score}/>
              <h5>({this.props.item.num_scores})</h5>
            </div>
            <div className='reviews'>
              reviews
            </div>
          </div>
        </div>
        <div className='right-body'>
          <div className='item-info'>
            <h1>{this.props.item.name}</h1>
            <h2>${this.props.item.price}</h2>
            <form>
              <select defaultValue={1} onChange={(e)=>this.setState({quantity:e.currentTarget.value})}>
                {this.quantityOptions(this.props.item.quantity)}
              </select>
              <h5 onClick={()=>{}}>Add to Cart</h5>
            </form>
          </div>
          <div className='user-section'>
            <div className='user-info'>
              <ProfImg src={this.props.user.photo_url || window.images.profileIcon}
                 length='50px' onClick={()=>this.props.history.push(`/people/${this.props.user.username}`)}/>
              <p onClick={()=>this.props.history.push(`/people/${this.props.user.username}`)}>
                {this.props.user.name}
              </p>
            </div>
            <div className='user-items'>
              {this.props.user.item_ids.map(itemId=>{
                  let name=this.props.items[itemId].name;
                  if(name.length > 45){
                    name=name.slice(0,45).split(' ');
                    name.pop();
                    name=name.join('-');
                  }
                  else
                    name=name.split(' ').join('-');
                  return (
                    <Link key={itemId} to={`/listing/${itemId}/${name}`}>
                      <div>
                        <ProfImg key={itemId}
                          src={this.props.photos[this.props.items[itemId].photo_ids[0]].photo_url}
                          length='185px' />
                        <h3>
                          {this.props.items[itemId].name.slice(0,25)}
                          {this.props.items[itemId].name.length > 25 ? '...' : null}
                        </h3>
                        <h4>${this.props.items[itemId].price}</h4>
                      </div>
                    </Link>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>

    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowItem));
