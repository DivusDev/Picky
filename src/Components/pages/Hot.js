import React, { Component, useCallback } from "react";
import Post from "../Post/Post";
import { postsDB } from "../../firebase";
import "./Hot.css";

class Hot extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts:[]
        }

    }

    ipToString(ip){
        //function to change IP address to strings with regex
        const regex = /(?:(?![.:|;\[\]]).)*/gm;
                
        let m ;
        let ipString = "";
        while ((m = regex.exec(ip)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                ipString += match
            });
        }           
        return ipString;
    }



     getPosts = () => {
        //get IP and location data
        fetch("https://ipapi.co/json/").then((data) => data.json()).then(res => {this.setState({ ip:res.ip, city:res.city, region:res.region })
            //get data from firebase
            let posts =  postsDB.orderBy("lastHour", "desc").limit(15).get().then(snapshot => {
                let array = [];
                //call foreach on each document in firestore
                snapshot.forEach((document) => {
                    let data = document.data();
                    if (data.IPs[this.ipToString(res.ip)]){
                        data["liked"] = true;
                    } else {
                        data["liked"] = false;
                    }
                    //add id property to use as key value for react
                    data["id"] = document.id;
                    //create new index in array for each document as object with each property 
                    array.push(data);
                })
                this.setState({posts:array});
            })
    
        }).catch(error => {console.log("Error occured when retrieving location")})
        
    };

    componentDidMount(){
        //get IP
        this.getPosts();
    }

    


    render() {
        return (
            <div>
                {this.state.posts.map((e) => {
                    return <Post key={e.id} id={e.id} city={e.city} region={e.region} caption={e.caption} url={e.url} flashes={e.flashes}  liked={e.liked}/>
                })}
               
            </div>
        )
    }
}

export default Hot;