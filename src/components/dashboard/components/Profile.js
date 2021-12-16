import React, { useEffect, useState, Fragment } from "react";
import {
  getProfile,
  createProfile,
  deleteAccount,
} from "../../../actions/profileActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { decodeUser } from "../../../util/index";
import { Link } from "react-router-dom";
import { Modal, Button, message, Popconfirm } from "antd";

const Profile = (props) => {
  const [state, setState] = useState({
    profile: {
      socialMedia: {
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        youtube: "",
      },
    },
  });
  const [visibility, setVisible] = useState({ visible: false });

  useEffect(() => {
    console.log(props);
    props.getProfile(decodeUser().user.id);
  }, []);

  useEffect(() => {
    if (props && props.profile && props.profile.profile.address) {
      const profile = props.profile.profile;
      setState({
        profile,
        address: profile.address,
        bio: profile.bio,
        website: profile.website,
        facebook: profile.socialMedia.facebook,
        linkedin: profile.socialMedia.linkedin,
        youtube: profile.socialMedia.youtube,
        instagram: profile.socialMedia.instagram,
        twitter: profile.socialMedia.twitter,
      });
      //you can use {} in a setState to set a specific value of the state
    }
  }, [props]);
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (state.address.length <= 0) {
      return message.error("Your Address field is required");
    }
    if (state.bio.length <= 0) {
      return message.error("Your Bio field is required");
    }
    props.createProfile(state, props.history);
    window.location.reload(false);
  };

  const displayProfile = (profile) => {
    return (
      <div clas="container" style={{ padding: "10px" }}>
        <div className="custom-border">
          <div>
            <span>
              <label>
                <h4>Address: </h4>
              </label>
              <h4 className="inline-padding">{profile.address}</h4>
            </span>
          </div>
          <div>
            <span>
              <label>
                <h4>Website: </h4>
              </label>
              <h4 className="inline-padding">{profile.website}</h4>
            </span>
          </div>
          <div>
            <span>
              <label>
                <h4>Bio: </h4>
              </label>
              <h4 className="inline-padding">{profile.bio}</h4>
            </span>
          </div>
        </div>
        <br />
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
          <br />
          <button className="btn btn-primary" onClick={showModal}>
            Edit profile
          </button>
          <Popconfirm
            title="Are you sure to delete this account? All data will be deleted"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-primary">Delete Account</button>
          </Popconfirm>
        </div>
      </div>
    );
  };
  const showModal = () => {
    setVisible({
      visible: true,
    });
  };

  const handleOk = (e) => {
    console.log(e);
    setVisible({
      visible: false,
    });
  };

  const handleCancel = (e) => {
    setVisible({
      visible: false,
    });
  };

  const confirm = (e) => {
    e.preventDefault();
    props.deleteAccount(props.history);
    message.success("Account deleted successfully");
  };

  const cancel = (e) => {
    message.error("Account deletion averted");
  };

  const { name } = props.auth.user;
  return (
    <div className="container">
      <h2>Welcome, {name}!</h2>
      {state.profile.address ? (
        <Fragment>
          <h4>Your current profile</h4>
          {displayProfile(state.profile)}
        </Fragment>
      ) : (
        <Fragment>
          <span style={{ paddingRight: "2%" }}>
            You currently don't have a profile
          </span>
          <Link className="btn btn-primary" to="/dashboard/addProfile">
            Create a profile
          </Link>
        </Fragment>
      )}
      <Modal
        visible={visibility.visible}
        title="Edit profile"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>
            Submit
          </Button>,
        ]}
      >
        <form className="form">
          <div className="form-group modal-input">
            <input
              style={{ width: "450px" }}
              type="text"
              name="address"
              value={state.address}
              onChange={onChange}
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
              value={state.website}
              onChange={onChange}
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
              value={state.bio}
              onChange={onChange}
            ></textarea>
            <small className="form-text">Tell us a little about busines</small>
          </div>
          <br />
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="twitter"
              value={state.profile.twitter}
              onChange={onChange}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="facebook"
              value={state.profile.facebook}
              onChange={onChange}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="youtube"
              value={state.profile.youtube}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="linkedin"
              value={state.profile.linkedin}
              onChange={onChange}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="instagram"
              value={state.profile.instagram}
              onChange={onChange}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfile,
  createProfile,
  deleteAccount,
})(withRouter(Profile));
