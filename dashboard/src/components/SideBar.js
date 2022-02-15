import React from 'react';
import image from '../assets/images/logo-SD.png';
import ContentWrapper from "./ContentWrapper"
// import UsersInDb from "./UsersInDb";
import UsersList from "./UsersList";
import Chart from "./Chart";
import ContentRowMovies from "./ContentRowProducts";
import Error404 from "./Error404";
import ProductDetail from './ProductDetail';
import { Link, Route, Routes } from 'react-router-dom';


function SideBar(){
    return(
        <React.Fragment>        
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Sweet Drinks"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <span>Inicio Sweet Drinks</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">OPCIONES</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/UsersList">
                        <i className="fas fa-user"></i>
                        <span>Lista de Usuarios</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/productList">
                        <i className="fas fa-fw fa-wine-bottle"></i>
                        <span>Listado de Productos</span></Link>
                </li>


                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            <Routes>          
                <Route exact path ="/" element={<ContentWrapper/>}></Route>
                <Route path ='/products/:id' element={<ProductDetail />}></Route>
                <Route path ="/UsersList" element={<UsersList/>}></Route>
                <Route path ="/productList" element={<Chart/>}></Route>
                <Route path ="/ContentRowMovies"  element={<ContentRowMovies/>}></Route> 
                <Route element={Error404} />
            </Routes>  
        </React.Fragment>
    )
}
export default SideBar;