import React from 'react';

function UserListDetail(props){
    let color = "dark"
    let buttonText = "HACER ADMIN"
    let styles = {
        button: "btn btn-secondary"
    }

    if(props.admin){
        color = "light"
        buttonText = ""
        styles.button = ""
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
                        <a href="/" class={styles.button}>{buttonText}</a>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}
export default UserListDetail;