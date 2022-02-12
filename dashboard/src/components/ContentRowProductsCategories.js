import React, {useState , useEffect} from 'react';
import Category from './Category';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */


function ContentRowProductsCategories(){
    const [categoryList , setCategoryList ] = useState([]) //Estado Inicial


    useEffect(()=> {
        fetch('/api/products')
        .then(response => {
            return response.json()
        })
        .then(productos =>{          
            console.log (productos.meta.countByCategory)
            setCategoryList(productos.meta.countByCategory)

        })
        .catch(error => console.log(error))
    },[])

   

    return (
    
        <div className="row">
            {
                categoryList.map((category, index)=>{
                    return  <Category  {...category}  key={category + index} />
                })
            }

        </div>
    )
}

export default ContentRowProductsCategories;