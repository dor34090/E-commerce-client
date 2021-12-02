import React, {Component, Fragment, useState} from "react";
import { getProfile, createProfile, deleteAccount } from "../../../actions/profileActions";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {decodeUser} from "../../../util/index";
import {Link} from "react-router-dom";
import { Modal, Button, message, Popconfirm } from 'antd';



class Profile extends Component {

constructor(props){
    super(props)
    this.state={
        profile:{
            socialMedia:{
                facebook:"",
                twitter:"",
                linkedin:"",
                instagram:"",
                youtube:"",
            }
          
        },
        visibility:false,
        
    };
}

    componentWillMount(){
        this.props.getProfile(decodeUser().user.id);
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.profile && nextProps.profile.profile.address)
        {
            const profile= nextProps.profile.profile;
            this.setState({profile, address: profile.address,
            bio: profile.bio,
            website: profile.website,
            facebook: profile.socialMedia.facebook,
            linkedin: profile.socialMedia.linkedin,
            youtube: profile.socialMedia.youtube,
            instagram: profile.socialMedia.instagram,
            twitter: profile.socialMedia.twitter});
            //you can use {} in a setState to set a specific value of the state
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };

    onSubmit = (e) => {
        e.preventDefault();
    
        if (this.state.address.length <= 0) {
          return message.error("Your Address field is required");
        }
        if (this.state.bio.length <= 0) {
          return message.error("Your Bio field is required");
        }
        this.props.createProfile(this.state, this.props.history);
        window.location.reload(false);
      };

    displayProfile=(profile)=>{
        return(
            <div clas="container" style={{padding:"10px"}}>
            <div className="custom-border">
                <div>
                    <span>
                        <label><h4>Address: </h4></label><h4 className="inline-padding">{profile.address}</h4>
                    </span>
                </div>
            <div>
                <span>
                    <label><h4>Website: </h4></label><h4 className="inline-padding">{profile.website}</h4>
                </span>
            </div>
            <div>
                <span>
                    <label><h4>Bio: </h4></label><h4 className="inline-padding">{profile.bio}</h4>
                </span>
            </div>
            </div>
            <br/>
            <div className="custom-border">
            <h4>Social media links</h4>
            <div>
              
                <ul>
                    <li>   
                    <h5>{profile.socialMedia.facebook}</h5>
                    </li>
                    <li>
                    <h5>{profile.socialMedia.twitter}</h5>
                    </li>
                    <li>
                    <h5>{profile.socialMedia.linkedin}</h5>
                    </li>
                    <li>
                    <h5>{profile.socialMedia.instagram}</h5>
                    </li>
                    <li>
                    <h5>{profile.socialMedia.youtube}</h5>
                    </li>
                </ul>
              
            </div>
            <br/>
            <button className="btn btn-primary" onClick={this.showModal} >
             Edit profile   
            </button>
            <Popconfirm
              title="Are you sure to delete this account? All data will be deleted"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-primary"  >
             Delete Account   
            </button>
            </Popconfirm>
            
            </div>
            </div>
        )
    };
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      };

      confirm=(e)=>{
        e.preventDefault();
        this.props.deleteAccount(this.props.history);
        console.log("1");
        message.success("Account deleted successfully");
      };

      cancel=(e)=>{
        message.error("Account deletion averted");
      }
   

    render () {
        
        const {name} = this.props.auth.user
        return(
            <div className="container">
                <h2>Welcome, {name}!</h2>
                {this.state.profile.address ? (<Fragment>
                    <h4>Your current profile</h4>
                    {this.displayProfile(this.state.profile)}
                </Fragment>
                    ) : (
                    <Fragment>
                    <span style={{paddingRight:"2%"}}>You currently don't have a profile</span>
                    <Link className="btn btn-primary" to="/dashboard/addProfile">Create a profile</Link>
                </Fragment>)}
                <Modal
          visible={this.state.visible}
          title="Edit profile"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary"  onClick={this.onSubmit}>
              Submit
            </Button>
          ]}
        >
           <form className="form">
            <div className="form-group modal-input">
              <input
                style={{ width: "450px" }}
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.onChange}
              />
              <small className="form-text">
                Give us the address of your company
              </small>
            </div>
            <div className="form-group modal-input">
              <input
                style={{ width: "450px" }}
                type="text"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
              />
              <small className="form-text">
                Complete if you have a company website
              </small>
            </div>
            <br />
            <div className="form-group">
              <textarea
                style={{ width: "450px" }}
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
              ></textarea>
              <small className="form-text">
                Tell us a little about busines
              </small>
            </div>
            <br />
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="twitter"
                value={this.state.profile.twitter}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="facebook"
                value={this.state.profile.facebook}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="youtube"
                value={this.state.profile.youtube}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="linkedin"
                value={this.state.profile.linkedin}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="instagram"
                value={this.state.profile.instagram}
                onChange={this.onChange}
              />
            </div>
          </form>
        </Modal>
                
            </div>
        )
    };
};

const mapStateToProps=(state)=>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getProfile, createProfile, deleteAccount})(withRouter(Profile));