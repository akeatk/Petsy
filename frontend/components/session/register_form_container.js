import {connect} from 'react-redux';
import {createUser,guestLogin} from '../../actions/session_actions';
import Form from './form';

const mapStateToProps = state => ({
  title:'Create your account',
  description:'Registration is easy.',
  fields:['email','first_name','password'],
  labels:['Email address','First name','Password'],
  formType: 'Register',
  errors: state.errors.session
});

const MapDispatchToProps = dispatch => ({
  action: user=>dispatch(createUser(user)),
  guestLogin:()=>dispatch(guestLogin())
});

export default connect(mapStateToProps,MapDispatchToProps)(Form);
