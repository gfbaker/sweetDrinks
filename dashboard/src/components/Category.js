import React from 'react';

function Category(props){
    return(
        <React.Fragment>
            <div className="col-md-3 mb-3">
                <div className="card text-white bg-dark shadow">
                    <div className="card-body">
                        <h5 class="card-title">{props.total}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{props.categoria}</h6> 
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    )
}


export default Category;