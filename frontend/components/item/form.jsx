import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state=props.item;
  }
  componentDidMount(){
    if(this.props.title==='Update your listing')
      this.props.getEdit(this.props.match.params.itemId)
        .then(this.setState({//finish this after create is done
          user_id:this.props.item.user_id,
          name:this.props.item.name,
          price:this.props.item.price,
          quantity:this.props.item.quantity,
          description:this.props.item.description,
          photos:[],
          photo_ids:this.props.item.photo_ids
        }));
  }
  render(){
    if(!this.props.item)
      return null;
    if(this.props.currentUserId && this.props.item.user_id &&
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

            <div>
              <p>photo adding mechanism</p>
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
              <input type='text'/>
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
              <textarea/>
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
              <input type='text'/>
            </div>
          </div>
          <div>
            <div>
              <h4>Quantity *</h4>
              <p>For quantities greater than one, this listing will renew automatically until it sells out. You’ll be charged a $0.20 USD listing fee each time.</p>
            </div>
            <div>
              <input type='text'/>
            </div>
          </div>
        </div>
        <div className='item-footer'>
          <h2>Cancel</h2>
          <h3>Preview</h3>
          <h4>Save and continue</h4>
        </div>
      </form>
    );
  }
}

export default Form;
