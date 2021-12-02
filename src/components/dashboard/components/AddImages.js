import React, {Component} from "react";
import { getServer } from "../../../util";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import { resetWarningCache } from "prop-types";
import { notification } from "antd";
import UploadImages from "../../general/UploadImages";
import {Button} from "antd";
import {getProduct} from "../../../actions/productsAction";

class AddImages extends Component {
    constructor(props){
        super(props)
        this.state= {
        fileList: [],
        product: {
            name:""
        },

    }
}

    componentDidMount=()=>{
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.product)
        {
            const product = nextProps.product;
            this.setState({product});
        }
    }

    uploadFile=(e)=>{
        //FormData helps in organizing sets of key/value pairs
        //helps a lot in image input
        const data= new FormData
        const url = `${getServer()}/api/products/upload/thumbnail?productId=${this.props.match.params.id}`
        const target = e.target.file;
        //data.append adds an object (in this case, a key/value pair) to the last child of our FormData object
        data.append("file", target);
        axios({
            method:"post",
            url,
            data,
            config:{headers:{"Content-Type":"multipart/form-data"}}
        }).then((res)=>{
            console.log(res);
            if(res.status === 200)
            {
                notification.info({
                    message: `Image upload`,
                    description: res.data.msg,
                    placement:"topRight",
                  });
                
            }
        }).catch((err)=>{
            console.log(err)
        })
    };


    uploadImage=({id, file})=>{
        //FormData helps in organizing sets of key/value pairs
        //helps a lot in image input
        const data= new FormData
        const url = `${getServer()}/api/products/upload/thumbnail?productId=${id}&multiple=true`;
        const target = file.originFileObj;
        //data.append adds an object (in this case, a key/value pair) to the last child of our FormData object
        data.append("file", target);
        axios({
            method:"post",
            url,
            data,
            config:{headers:{"Content-Type":"multipart/form-data"}}
        }).then((res)=>{
            console.log(res);
            if(res.status === 200)
            {
                notification.info({
                    message: `Image upload`,
                    description: res.data.msg,
                    placement:"topRight",
                  });
                  this.setState({fileList:[]});
                
            }
        }).catch((err)=>{
            console.log(err)
        })
    };



    uploadImages = async (id) =>{
        const {fileList} = this.state;
        const request = fileList.map(file=>{
            this.uploadImage({id, file})
        });
        await Promise.all(request);
    }
    handleChange = ({ fileList }) => this.setState({ fileList });
    render(){
        
        return( <div>
        <h1>{this.state.product.name}</h1>
            <p className="lead">Update your thumbnail</p>
            <input type="file" name="file" onChange={this.uploadFile}/>
            <br/>
            <br/>
            <p className="lead">Add images of your product</p>
            <div>
                <UploadImages fileList={this.state.fileList} handleChange={this.handleChange}/>
                <Button type="primary" onClick={()=> this.uploadImages(this.props.match.params.id)}>Submit Images</Button>
            </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    //state.products is calling the reducer, state.products.product is calling the specific object inside the state
    product: state.products.product,
});

export default connect(mapStateToProps, {getProduct})(withRouter(AddImages));