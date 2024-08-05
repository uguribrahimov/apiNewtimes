import React, { useEffect } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import axiosInstance from '../../interseptor/axiosInstance';




const CustomNavbar = () => {
const checkauth = async () => {
  try { await axiosInstance.get('authUser', {
    headers: 
    Authorization `Bearer ${localStorage.getItem("token")}`
  })
    
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  checkauth()
}, [])



  return (
    <Navbar expand="md">
      <Nav className="mr-auto" navbar >
        <NavItem>
          <NavLink tag={RRNavLink} to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/product">Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/roles">Roles</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/catagories">Catagories</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/tags">Tags</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/userss">Userss</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;






    