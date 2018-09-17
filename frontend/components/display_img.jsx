import React from 'react';

class DisplayImg extends React.Component{
  constructor(props){
    super(props);
    this.state={ready:false};

    this.imgRatio=null;
    this.width = parseInt(props.width);

    this.img = new Image();
    this.img.onload = ()=>{
      this.imgRatio = this.img.height / this.img.width;

      if(this.imgRatio > 2)
        this.height = this.width * 2;
      else if(this.imgRatio < 1/2)
        this.height = this.width / 2;
      else
        this.height = this.width * this.imgRatio;

      this.divStyle={
        minWidth:this.width,
        maxWidth:this.width,
        width:this.width,
        minHeight:this.height,
        maxHeight:this.height,
        height:this.height
      };
      this.setState({ready:true})
    }
    this.img.src = this.props.src;

    this.divStyle={};
    this.height=0;

  }
  render(){
    if(!this.state.ready)
      return null;
    if(this.imgRatio > 1){
      if(this.imgRatio < 2)
        return (
          <div id='flat-image'
            className={this.props.className}
            style={this.divStyle} onClick={this.props.onClick}>
            <img src={this.props.src} style={{height:this.height}}/>
          </div>
        );
      return (
        <div id='tall-image'
          className={this.props.className}
          style={this.divStyle} onClick={this.props.onClick}>
          <img src={this.props.src} style={{width:this.width}}/>
        </div>
      );
    }
    else if(this.imgRatio > 1/2)
      return (
        <div id='tall-image'
          className={this.props.className}
          style={this.divStyle} onClick={this.props.onClick}>
          <img src={this.props.src} style={{width:this.width}}/>
        </div>
      );
    return (
      <div id='flat-image'
        className={this.props.className}
        style={this.divStyle} onClick={this.props.onClick}>
        <img src={this.props.src} style={{height:this.height}}/>
      </div>
    );
  }
}

export default DisplayImg;
