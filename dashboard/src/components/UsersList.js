import React, {useState , useEffect} from 'react';
import UserListDetail from './UserListDetail';

function UsersList(){
  
   const [UsersList , setUsersList] = useState([]) //Estado Inicial


    useEffect(()=> {
        fetch('/api/users')
        .then(response => {
            return response.json()
        })
        .then(users =>{            
            setUsersList(users.data)
        })
        .catch(error => console.log(error))
    },[])

        return (
            <React.Fragment>
                {/*<!-- Categories in DB -->*/}
               					
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Lista de Usuarios</h6>
                        </div>
                        <div className="card-body">
                            <div className="rowUsers">
                                {
                                    UsersList.map((user,index)=>{
                                        return  <UserListDetail  {...user}  key={user + index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                
           
        </React.Fragment>
        )
}
        


export default UsersList;