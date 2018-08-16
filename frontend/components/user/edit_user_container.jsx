import React from 'react';
import {connect} from 'react-redux';
import {Link,Redirect,withRouter} from 'react-router-dom';
import {showLogin} from '../../actions/ui_actions';
import {editUser,updateUser} from '../../actions/user_actions';
import {ProfImg} from '../prof_img';

const mapStateToProps = state => {
  return({
  user:state.entities.users[state.session.currentUser],
  currentUserId:state.session.currentUser
});
};

const MapDispatchToProps = dispatch => ({
  editUser: userId=>dispatch(editUser(userId)),
  updateUser: user=>dispatch(updateUser(user)),
  showLogin: ()=>dispatch(showLogin())
});

class EditUser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id:this.props.currentUserId || "",
      first_name:this.props.user.first_name || "",
      last_name:this.props.user.last_name || "",
      about:this.props.user.about || "",
      photo_url:this.props.user.photo_url || null,
      change:false,
      changed:false
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleInput=this.handleInput.bind(this);
    this.handleFile=this.handleFile.bind(this);
  }
  componentDidMount(){
    this.props.editUser(this.props.currentUserId).then(()=>{
      this.setState({
        id:this.props.currentUserId,
        first_name:this.props.user.first_name,
        last_name:this.props.user.last_name,
        about:this.props.user.about,
        photo_url:this.props.user.photo_url || null,
        change:false,
        changed:false
      });
    });
  }
  handleInput(str){
    return e=>{
      this.state.change=true;
      this.setState({[str]:e.target.value});
    };
  }
  handleFile(e){
    this.state.change=true;
    const file=e.currentTarget.files[0];
    const fileReader=new FileReader();
    fileReader.onloadend=()=>{
      let img = new Image();
      img.src=fileReader.result;
      console.log('width = ',img.width);
      this.setState({photo:file, photo_url:fileReader.result});
    };
    if(file){
      fileReader.readAsDataURL(file);
    }
  }
  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    // photo_url:this.props.user.photo
    formData.append('user[id]',this.state.id);
    formData.append('user[first_name]',this.state.first_name);
    formData.append('user[last_name]',this.state.last_name);
    formData.append('user[about]',this.state.about);
    if(this.state.photo)
      formData.append('user[photo]',this.state.photo);

    this.props.updateUser(formData)
      .then(()=>{
        this.setState({change:false,changed:true});
        window.scrollTo(0, 0);
      });
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
            <input type='text' value={this.state.first_name}
                onChange={this.handleInput('first_name')}/>
            </label>
            <label>
              Last Name
              <br/>
            <input type='text' value={this.state.last_name}
                onChange={this.handleInput('last_name')}/>
            </label>
          </div>
          <h4>Be yourself. These fields are for your name, for public display throughout Etsy.</h4>
        </div>
      </div>
    );
  }
  render(){
    return (
    <div className='edit-user'>
      {this.state.changed ? <h5>Your changes have been saved.</h5> : null}
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
          <div>
            <input type='file' onChange={this.handleFile}/>
              <ProfImg src={this.state.photo_url || window.images.profileIcon}
                round={true} length='160px'/>
          </div>
        </div>
        {this.nameField()}
        <div className='edit-about'>
          <h3>About</h3>
          <div>
            <textarea value={this.state.about} onChange={this.handleInput('about')}/>
          </div>
        </div>
      </div>
      {this.state.change ?
        <h4 className='change' onClick={this.handleSubmit}>Save Changes</h4> :
        <h4 className='no-change' >Save Changes</h4>
      }
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(EditUser));
