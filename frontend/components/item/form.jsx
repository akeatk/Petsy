import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {ProfImg} from '../prof_img';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state={//finish this after create is done
      user_id:'',
      name:'',
      price:'',
      quantity:'',
      description:'',
      photos:[],
      new_files:[],
      photo_ids:null,
      photo_urls:[],
      loaded:false
    };
    this.handleFile=this.handleFile.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount(){
    if(this.props.title==='Update your listing'){
      this.props.getEditItem(this.props.match.params.itemId)
        .then(()=>{
            if(parseInt(this.props.item.user_id) !== this.props.currentUserId)
              this.props.history.push('/');
            this.state.user_id=this.props.item.user_id;
            this.state.name=this.props.item.name;
            this.state.price=this.props.item.price;
            this.state.quantity=this.props.item.quantity;
            this.state.description=this.props.item.description;
            this.state.photos=this.props.item.photo_ids;
            this.state.photo_urls=this.props.item.photo_ids.map((id)=>this.props.photos[id].image_url);
            this.setState({loaded:true});
            window.scrollTo(0, 0);
          }
          ,()=>this.props.history.push('/'));
    }
    else {
      this.setState({loaded:true});
    }
  }
  handleInput(str){
    return (e)=>this.setState({[str]:e.currentTarget.value});
  }
  handleFile(e){
    const file=e.currentTarget.files[0];
    const fileReader=new FileReader();
    fileReader.onloadend=()=>{
      this.setState({
        photo_urls:this.state.photo_urls.concat([fileReader.result]),
        new_files:this.state.new_files.concat([file])
      });
    };
    if(file){
      fileReader.readAsDataURL(file);
    }
  }
  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    // photo_url:this.props.user.photo
    if(this.props.title==='Update your listing'){
      formData.append('item[id]',this.props.item.id);
    }
    formData.append('item[user_id]',this.props.currentUserId);
    formData.append('item[name]',this.state.name);
    formData.append('item[description]',this.state.description);
    formData.append('item[price]',(Math.floor(parseFloat(this.state.price)*100))/100);
    formData.append('item[quantity]',parseInt(this.state.quantity));
    if(this.state.new_files.length > 0){
      this.state.new_files.forEach((file)=>{
        formData.append(`new_files[]`,file);
      });
    }
    this.props.action(formData)
      .then((action)=>{

        this.props.history.push(`/listing/${action.payload.item.id}`);
        // this.props.history.push(`/api`)
      });
  }
  render(){
    if(!this.state.loaded)
      return null;
    if(this.props.currentUserId && this.props.item && this.props.item.user_id &&
        this.props.currentUserId !== this.props.item.user_id)
      return <Redirect to='/'/>;
    return(
      <form className='item-form'>
        <h1>{this.props.title}</h1>
        <div className='item-photos'>
          <h2>Photos</h2>
          <h3>Add as many as you can so buyers can see every detail.</h3>
          <div>
            <div>
              <h4>Photos *</h4>
              <p>Use up to ten photos to show your item's most important qualities.</p>
              <p/>
              <p>Tips:</p>
              <p/>
              <p>* Use natural light and no flash.</p>
              <p>* Include a common object for scale.</p>
              <p>* Show the item being held, worn, or used.</p>
              <p>* Shoot against a clean, simple background.</p>
            </div>

            <div className='image-previews'>
              {this.state.photo_urls.map((url)=>(
                  <ProfImg key={url} src={url}
                     length='100px'/>
              ))}
              <div className='file-box'>
                <input type='file' onChange={this.handleFile}/>
              </div>
            </div>
          </div>
        </div>

        <div className='item-details'>
          <h2>Listing Details</h2>
          <h3>Tell the world all about your item and why they’ll love it.</h3>
          <div>
            <div>
              <h4>Title *</h4>
              <p>Include keywords that buyers would use to search for your item.</p>
            </div>
            <div>
              <input type='text' value={this.state.name} onChange={this.handleInput('name')}/>
            </div>
          </div>
          <div>
            <div>
              <h4>Description *</h4>
              <p>Start with a brief overview that describes your item's finest features.</p>
              <p/>
              <p>List details like dimensions and key features in easy-to-read bullet points.</p>
              <p/>
              <p>Tell buyers a bit about your process or the story behind this item.</p>
            </div>
            <div>
              <textarea value={this.state.description} onChange={this.handleInput('description')}/>
            </div>
          </div>
        </div>

        <div className='item-pricing'>
          <h2>Inventory and pricing</h2>
          <div>
            <div>
              <h4>Price *</h4>
              <p>Factor in the costs of materials and labor, plus any related business expenses. Consider the total price buyers will pay too—including shipping.</p>
            </div>
            <div>
              <input type='text' value={this.state.price} onChange={this.handleInput('price')}/>
            </div>
          </div>
          <div>
            <div>
              <h4>Quantity *</h4>
              <p>For quantities greater than one, this listing will renew automatically until it sells out. You’ll be charged a $0.20 USD listing fee each time.</p>
            </div>
            <div>
              <input type='text' value={this.state.quantity} onChange={this.handleInput('quantity')}/>
            </div>
          </div>
        </div>
        <div className='item-footer'>
          <h4 onClick={this.handleSubmit}>Save and continue</h4>
        </div>
      </form>
    );
  }
}

export default Form;
