import React, { Component } from 'react';
import "./Post.css"
import { postsDB } from "../../firebase";
import heart from "../../pics/heart.png"

class Post extends Component {
    constructor(props){
        super(props);
        this.postRef = React.createRef();
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
        return ipString
    }
    //handle request logic
    likedHandler = () => {
        //ADD REDUX HERE LATER SO YOU DONT HAVE TO GET IP EVERY SINGLE TIME YOU LIKE SOMETHING
        //retrieve post data
        postsDB.doc(this.props.id).get().then((snapshot)=>{
            //promise chain to retrieve IP
            fetch("https://ipapi.co/json/").then((data) => data.json()).catch(err=>{console.log(`Error went wrong with ip fetch: ${err}`)}).then(
            res => { 
                console.log(res)
                //set vars and change ip address to string
                let data = snapshot.data()
                let ipString = this.ipToString(res.ip)
                
                //check if post has been liked
                if ( data["IPs"][ipString] ) {
                    //if post liked remove like and update like obj
                    postsDB.doc(this.props.id).update({
                        flashes: data.flashes - 1,
                        [`IPs.${ipString}`]:false
                    })
                    console.log(`Post ${this.props.id} disliked by ${res.ip}. its now at ${data.flashes - 1}`)
                    //set color for regular
                    
                } else {
                    //post not liked
                    //add likes and change liked value based on IP
                    postsDB.doc(this.props.id).update({
                        flashes: data.flashes + 1,
                        lastHour: data.lastHour + 1,
                        //this syntax only avialable with firestore update method
                        [`IPs.${ipString}`]:true
                    })
                    console.log(`Post ${this.props.id} liked by ${res.ip}. its now at ${data.flashes + 1}`)
                    //set color for liked 
                    

                }
            })
        })
    }
    //handle style logic
    flashHandler = () => {

        //if already being liked do nothing
        if (!this.postRef.current.querySelector(".heart").classList.value.includes("liking")){
            this.postRef.current.querySelector(".heart").classList.add("liking");
            this.likedHandler();
            if (this.postRef.current.parentElement.parentElement.style.background == "rgb(255, 99, 99)") {
                //if has been liked already remove like
                this.postRef.current.parentElement.parentElement.style.background = "#FAFAFA"
                this.postRef.current.parentElement.parentElement.classList.add("remove-like");
                setTimeout(()=>{
                    console.log( this.postRef.current.querySelector(".heart").classList[1])
                     //reset bg color to show its no longer liked
                    this.postRef.current.parentElement.parentElement.style.background = "#FAFAFA"
                    this.postRef.current.parentElement.parentElement.classList.remove("remove-like")
                     //remove liking class
                    this.postRef.current.querySelector(".heart").classList.remove("liking");
                }, 1700)
               

            } else {
            
                //add colors and classes
                this.postRef.current.parentElement.parentElement.classList.add("add-like")
                this.postRef.current.classList.add("shutterClick")
                this.postRef.current.querySelector(".heart").classList.add("fade")
                this.postRef.current.querySelector(".heart").style.opacity = "1"
                //timeouts for correct animation timing
                setTimeout(() => {
                    this.postRef.current.classList.remove('shutterClick');
                
                    setTimeout(()=>{
                        console.log( this.postRef.current.querySelector(".heart").classList)
                        this.postRef.current.querySelector(".heart").classList.remove("fade");
                        this.postRef.current.querySelector(".heart").style.opacity = "0"
                        this.postRef.current.parentElement.parentElement.classList.remove("add-like")
                        //reset bg color to show its been liked
                        this.postRef.current.parentElement.parentElement.style.background = "#FF6363"
                        //remove liking class
                        this.postRef.current.querySelector(".heart").classList.remove("liking");
                    },1100)
                }, 400);
                
            } 
        }
    }

    copyHandler = () => {

        var copyText = document.getElementById(`copy${this.props.id}`);

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");

        let copy = document.querySelector(`#post${this.props.id}`).querySelector(".copied")
        copy.style.display = "inline"
        copy.classList.add("shadow");
        setTimeout(()=>{
            copy.classList.remove("shadow");
            copy.style.display = "none";
        }, 1000)

    }



    render(){
        let style
        this.props.liked ? style={background: "#FF6363"} : style={}
        let link = `http://localhost:3000/view/${this.props.id}`
        let post = `post${this.props.id}`
        let copy = `copy${this.props.id}`
        let tweet = `Check out this awesome post I found on Picky.com!  https://picky-b31be.web.app/view/${this.props.id}`
        let tweeturl = `https://twitter.com/intent/tweet?text=${tweet}`
        let facebookurl = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpicky-b31be.web.app%2Fview%2F${this.props.id}&amp;src=sdkpreparse`
        return(
            <article className="Post" href="/" id={post}>
                <header>
                    
                </header>
                <div className="Post-image-container">      
                    <div className="Post-image-bg"  style={style}>
                        <div className="Post-image-backdrop">
                            <div className="Post-image" style={{ backgroundImage: "url(" + this.props.url + ")"}} ref={this.postRef} onClick={this.flashHandler}>
                                <div className="heart-container">
                                    <img className="heart" src={heart}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear-fix" />
                </div>
                <div className="Post-description">
                    <div className="Post-caption">
                        <strong>{this.props.city}, {this.props.region}</strong> {this.props.caption}
                        <div className="Links">
                            <div className="link-copy share-link" onClick={this.copyHandler} ><div className="copied">Copied!</div><img src="https://img.icons8.com/metro/22/000000/link.png"/></div>
                            <a className="link-twitter share-link" href={tweeturl} ><img src="https://img.icons8.com/material/27/000000/twitter--v1.png"/></a>
                            <a className="link-facebook share-link" target="_blank" href={facebookurl}><img src="https://img.icons8.com/ios-filled/25/000000/facebook-new.png"/></a>
                            <textarea defaultValue={link} id={copy} className="copy-text"></textarea>
                        </div>
                    </div>
                    
                </div>
            </article>
        )
    }
}

export default Post;