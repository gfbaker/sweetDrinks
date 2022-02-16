import React from 'react';
import { Link } from 'react-router-dom';


function ChartRow(props){
    return (
        <React.Fragment>
                <tr>
                    <td>{props.name}</td>
                    <td><Link className="nav-link" to={`/products/${props.id}`}>Detalle de {props.name}</Link></td>             
                </tr>
        
        </React.Fragment>       
    )  
}

export default ChartRow;