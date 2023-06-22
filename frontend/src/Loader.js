import React from "react";
import './Loader.css';
import './index.css';

const Loader = () =>{
    return(
        // <div className="full-height">
        //     <h1>Loading...</h1>
        // </div>
        <div className="full-height">
            <div class="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    ) 
} 

export default Loader;