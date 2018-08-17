import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateItem,getItem,getEditItem} from '../../actions/item_actions';
import Form from './form';

const mapStateToProps=(state,ownProps)=>{
  return({
    item:state.entities.items[ownProps.match.params.itemId],
    title:'Update your listing',
    currentUserId:state.session.currentUser,
    photos:state.entities.photos
});
};

const MapDispatchToProps=dispatch=>({
  action:formData=>dispatch(updateItem(formData)),
  getEditItem:id=>dispatch(getEditItem(id))
});

export default withRouter(connect(mapStateToProps,MapDispatchToProps)(Form));
