import React from 'react';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    for(let i = 0;i < this.props.fields.length;i++){
        this.state[this.props.fields[i]]='';
    }
    this.handleInput=this.handleInput.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clearPW=false;
  }
  handleInput(type){
    return (e)=>(this.setState({[type]:e.target.value}));
  }
  handleSubmit(e){
    e.preventDefault();

    this.props.action(this.state).then(this.resetState);
  }
  resetState(){
    for(let field in this.state){
      this.setState({[field]:''});
    }
  }
  render(){
    if(this.props.errors['field1'] && !this.props.errors['password'])
      if(!this.clearPW){
        this.state['password']='';
        this.clearPW=true;
      }
    else if(!this.props.errors['field1'] || this.props.errors['password'])
      this.clearPW=false;
    return(
      <form  className='modalForm' onSubmit={this.handleSubmit}>
        <h1>{this.props.title}</h1>
        {this.props.description ? <h2>{this.props.description}</h2> : null}
        {this.props.labels.map((label,idx)=>{
          let func = () => {
            if(this.props.errors[this.props.fields[idx]])
              return <p>{this.props.errors[this.props.fields[idx]]}</p>;
            else
              return null;
          };
          return (
          <label key={idx}
            className={!!this.props.errors[this.props.fields[idx]] ?
              "red-border" : ''}>
            {label}&nbsp;<a className='text-orange'>*</a><br/>
            <input
              type={this.props.fields[idx]==='password' ? 'password' : 'text'}
              onChange={this.handleInput(this.props.fields[idx])}
              value={this.state[this.props.fields[idx]]}
              autofocus={idx === 0 ? 'true' : 'false'}
            />
            <br/>
            {func()}
          </label>
          );
        })}
        <h3 onClick={this.handleSubmit}>{this.props.formType}</h3>
        <div className='or'>
          <p>OR</p>
        </div>
        <h4 onClick={this.props.guestLogin}>Continue as Guest</h4>
        <button type='submit' value=''/>
        <p>
          By clicking Continue as Guest, you will log in as a default guest account,
          which will allow you to utilize some functions that may only be accessed while logged in.
          The changes may or may not stay after you log out of the guest account.
        </p>
      </form>
    );
  }
}

export default Form;
