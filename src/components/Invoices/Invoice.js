import { useParams } from "react-router-dom";

const Invoice = ({ invoices }) => {
  const { id } = useParams();

  const [CustomersInvoices] = invoices.filter((invoiceData) => {
    return invoiceData.id === Number(id);
  });

  return (
    <>
      {CustomersInvoices && (
        <div>
          <div>
            <div className="top">
              <div className="date">
                {new Date().toLocaleDateString()}
                <div>{CustomersInvoices.name}</div>
              </div>
              <div className="invoice-number">
                <h1>Invoice</h1>
                <div>No. {Math.floor(Math.random() * 100)}</div>
              </div>
            </div>
          </div>
          <div className="invoice-container">
            <div>
              <div>
                <h3>ID</h3>
                {CustomersInvoices.customerPackages &&
                  CustomersInvoices.customerPackages.map(
                    (currentPackage, key) => {
                      return <div key={key}>{currentPackage.id}</div>;
                    }
                  )}
              </div>
            </div>
            <div>
              <div>
                <h3>Weight</h3>
                {CustomersInvoices.customerPackages &&
                  CustomersInvoices.customerPackages.map(
                    (currentPackage, key) => {
                      return <div key={key}>{currentPackage.weight}</div>;
                    }
                  )}
              </div>
              <div className="totals">
                <h3> {CustomersInvoices.totalWeight}</h3>
              </div>
            </div>
            <div>
              <div className="price-conteiner">
                <div className="price">
                  <h3>Price</h3>
                  {CustomersInvoices.customerPackages &&
                    CustomersInvoices.customerPackages.map(
                      (currentPackage, key) => {
                        return <div key={key}>{currentPackage.price}$</div>;
                      }
                    )}
                </div>
                <div className="totals">
                  <h1>Total: {CustomersInvoices.totalPrice}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-text">
            You received{" "}
            {(CustomersInvoices.customerPackages &&
              CustomersInvoices.customerPackages.length) ||
              0}{" "}
            packages <br />
            Thank you for using our services
          </div>
        </div>
      )}
    </>
  );
};
export default Invoice;
