import React from 'react';

function Category(props){
    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark shadow">
                    <div className="card-body">
                        <h5 className="card-title">{props.total}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{props.categoria}</h6> 
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    )
}


export default Category;