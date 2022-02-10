import React, {useState , useEffect} from 'react';
import ChartRow from './ChartRow';


function Chart (){
    const [Chart , setChart] = useState([]) //Estado Inicial


    useEffect(()=> {
        fetch('/api/products')
        .then(response => {
            return response.json()
        })
        .then(products =>{            
            setChart(products.data)
        })
        .catch(error => console.log(error))
    },[])
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className='card-header py-3'>
            <h5 className='m-0 font-weight-bold text-gray-800'>Products in Data Base</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Detalle</th> 
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>Detalle</th>                                
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            Chart.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;