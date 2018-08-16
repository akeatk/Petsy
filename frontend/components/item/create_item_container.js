import {connect} from 'react-redux';
import {createItem} from '../../actions/item_actions';
import Form from './form';

const mapStateToProps=state=>({
  item:{
    user_id:state.session.currentUser,
    name:'',
    price:1.00,
    quantity:1,
    description:'',
    photos:[]
  },
  title:'Add a new listing',
  currentUserId:state.session.currentUser,
  errors:null
});

const MapDispatchToProps=dispatch=>({
  action:formData=>dispatch(createItem(formData))
});

export default connect(mapStateToProps,MapDispatchToProps)(Form);
