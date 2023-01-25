import InvoiceForm from '../../components/invoice-form';
import { getData } from '../../utils/dataFetch';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Sidebar from '../../components/navbar';



function CreateInvoice() {

  // TODO: find out what this call does and if it is useful for this component
  return (
    <>
      <main aria-labelledby='create-invoice' >
        <h1 className='invisible-heading-create-invocie'>Create Invoice</h1>
        <title>Breezy app Dep - Create invoice</title>
        <Sidebar />
        <InvoiceForm />
      </main>
    </>
  );
};

export default withPageAuthRequired(CreateInvoice)
