import React, {useState , useEffect} from 'react';

function MayorStock(){
    const [productoMaxStock , setProductoMaxStock ] = useState(0) //Estado Inicial


    useEffect(()=> {

        fetch(
            '/api/products/mayorStock',
            {   method: 'GET',
                mode: 'no-cors'
            }
        )
        .then(response => response.json())
        .then(producto =>{          

            setProductoMaxStock(producto)
            // console.log(producto)

        })
        .catch(error => console.log(error))
    },[])
    
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">PRODUCTO CON MAYOR STOCK</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={`${ productoMaxStock.imagen }`} alt=" Producto con mayor stock "/>
                    </div>
                    <p>{productoMaxStock.descripcion}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href={productoMaxStock.url}>Detalles</a>
                </div>
            </div>
        </div>
    )
}

export default MayorStock;
