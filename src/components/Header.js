import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "../redux/actions/action";

const Header = () => {
  const getdata = useSelector((state) => state.cartreducer.carts);
  const [price, setPrice] = useState(0);
  console.log("getdata", getdata);
  console.log(price);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };
  useEffect(() => {
    total();
  }, [total]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}>
            <i className="fa-sharp fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}>
          {getdata.length ? (
            <div className="card_details" style={{ width: "25rem", padding: "10px" }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ display: "block", marginRight: "4rem", marginLeft: "1rem" }}>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img src={e.imgdata} alt="" style={{ width: "5rem", height: "5rem" }} />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price: Rs{e.price}</p>
                            <p>Quantity: Rs{e.qnty}</p>
                            <p style={{ color: "red", cursor: "pointer", fontSize: 20 }} onClick={() => dlt(e.id)}>
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td className="mt-5" style={{ color: "red", cursor: "pointer", fontSize: 20 }} onClick={() => dlt(e.id)}>
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total: Rs{price}</p>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card_details d-flex justify-content-center align-item-center" style={{ width: "24rem", padding: 10, position: "relative" }}>
              <i className="fas fa-close smallclose" onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
              <p style={{ fontSize: 22, marginTop: 20 }}>Your carts is empty</p>
              <img src="./cart.gif" alt="" className="emptycart_img" style={{ width: "5rem", padding: 10 }} />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
