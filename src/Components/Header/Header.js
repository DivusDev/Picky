import React from 'react';
import "./Header.css"
import { connect } from 'react-redux';
import { addPost } from '../../Actions/Actions';
import { NavLink, Link, withRouter } from "react-router-dom";

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    changeHandler(e){
        //useless change handler maybe use it later
       
    }

    menuHandler = () => {
        let div = document.querySelector(".Nav-pages-collapse");
        if (!div.classList.value.includes("none")){
            div.classList.add("none")
        } else {
            div.classList.remove("none")
        }
    }

    // componentDidMount(){
    //     //to make the header choose the right choice
    //     //later change this to account for refreshing the page/entering picky at an entry point other than HOT
    //     this.props.history.listen((location, action) => {
    //         //grab current slected and manipulate classes
    //         let current = document.querySelector(".current")
    //         current.classList.remove("current")
    //         current.classList.add("Page-link")
    //         let key = "#"
    //         //switch statement to find new path
    //         switch(location.pathname){
    //             case "/new":
    //                 key += "new"
    //                 break;
    //             case "/":
    //                 key += "hot"
    //                 break;
    //             case "/top":
    //                 key += "top"
    //                 break;
    //             case "/create":
    //                 key += "create"
    //                 break;
    //             case "/nearby":
    //                 key += "nearby"
    //                 break;
    //         }
    //         //manipulate classes on new selection
    //         document.querySelector(key).classList.add("current")
    //         document.querySelector(key).classList.remove("Page-link")
    //   })
    // }

    render(){
        return (
            <nav className="Nav">
                
                <div className="Nav-menus">
                    <div className="Nav-brand">
                        <Link className="Nav-brand-logo" to="/hot">Picky</Link>
                    </div>
                    <div className="Nav-pages">
                        <NavLink className="Page-link" id="top" to="/top" activeClassName="current"><img alt="top" className="thumb" src="https://img.icons8.com/nolan/18/up.png" /> Top</NavLink>
                        <NavLink className="Page-link" id="new" to="/new" activeClassName="current"><img alt="new" className="thumb" src="https://img.icons8.com/color/19/000000/star--v1.png" /> New</NavLink>
                        <NavLink className="Page-link" id="hot" to="/hot" activeClassName="current"><img alt="hot" className="thumb" src="https://img.icons8.com/office/16/000000/fire-element.png"/>  Hot</NavLink>
                        <NavLink className="Page-link" id="nearby" to="/nearby" activeClassName="current"><img alt="nearby" className="thumb" src="https://img.icons8.com/color/20/000000/conference-call.png"/>  Nearby</NavLink>
                    </div>
                    <div className="Nav-post">  
                        <NavLink className="Page-link"  to="/create" activeClassName="current">Post</NavLink>
                    </div>
                </div>
                <div className="collapse">
                    <div className="top-collapse">
                        <div className="Nav-brand-logo-collapse" onClick={this.menuHandler}></div>
                        <NavLink className="Page-link-collapse post-link-collapse"  to="/create" activeClassName="current">Post</NavLink>
                    </div>
                    <div className="Nav-pages-collapse">
                        <NavLink className="Page-link-collapse" id="top-collapse" to="/top" activeClassName="current"><img alt="top" className="thumb" src="https://img.icons8.com/nolan/18/up.png" /> Top</NavLink>
                        <NavLink className="Page-link-collapse" id="new-collapse" to="/new" activeClassName="current"><img alt="new" className="thumb" src="https://img.icons8.com/color/19/000000/star--v1.png" /> New</NavLink>
                        <NavLink className="Page-link-collapse" id="hot-collapse" to="/hot" activeClassName="current"><img alt="hot" className="thumb" src="https://img.icons8.com/office/16/000000/fire-element.png"/>  Hot</NavLink>
                        <NavLink className="Page-link-collapse" id="nearby-collapse" to="/nearby" activeClassName="current"><img alt="nearby" className="thumb" src="https://img.icons8.com/color/20/000000/conference-call.png"/>  Nearby</NavLink>
                    </div>
                </div>
                
            </nav>
        );
    }
}

export default withRouter(Header);