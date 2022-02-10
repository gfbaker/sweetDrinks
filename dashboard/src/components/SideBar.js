import React from 'react';
import image from '../assets/images/logo-SD.png';
import ContentWrapper from "./ContentWrapper"
import GenresInDb from "./UsersInDb";
import LastMovieInDb from "./LastMovieInDb";
import ContentRowMovies from "./ContentRowProducts";
import Error404 from "./Error404";
import { Link, Route, Routes } from 'react-router-dom';


function SideBar(){
    return(
        <React.Fragment>        
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Digital House"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - DH movies</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/GenresInDb">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Géneros</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/LastMovieInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Ultima Peli en DB</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/ContentRowMovies">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tabla</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            <Routes>          
                <Route path ="/" element={<ContentWrapper/>}></Route>
                <Route path ="/GenresInDb" element={<GenresInDb/>}></Route>
                <Route path ="/LastMovieInDb" element={<LastMovieInDb/>}></Route>
                <Route path ="/ContentRowMovies"  element={<ContentRowMovies/>}></Route> 
                <Route element={Error404} />
            </Routes>  
        </React.Fragment>
    )
}
export default SideBar;