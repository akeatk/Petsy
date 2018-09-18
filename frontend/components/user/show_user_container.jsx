import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import {getUsername} from '../../actions/user_actions';
import {showAbout, hideAbout} from '../../actions/ui_actions';
import StaticImg from '../static_img';


const mapStateToProps = (state,ownProps) => {
  let foundUsername;
  Object.keys(state.entities.users)
    .map((userId)=>state.entities.users[userId])
    .forEach((user)=>{
      if(user.username == ownProps.match.params.username)
        foundUsername = user;
    }
  );
  return {
    users:state.entities.users,
    user:foundUsername,
    currentUserId:state.session.currentUser,
    items:state.entities.items,
    photos:state.entities.photos
  };
};

const MapDispatchToProps = dispatch => ({
  getUsername: username=>dispatch(getUsername(username)),
  showAbout: ()=>dispatch(showAbout()),
  hideAbout: ()=>dispatch(hideAbout())
});

class ShowUser extends React.Component{
  constructor(props){
    super(props);
    this.state={showAbout:false,user:this.props.user};
  }
  componentDidMount(){
    this.props.getUsername(this.props.match.params.username)
      .then(()=>{
        let foundUsername;
        Object.keys(this.props.users).map((userId)=>
          this.props.users[userId]).forEach((user)=>{
            if(user.username === this.props.match.params.username)
              foundUsername = user;
          }
        );
        if(!foundUsername)
          this.props.history.push('/');
        this.setState({user:this.props.user});
      });

  }

  formatDate(date) {
    const months = {
      0: 'January',1: 'February',2: 'March',3: 'April',
      4: 'May',5: 'June',6: 'July',7: 'August',
      8: 'September',9: 'October',10: 'November',11: 'December',
    };
    const daysOfWeek = {
      0: 'Sunday',1: 'Monday',2: 'Tuesday',3: 'Wednesday',
      4: 'Thursday',5: 'Friday',6: 'Saturday',
    };
    const obj = new Date(date);
    const month = months[obj.getMonth()];
    const day = obj.getDate();
    const year = obj.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  about(){
    if(!this.props.user.about)
      return null;
    else if(this.props.user.about.length > 300){
      if(this.state.showAbout)
        return (
          <h3>{this.props.user.about}
            <p onClick={()=>this.setState({showAbout:false})}>Read Less</p>
          </h3>
        );
      else
        return (
          <h3>{this.props.user.about.slice(0,300)}&nbsp;...
            <p onClick={()=>this.setState({showAbout:true})}>Read More</p>
          </h3>
        );
    }
    else
      return (<h3>{this.props.user.about}</h3>);
  }
  render(){
    if(!this.props.user || !this.props.user.item_ids || !this.props.items){
        this.props.getUsername(this.props.match.params.username)
          .then(()=>{
            let foundUsername;
            Object.keys(this.props.users).map((userId)=>
              this.props.users[userId]).forEach((user)=>{
                if(user.username === this.props.match.params.username)
                  foundUsername = user;
              }
            );
            if(!foundUsername)
              this.props.history.push('/');
            this.setState({user:this.props.user});
          });
      return null;
    }
    return (
      <div className='user-show-page'>
        <div className='show-user'>
          <StaticImg src={this.props.user.photo_url || window.images.profileIcon}
             width='15vw' height='15vw'/>
          <div className='prof-name'>
            <h1>{this.props.user.name}</h1>
            {(this.props.currentUserId &&
              this.props.users[this.props.currentUserId].username === this.props.match.params.username ?
            <Link to='/your/profile'><img src={window.images.pencilIcon}/>&nbsp;&nbsp;Edit Profile</Link> : null)}
          </div>
          <div className='prof-about'>
            <h2>About</h2>
            {this.about()}
            <p>Joined {this.formatDate(this.props.user.createdAt)}</p>
          </div>
        </div>
        <div className='show-user-items'>
          {this.props.user.item_ids.map((itemId)=>{
            let item = this.props.items[itemId];
            let photo = this.props.photos[item.photo_ids[0]];
            return (
              <Link key={itemId} to={`/listing/${itemId}`}>
                <div>
                  <StaticImg src={photo.photo_url} width='15vw' height='12vw'/>
                  <h3>
                    {this.props.items[itemId].name.slice(0,25)}
                    {this.props.items[itemId].name.length > 25 ? '...' : null}
                  </h3>
                  <h4>${this.props.items[itemId].price}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(ShowUser));
