import { getData } from '../../utils/dataFetch';
import React from 'react';
import DisplayInvoiceList from '../../components/displayInvoiceList';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

function FetchInvoiceList() {
  const [invoices, setInvoices] = useState([])
  const { user, error, isLoading } = useUser();
  if (user) console.log('user in invoice-list is: ', user)

  const fetchInvoices = async () => {
    try {
      const response = await getData(user?.sub as String);
      setInvoices(response)
    } catch (error) {
      console.log('error in getData', error)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [user])

  return (
    <>
      <main aria-labelledby='invoices-view' >
        {/* <h1 className='invisible-heading-invoice-list'>Invoice List</h1> */}
        <title>Breezy app Dep - Invoices</title>
        <Sidebar />
        <DisplayInvoiceList invoices={invoices} data-testid='displayInvoiceList' />
      </main>
    </>
  );
};

export default withPageAuthRequired(FetchInvoiceList)
