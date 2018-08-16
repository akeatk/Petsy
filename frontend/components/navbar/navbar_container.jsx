import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {showLogin, showSignup,clickDropdown} from '../../actions/ui_actions';
import {deleteSession} from '../../actions/session_actions';
import {getUser} from '../../actions/user_actions';
import {ProfImg} from '../prof_img';

const mapStateToProps = state => ({
  currentUserId:state.session.currentUser,
  currentUser: state.entities.users[state.session.currentUser],
  dropdown:state.ui.dropdown
});

const MapDispatchToProps = dispatch => ({
  showLogin:()=>dispatch(showLogin()),
  showSignup:()=>dispatch(showSignup()),
  deleteSession:()=>dispatch(deleteSession()),
  clickDropdown:()=>dispatch(clickDropdown()),
  getUser:userId=>dispatch(getUser(userId))
});

class Form extends React.Component {
  constructor(props){
    super(props);
    this.clickProfile = this.clickProfile.bind(this);
    this.test=this.test.bind(this);
  }
  componentWillMount(){
    this.props.getUser(this.props.currentUserId);
  }
  clickProfile(e){
    e.stopPropagation();
    this.props.clickDropdown();
  }
  test(e){
    this.props.history.push('/');
  }
  profileDropdown(){
    if(this.props.dropdown)
      return  (
        <div className='profile-dropdown'>
          <Link to={`/people/${this.props.currentUser.username}`}
              autoFocus='{this.props.dropdown}'
              onClick={()=>{
                this.clickProfile;
                this.props.getUser(this.props.currenUserId);}}>
            <div id='dropdown-profile'>
              <ProfImg src={this.props.currentUser.photo_url || window.images.profileIcon}
                 round={true} length='50px'/>
              <div>
                  <h2>
                    {this.props.currentUser.name}</h2>
                  <h3>
                    View profile&nbsp;&nbsp;&nbsp;
                    <p>></p>
                  </h3>
              </div>
            </div>
          </Link>

          <div className='dropdown-el' onClick={()=>{
              this.props.deleteSession();
              this.props.history.push(`/`);}}>
            <p>Sign out</p>
          </div>
        </div>
      );
    else
      return null;
  }
  rightNav(){
    if(this.props.currentUserId)
      return (
        <div className='right-nav'>
          <Link to='/' className='nav-link'>
            <div className='home-nav'>
              <img src={window.images.homeIcon}/>
              <p>Home</p>
            </div>
          </Link>

          <div className='nav-link' onClick={this.test}>
            <div className='fav-nav'>
              <img src={window.images.favIcon}/>
              <p>Favorites</p>
            </div>
          </div>

          <Link to='/your/listings/create' className='nav-link'>
            <div className='shop-nav'>
              <img src={window.images.shopIcon}/>
              <p>Your shop</p>
            </div>
          </Link>

          <div className='nav-link' onClick={this.clickProfile}>
            <div className='prof-nav'>
              <div>
                <ProfImg src={this.props.currentUser.photo_url || window.images.profileIcon}
                  round={true} length='24px'/>
                <div className='shader'/>
              </div>
              <p>You ▼</p>
            </div>
            {this.profileDropdown()}
          </div>

          <div className='nav-link'>
            <div className='cart-nav'>
              <img src={window.images.cartIcon}/>
              <p className='text-grey'>Cart</p>
            </div>
          </div>
        </div>
      );
    else
      return(
        <div className='right-nav'>
          <div className='signup-button'>
            <p onClick={this.props.showSignup}>Register</p>
          </div>
          <div className='login-button'>
            <p onClick={this.props.showLogin}>Sign in</p>
          </div>

          <div className='nav-link'>
            <div className='cart-nav'>
              <img src={window.images.cartIcon}/>
              <p className='text-grey'>Cart</p>
            </div>
          </div>
        </div>
      );
  }
  render(){
    return(
      <div className='navbar'>
        <div>
          <div className='left-nav'>
            <Link to='/'><p className='logo'>Etsyclone</p></Link>
          </div>

          {this.rightNav()}
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,MapDispatchToProps)(Form));
