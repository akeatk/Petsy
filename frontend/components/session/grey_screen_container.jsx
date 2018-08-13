import React from 'react';
import {connect} from 'react-redux';
import RegisterFormContainer from '../session/register_form_container';
import LoginFormContainer from '../session/login_form_container';
import {showNone} from '../../actions/ui_actions';

const mapStateToProps = state => ({
  greyScreen:state.ui.greyScreen
});

const MapDispatchToProps = dispatch => ({
  showNone:()=>dispatch(showNone())
});

class GreyScreen extends React.Component{
  constructor(props){
    super(props);
    this.display=this.display.bind(this);
    this.clickOutside=this.clickOutside.bind(this);
  }
  clickOutside(e){
    if(e.target.className === 'modalBackdrop')
      this.props.showNone();
  }
  display(){
    switch(this.props.greyScreen){
      case 'login':
        return (
          <div className='modalBackdrop' onClick={this.clickOutside}><LoginFormContainer/></div>);
      case 'signup':
        return (
          <div className='modalBackdrop' onClick={this.clickOutside}><RegisterFormContainer/></div>);
      default:
        return null;
    }
  }
  render(){
    return (
      <this.display/>
    );
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(GreyScreen);
