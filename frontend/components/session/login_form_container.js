import {connect} from 'react-redux';
import {createSession,guestLogin} from '../../actions/session_actions';
import Form from './form';

const mapStateToProps = state => ({
  title:'Sign in to continue',
  fields:['field1','password'],
  labels:['Email or username','Password'],
  formType: 'Sign in',
  errors: state.errors.session
});

const MapDispatchToProps = dispatch => ({
  action: user=>dispatch(createSession(user)),
  guestLogin:()=>dispatch(guestLogin())
});

export default connect(mapStateToProps,MapDispatchToProps)(Form);
