import React, {useState , useEffect} from 'react';
import Category  from './Category';

function CategoriesInDb(){
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
            <React.Fragment>
                {/*<!-- Categories in DB -->*/}
					
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Categories in Data Base</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                            {
                                categoryList.map((category, index)=>{
                                    return  <Category  {...category}  key={category + index} />
                                })
                            }
                            </div>
                        </div>
                    </div>

           
        </React.Fragment>
        )
}
        


export default CategoriesInDb;