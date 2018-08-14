import {connect} from 'react-redux';
import {createSession,guestLogin} from '../../actions/session_actions';
import Form from './form';
import {showSignup} from '../../actions/ui_actions';

const mapStateToProps = state => ({
  title:'Sign in to continue',
  fields:['field1','password'],
  labels:['Email','Password'],
  formType: 'Sign in',
  errors: state.errors.session
});

const MapDispatchToProps = dispatch => ({
  action: user=>dispatch(createSession(user)),
  guestLogin:()=>dispatch(guestLogin()),
  switch:()=>dispatch(showSignup())
});

export default connect(mapStateToProps,MapDispatchToProps)(Form);
