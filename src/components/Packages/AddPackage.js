import { useState } from "react";
import Button from "@mui/material/Button";
import "./AddPackage.css";

const AddPackage = ({ togglePopup, changePackageList, appData }) => {
  const [newPackage, setNewPackage] = useState({
    customerId: "",
    packageWeight: "",
    packagePrice: "",
    custumerName: "",
  });

  const [nameValue, setNameValue] = useState("");

  const handleSubmit = (props) => {
    const createPackageObject = () => {
      const lastPackage =
        appData.packages[appData.packages.length - 1].shippingOrder;
      const newPackageObject = {
        id: "pak" + (appData.packages.length + 1),
        weight: props.packageWeight + "kg",
        customerid: Number(props.customerId),
        price: Number(props.packagePrice),
        shippingOrder: lastPackage + 1,
      };
      return newPackageObject;
    };

    const checkIfCostumerExist = appData.customers.map((i) => i.id);
    const isCostumer = checkIfCostumerExist.includes(Number(props.customerId));
    if (!isCostumer) {
      const newCustumerObject = {
        id: Number(props.customerId),
        name: props.custumerName,
      };
      changePackageList({
        packages: [...appData.packages, createPackageObject()],
        customers: [...appData.customers, newCustumerObject],
      });
    } else {
      changePackageList({
        packages: [...appData.packages, createPackageObject()],
        customers: [...appData.customers],
      });
    }
  };

  const updateForm = (e) => {
    if (e.target.name === "customerId") {
      const checkIfCostumerExist = appData.customers.map((i) => i.id);
      const isCostumer = checkIfCostumerExist.includes(Number(e.target.value));
      if (isCostumer) {
        const getExistedCostumer = appData.customers.filter(
          (i) => i.id === Number(e.target.value)
        );
        setNameValue(getExistedCostumer[0].name);
        setNewPackage({
          ...newPackage,
          custumerName: getExistedCostumer[0].name,
        });
      } else {
        setNameValue("");
      }
    }

    if (e.target.name === "custumerName") {
      const checkIfCostumerExist = appData.customers.map((i) => i.id);
      const isCostumer = checkIfCostumerExist.includes(
        Number(newPackage.customerId)
      );
      if (!isCostumer) {
        setNameValue(e.target.value);
        setNewPackage({
          ...newPackage,
          custumerName: e.target.value,
        });
      }
    } else {
      setNewPackage({
        ...newPackage,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(newPackage);
        togglePopup();
      }}
    >
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>
            x
          </span>

          <h2>Add New Package</h2>
          <div className="input-box">
            <div>
              <input
                className="input-field"
                type="number"
                id="packageid"
                placeholder="enter packages id"
                name="customerId"
                onChange={updateForm}
                required
              />
            </div>
            <div>
              <input
                className="input-field"
                type="number"
                id="packageweight"
                placeholder="enter packages weight"
                name="packageWeight"
                onChange={updateForm}
                required
              />
            </div>
            <div>
              <input
                className="input-field"
                type="number"
                id="packageprice"
                placeholder="enter packages price"
                name="packagePrice"
                onChange={updateForm}
                required
              />
            </div>
            <div>
              <input
                value={nameValue}
                className="input-field"
                id="costomername"
                placeholder="enter costomer name"
                name="custumerName"
                onChange={updateForm}
                required
              />
            </div>
          </div>
          <div className="submit-button">
            <Button variant="contained" type="submit">
              Add new Package
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AddPackage;
