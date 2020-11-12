import React, { Component } from "react";
import Post from "../Post/Post";
import { postsDB } from "../../firebase";


class View extends Component {
    constructor(props){
        super(props);
        this.state = {post:{}}
    }

    getPost = (id) => {
        //get IP and location data
        fetch("https://ipapi.co/json/").then((data) => data.json()).then(res => {this.setState({ ip:res.ip, city:res.city, region:res.region })
            //get data from firebase
            let posts =  postsDB.doc(id).get().then(snapshot => {
                this.setState({post:snapshot.data()});
            })
    
        }).catch(error => {console.log("Error occured when retrieving location or posting materials")})
        
    };

    componentDidMount(){

        let postID = this.props.match.params.postID;
        this.getPost(postID)
        
    }
    
 

    render(){
        return (
            <div>
                { this.props.location.pathname.includes("posted") && <h1>Your Post was <bold>POSTED</bold></h1>}
                <Post key={this.state.post.id} id={this.state.post.id} city={this.state.post.city} region={this.state.post.region} caption={this.state.post.caption} url={this.state.post.url} flashes={this.state.post.flashes}  liked={this.state.post.liked} />
            </div>
        )
    }

}


export default View;