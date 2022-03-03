import React, { useState, useEffect } from "react";
import Nav from "./components/Header/Nav";
import NavBar from "./components/Header/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import CustomerList from "./components/Customers.js/CustomerList";
import Packages from "./components/Packages/Package";
import Invoice from "./components/Invoices/Invoice";
import Invoices from "./components/Invoices/Invoices";

function App() {
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [navbar, setNavbar] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppData(data);
      });
  }, []);

  const invoicesData = (customers, packages) => {
    return customers.map((customer) => {
      const customerPackages = packages.filter((currentPackage) => {
        return customer.id === currentPackage.customerid;
      });
      const totalWeight = customerPackages.reduce(
        (previousValue, currentPackage) =>
          previousValue + parseInt(currentPackage.weight.replace("kg", "")),
        0
      );
      const totalPrice = customerPackages.reduce(
        (previousValue, currentPackage) => previousValue + currentPackage.price,
        0
      );

      return {
        ...customer,
        customerPackages,
        totalWeight: totalWeight + " kg",
        totalPrice: totalPrice + " $",
      };
    });
  };

  useEffect(() => {
    setInvoices(invoicesData(appData.customers, appData.packages));
  }, [appData]);

  return (
    <div className="App">
      <Nav
        changeNavStatus={(navbar) => {
          setNavbar(navbar);
        }}
      />
      <Router>
        <NavBar
          navbar={navbar}
          changeNavbarStatus={(navbar) => {
            setNavbar(navbar);
          }}
        />
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <CustomerList
                appData={appData}
                changeCustomerList={(appData) => setAppData(appData)}
              />
            </Route>
            <Route path="/packageList">
              <Packages
                changePackageList={(appData) => setAppData(appData)}
                appData={appData}
              />
            </Route>
            <Route path="/invoices">
              <Invoices invoices={invoices} />
            </Route>
            <Route path="/invoice/:id">
              <Invoice invoices={invoices} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
