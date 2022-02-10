import React from 'react';
import { Link} from 'react-router-dom';


function ChartRow(props){
    return (
                <tr>

                    <td>{props.name}</td>
                    <td><Link className="nav-link" to={props.detail}>Detalle de {props.name}</Link></td>
                                      
                </tr>
            )
    }
    
        

export default ChartRow;