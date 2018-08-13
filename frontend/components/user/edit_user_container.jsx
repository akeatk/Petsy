import React from 'react';
import {connect} from 'react-redux';
import {Link,Redirect,withRouter} from 'react-router-dom';
import {showLogin} from '../../actions/ui_actions';
import {editUser,updateUser} from '../../actions/user_actions';

const mapStateToProps = state => ({
  user:state.entities.users[state.session.currentUser],
  currentUserId:state.session.currentUser
});

const MapDispatchToProps = dispatch => ({
  editUser: userId=>dispatch(editUser(userId)),
  updateUser: user=>dispatch(updateUser(user)),
  showLogin: ()=>dispatch(showLogin())
});

class EditUser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id:this.props.currentUserId,
      first_name:this.props.user.first_name,
      last_name:this.props.user.last_name,
      about:this.props.user.about
    };
    this.change=false;
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleInput=this.handleInput.bind(this);
  }
  componentDidMount(){
    this.props.editUser(this.props.currentUserId);
    this.state={
      id:this.props.currentUserId,
      first_name:this.props.user.first_name,
      last_name:this.props.user.last_name,
      about:this.props.user.about
    };
  }
  handleInput(str){
    return e=>{
      this.change=true;
      this.setState({[str]:e.target.value});
    };
  }
  handleSubmit(e){
    e.preventDefault();
    this.change=false;
    this.props.updateUser(this.state);
    window.scrollTo(0, 0);
  }
  verifyState(){
    if(!this.state.first_name)
      this.state.first_name=this.props.user.first_name;
    if(!this.state.last_name)
      this.state.last_name=this.props.user.last_name;
    if(!this.state.about)
      this.state.about=this.props.user.about;
  }
  nameField(){
    return(
      <div className='edit-name'>
        <h3>Your Name</h3>
        <div>
          <div>
            <label>
              First Name
              <br/>
            <input type='text' value={this.state.first_name || ''}
                onChange={this.handleInput('first_name')}/>
            </label>
            <label>
              Last Name
              <br/>
            <input type='text' value={this.state.last_name || ''}
                onChange={this.handleInput('last_name')}/>
            </label>
          </div>
          <h4>Be yourself. These fields are for your name, for public display throughout Etsy.</h4>
        </div>
      </div>
    );
  }
  render(){
    this.verifyState();
    if(!this.props.currentUserId){
      this.props.showLogin();
      return <Redirect to='/'/>;
    }
    return (
    <div className='edit-user'>
      <div className='edit-head'>
        <div>
          <h1>Your Public Profile</h1>
          <h2>Everything on this page can be seen by anyone</h2>
        </div>
        <Link to={`/people/${this.props.user.username}`}>View Profile</Link>
      </div>

      <div className='edit-fields'>
        <div className='edit-picture'>
          <h3>Profile Picture</h3>
          <img src={window.images.profileIcon} className='profile-icon'/>
        </div>
        {this.nameField()}
        <div className='edit-about'>
          <h3>About</h3>
          <div>
            <textarea value={this.state.about || ''} onChange={this.handleInput('about')}/>
          </div>
        </div>
      </div>
      {this.change ?
        <h4 className='change' onClick={this.handleSubmit}>Save Changes</h4> :
        <h4 className='no-change' >Save Changes</h4>
      }
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(EditUser));
