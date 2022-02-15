import React from 'react';
import { Link, Routes, Route} from 'react-router-dom';
import ProductDetail from './ProductDetail';
import Error404 from  './Error404';

function ChartRow(props){
    return (
        <React.Fragment>
                <tr>
                    <td>{props.name}</td>
                    <td><Link className="nav-link" to={`/products/${props.id}`}>Detalle de {props.name}</Link></td>             
                </tr>
            {/* <Routes>          
                <Route path ='/products/:id' element={<ProductDetail />}></Route>
                <Route element={Error404} />
            </Routes> */}
        </React.Fragment>       
    )  
}

export default ChartRow;