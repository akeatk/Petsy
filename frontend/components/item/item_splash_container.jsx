import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {getItems} from '../../actions/item_actions';
import {ProfImg} from '../prof_img';


const mapStateToProps = (state) => {
  return {
    items:state.entities.items,
    users:state.entities.users,
    photos:state.entities.photos
  };
};

const MapDispatchToProps = dispatch => ({
  getItems: ()=>dispatch(getItems())
});

class ShowItem extends React.Component{
  constructor(props){
    super(props);
    this.state={num_items:Object.keys(this.props.items).length};
  }
  componentDidMount(){
    this.props.getItem()
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
    if(!this.props.items)
      return null;
    return (
    <div className='item-index'>
      
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowItem));
