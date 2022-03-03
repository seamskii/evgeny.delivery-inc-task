import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import React from "react";

const NavBar = (props) => {
  return (
    <Drawer
      anchor={"left"}
      open={props.navbar}
      onClose={() => props.changeNavbarStatus(!props.navbar)}
    >
      <List style={{ width: "300px" }}>
        <ListItem button component={Link} to="/packageList">
          <ListItemText primary={"Packages"} />
        </ListItem>

        <ListItem button component={Link} to="/">
          <ListItemText primary={"Customers"} />
        </ListItem>
        <ListItem button component={Link} to="/invoices">
          <ListItemText primary={"Invoices"} />
        </ListItem>
      </List>
    </Drawer>
  );
};
export default NavBar;
