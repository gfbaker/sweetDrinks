import React, {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail(){

    let {id} = useParams();

    const [productoDB , setProducto] = useState([]) //Estado Inicial


    useEffect(()=> {

        fetch(
        `/api/products/${id}`,
            {   method: 'GET',
                mode: 'no-cors'
            }
        )
        .then(response => response.json())
        .then(producto =>{          

            setProducto(producto.data)
            // console.log(producto)

        })
        .catch(error => console.log(error))
    },[])
    
    return(
        <div className='row'> 
            <div className="col-lg-6 mb-4 text-center">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">{productoDB.nombre} </h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={`${ productoDB.imagenPrincipal }`} alt=" Producto "/>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Precio : ${productoDB.precio} </li>
                            <li className="list-group-item">Stock : ${productoDB.stock} </li>
                            <li className="list-group-item">{productoDB.descripcion} </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
