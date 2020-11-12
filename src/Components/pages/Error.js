import React from 'react';
import "./Error.css"
export default Error = (props) => {
   if (!props.error){
      return(<div/>);
   }
    return (
       <div className="error-container">
          <span className="error">{props.error}</span>
       </div>
    );
}
 
