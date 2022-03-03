import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
import { Link } from "react-router-dom";

const CustomerList = ({ appData, changeCustomerList }) => {
  const removeCustomer = (customerId) => {
    const newCustomerList = appData.customers.filter(
      (i) => i.id !== customerId
    );
    const newPackagesList = appData.packages.filter(
      (i) => i.customerid !== customerId
    );
    changeCustomerList({
      customers: newCustomerList,
      packages: newPackagesList,
    });
  };
  return (
    <div>
      <h1>Customer List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData.customers.map((row) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/Invoice/${row.id}`}
                    >
                      {" "}
                      Create Invoice
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        removeCustomer(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerList;
