import React, {useState , useEffect} from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */


function ContentRowProducts(){
    const [ContentRowProducts , setListproducts] = useState([]) //Estado Inicial


    useEffect(()=> {
        fetch('/api/products')
        .then(response => {
            return response.json()
        })
        .then(productos =>{            
            setListproducts(productos.data)
        })
        .catch(error => console.log(error))
    },[])

    return (
    
        <div className="row">
            
            {ContentRowProducts.map( (product, i) => {

                return <SmallCard {...product} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowProducts;