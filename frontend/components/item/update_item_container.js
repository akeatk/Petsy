import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateItem,getItem} from '../../actions/item_actions';
import Form from './form';

const mapStateToProps=(state,ownProps)=>({
  item:state.entities.items[ownProps.match.params.itemId],
  title:'Update your listing',
  currentUserId:state.session.currentUser,
  photo:state.entities.photos
});

const MapDispatchToProps=dispatch=>({
  action:formData=>dispatch(updateItem(formData)),
  getItem:itemId=>dispatch(getItem(itemId))
});

export default withRouter(connect(mapStateToProps,MapDispatchToProps)(Form));
