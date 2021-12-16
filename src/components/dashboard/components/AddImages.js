import React, { useState, useEffect } from "react";
import { getServer } from "../../../util";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import { resetWarningCache } from "prop-types";
import { notification } from "antd";
import { UploadImages } from "../../general/UploadImages";
import { Button } from "antd";
import { getProduct } from "../../../actions/productsAction";

const AddImages = (props) => {
  const [state, setState] = useState({
    fileList: [],
    product: {
      name: "",
    },
  });

  useEffect(() => {
    const id = props.match.params.id;
    props.getProduct(id);
  }, []);

  useEffect(() => {
    if (props && props.product) {
      const product = props.product;
      setState({ ...state, product: product });
    }
  }, [props]);

  const uploadFile = (e) => {
    //FormData helps in organizing sets of key/value pairs
    //helps a lot in image input
    const data = new FormData();
    const url = `${getServer()}/api/products/upload/thumbnail?productId=${
      props.match.params.id
    }`;
    const target = e.target.file;
    //data.append adds an object (in this case, a key/value pair) to the last child of our FormData object
    data.append("file", target);
    axios({
      method: "post",
      url,
      data,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          notification.info({
            message: `Image upload`,
            description: res.data.msg,
            placement: "topRight",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = ({ id, file }) => {
    //FormData helps in organizing sets of key/value pairs
    //helps a lot in image input
    const data = new FormData();
    const url = `${getServer()}/api/products/upload/thumbnail?productId=${id}&multiple=true`;
    const target = file.originFileObj;
    //data.append adds an object (in this case, a key/value pair) to the last child of our FormData object
    data.append("file", target);
    axios({
      method: "post",
      url,
      data,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          notification.info({
            message: `Image upload`,
            description: res.data.msg,
            placement: "topRight",
          });
          setState({ ...state, fileList: [] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImages = async (id) => {
    const { fileList } = state;
    const request = fileList.map((file) => {
      uploadImage({ id, file });
    });
    await Promise.all(request);
  };
  const handleChange = ({ fileList }) => setState({ ...state, fileList });

  return (
    <div>
      <h1>{state.product.name}</h1>
      <p className="lead">Update your thumbnail</p>
      <input type="file" name="file" onChange={uploadFile} />
      <br />
      <br />
      <p className="lead">Add images of your product</p>
      <div>
        <UploadImages fileList={state.fileList} handleChange={handleChange} />
        <Button
          type="primary"
          onClick={() => uploadImages(props.match.params.id)}
        >
          Submit Images
        </Button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  //state.products is calling the reducer, state.products.product is calling the specific object inside the state
  product: state.products.product,
});

export default connect(mapStateToProps, { getProduct })(withRouter(AddImages));
