import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../Actions/Actions";
import { storage, postsDB } from "../../firebase";
import Cropper from '../../widgets/image-resize';
import Error  from "./Error";
import "./Create.css";
import { useHistory } from "react-router-dom";


class Create extends Component {

    constructor(props){
        super(props);
        //set temporary state prob change later because of redux
        this.state = {
            image: null,
            url: "",
            caption:"",
            city:"Noho",
            region:"Cali",
            error:"",
            date:""
        };  
    }

    //change handling function
    handleChange = async (e) => {
        let canvas = document.querySelector("#imagePreview")
        // get file
        if (e.target.files[0]){
            const image = e.target.files[0];
            // set state to blob of file
            await this.setState({ image: URL.createObjectURL(image), name: image.name});   
        }
        //initialize cropper
        let cropper = new Cropper(canvas);
        cropper.setSource(this.state.image);
        //set background color of cropper
        canvas.style.backgroundImage = "none";
        canvas.style.background= "rgb(204, 204, 204)";
    }


    //Posting function  called when Post is pressed
    handleCreate =  () => {
     

        //check if fields are filled if not throw error and do not submit
        if (document.getElementById("caption").value == "" ){
            this.setState({ error: "You must enter a caption"})
            console.log("caption error")
            return;
        } else if (!this.state.image){
            this.setState({ error: "You must select a picture"})
            console.log("pic error")
            return;
        }
        //reference to canvas 
        let canvas = document.querySelector("#imagePreview")
        //create blob of cropped image and set state image to blob  

        new Promise((resolve) => {
            //change canvas to blob then to file
            canvas.toBlob((blob)=>{
            let file = new File([blob], this.state.name)
            this.setState({image: file, name: this.state.image.name}) 
            resolve()
        })}).then(() =>{

            //crop image to state 
            // await this.setState({image: img});
            //Get image from state
            const { image }  = this.state;
            
            //get storage ref
            //name image by image name plus time uploaded for unique identifier
            const uploadRef = storage.child(`images/${image.lastModified}${image.name}`)
            // upload image
            uploadRef.put(image).then(snapshot => {
                //call to firebase for download url
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        //set state to include uploaded image url using snapshot object form image upload as well as caption 
                        this.setState({ url: downloadURL , caption: document.getElementById("caption").value });
                    }).then( () => {
                        //make call with clients IP to get location data and add to state
                        fetch("https://ipapi.co/json/").then((data) => data.json()).then(res => { console.log(res);this.setState({ ip:res.ip, city:res.city, region:res.region })}).catch(error => {console.log("Error occured when retrieving location")})
                        .then(() => {
                            //post all state information to database
                            postsDB.add({
                                caption: this.state.caption,
                                city: this.state.city ,
                                region: this.state.region,
                                //likes
                                flashes: 0,
                                //image url
                                url: this.state.url,
                                //miliseconds when posted
                                posted: Date.now(),
                                //likes gained in the last hour
                                lastHour:0,
                                //how many likes were removed in the last 30 min
                                lastResetAmount:0,
                                //Set IPs log
                                IPs:{}
                            }).then((snapshot) => {
                                //change to view page of posted post
                                this.props.history.push(`/view/${snapshot.id}/posted`)
                            }).catch(error => {
                                console.log("Error occured when uploading form data to database")
                            })
                        })
                })
            })
        })

    };

    componentDidMount(){

       
    }

    render(){
        return(
            
        <div>
            <h1>Create your Picky</h1>
            <div className="avatar-upload">
                <div className="avatar-edit">
                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={this.handleChange} />
                    <label htmlFor="imageUpload"></label>
                </div>
                
                <div className="avatar-preview">
                    <canvas id="imagePreview" height="400" width="400"/>
                </div>
            </div>
            <h3>Caption</h3>
            <div className="caption-form">
                <textarea id="caption" maxLength="500"/>
            </div>  
            <div className="caption-form">
                <button  id="submit" onClick={this.handleCreate} href="/preview" >Post</button>
            </div>
            <p>*Your location will be posted with this post</p>
            <Error error={this.state.error} />
        </div>
    )}
}

export default Create;