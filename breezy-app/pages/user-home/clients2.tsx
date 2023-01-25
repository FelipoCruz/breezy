import { getData } from '../../utils/dataFetch';
import { useEffect, useState } from 'react';
import { invoiceFields } from '../../utils/types';

import DisplayClients from '../../components/displayClients';
import Sidebar from '../../components/navbar';

function Clients2() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    const response = await getData();
    setInvoices(response)
  };

  useEffect(() => {
    fetchInvoices()
  }, []);

  return (
    <>
      <main aria-labelledby='clients-view' >
        <h1 className='invisible-heading-clients'>Clients</h1>
        <title>Breezy app Dep - Clients</title>
        <Sidebar />
        {invoices?.map((data: invoiceFields) => (
          <div key={String(data._id)}>
            <DisplayClients key={String(data._id)} clientData={data} />
          </div>
        ))}
      </main>
    </>
  );
};

export default Clients2;
