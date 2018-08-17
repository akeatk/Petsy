import {connect} from 'react-redux';
import {createItem} from '../../actions/item_actions';
import Form from './form';
import {getEditItem} from '../../actions/item_actions';

const mapStateToProps=state=>({
  title:'Add a new listing',
  currentUserId:state.session.currentUser,
  errors:null
});

const MapDispatchToProps=dispatch=>({
  action:formData=>dispatch(createItem(formData)),
  getEditItem:id=>dispatch(getEditItem(id))
});

export default connect(mapStateToProps,MapDispatchToProps)(Form);
