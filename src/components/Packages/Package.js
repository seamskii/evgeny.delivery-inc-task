import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowUpward from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownward from "@mui/icons-material/ArrowDownwardRounded";
import AddIcon from "@mui/icons-material/Add";
import AddPackage from "./AddPackage";

const Packages = ({ changePackageList, appData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const CustomerName = (customerid) => {
    let isName = appData.customers.find((e) => e.id === customerid);

    return isName ? isName.name : "";
  };

  const handleUpButton = (index) => {
    let switchPackagePlaces = appData.packages;
    let PackageIndex = switchPackagePlaces[index].shippingOrder;
    let moveUp = index === 0 ? switchPackagePlaces.length - 1 : index - 1;

    switchPackagePlaces[index].shippingOrder =
      switchPackagePlaces[moveUp].shippingOrder;
    switchPackagePlaces[moveUp].shippingOrder = PackageIndex;
    changePackageList({
      customers: appData.customers,
      packages: [...switchPackagePlaces],
    });
  };

  const handleDownButton = (index) => {
    let switchPackagePlaces = appData.packages;
    let PackageIndex = switchPackagePlaces[index].shippingOrder;
    let moveDown =
      index === switchPackagePlaces.length - 1 ? 0 : parseInt(index) + 1;

    switchPackagePlaces[index].shippingOrder =
      switchPackagePlaces[moveDown].shippingOrder;
    switchPackagePlaces[moveDown].shippingOrder = PackageIndex;

    changePackageList({
      customers: appData.customers,
      packages: [...switchPackagePlaces],
    });
  };

  return (
    <div>
      <h1>Packages List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={togglePopup}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData.packages
              .sort((a, b) => (a.shippingOrder > b.shippingOrder ? 1 : -1))
              .map((row, index) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>

                    <TableCell>{CustomerName(row.customerid)}</TableCell>
                    <TableCell>{row.weight}</TableCell>

                    <TableCell>{row.price}</TableCell>

                    <TableCell>
                      <Button
                        style={{ marginRight: "20px" }}
                        variant="contained"
                        name={index}
                        onClick={() => handleUpButton(index)}
                      >
                        <ArrowUpward />
                      </Button>

                      <Button
                        variant="contained"
                        name={index}
                        onClick={() => handleDownButton(index)}
                      >
                        <ArrowDownward />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpen && (
        <AddPackage
          togglePopup={togglePopup}
          changePackageList={changePackageList}
          appData={appData}
        />
      )}
    </div>
  );
};

export default Packages;
