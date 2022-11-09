import { Link } from "react-router-dom";

type Invoice = {
  invoice_number: number;
  reference: string;
  date: string;
  patient_name: string;
  solicitor_name: string;
  hours_worked: number;
  hourly_rate: number;
};

const InvoiceCard: React.FunctionComponent<{ invoices: Invoice[] }> = ({
  invoices,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Reference</th>
          <th scope="col">date</th>
          <th scope="col">Patient_name</th>
          <th scope="col">Solicitor_name</th>
          <th scope="col">Total Ex-VAT</th>
          <th scope="col">Total Inc-VAT</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => {
          return (
            <tr key={invoice.invoice_number}>
              <td>
                <Link
                  to={`/invoices/${invoice.invoice_number}`}
                  target="_blank"
                >
                  {invoice.reference}
                </Link>
              </td>
              <td>
                <Link
                  to={`/invoices/${invoice.invoice_number}`}
                  target="_blank"
                >
                  {invoice.date}
                </Link>
              </td>
              <td>
                <Link
                  to={`/invoices/${invoice.invoice_number}`}
                  target="_blank"
                >
                  {invoice.patient_name}
                </Link>
              </td>
              <td>
                <Link
                  to={`/invoices/${invoice.invoice_number}`}
                  target="_blank"
                >
                  {invoice.solicitor_name}
                </Link>
              </td>
              <td>
                <Link
                  to={`/invoices/${invoice.invoice_number}`}
                  target="_blank"
                >
                  £{invoice.hours_worked * invoice.hourly_rate}
                </Link>
              </td>
              <td>
                <Link
                  to={`/invoices/${invoice.invoice_number}`}
                  target="_blank"
                >
                  £{invoice.hours_worked * invoice.hourly_rate * 1.2}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InvoiceCard;
