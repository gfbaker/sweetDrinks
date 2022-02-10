import React from "react";
import imagenError from "../assets/images/error404.png";

function Error404(){
    return(
        <React.Fragment>
            <div>
                <img className="w-100" src={imagenError} alt='error 404' />
            </div>
        </React.Fragment>
    )
}
export default Error404;