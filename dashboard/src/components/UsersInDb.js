import React, {useState , useEffect} from 'react';
import User  from './User';

function UsersInDb(){
  
   const [UsersInDb , setListUsers] = useState([]) //Estado Inicial


    useEffect(()=> {
        fetch('/api/users')
        .then(response => {
            return response.json()
        })
        .then(generos =>{            
            setListUsers(generos.data)
        })
        .catch(error => console.log(error))
    },[])

        return (
            <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Users in Data Base</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    UsersInDb.map((user,index)=>{
                                        return  <User  {...user}  key={user + index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
           
        </React.Fragment>
        )
}
        


export default UsersInDb;