import React from 'react';

function UserListDetail(props){
    let color = "dark"

    if(props.admin){
        color = "light"
    }
    return(
        <React.Fragment>
            <div className="col-lg-10">                
                <div className={`card text-white bg-${color} shadow`}>
                    
                    <div className="card-body">                        
                        {props.name}
                        <div>
                        {props.email}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserListDetail;