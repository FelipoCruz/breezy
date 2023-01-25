'use client';

import '../components/displayInvoiceList.css';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { invoiceFields } from '../utils/types';
import Popup from 'reactjs-popup';
import InvoicePopUp from './InvoicePopUp';

const DisplayInvoiceList = ({ invoices }: { invoices: invoiceFields[] }) => {
  const [isPaid, setPaidStatus] = useState<invoiceFields[]>([]);
  const [paidRender, setPaidRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [specificInvoice, setSpecificInvoice] = useState({});

  const closeModal = () => setOpen(false);
  // console.log('invoice in displayInvoiceList: ', invoice);

  function findPaid() {
    let paid = invoices.filter((invoice) => invoice.paid === true);
    setPaidStatus(paid);
    setPaidRender(true);
  }

  function findUnpaid() {
    let unPaid = invoices.filter((invoice) => invoice.paid === false);
    setPaidStatus(unPaid);
    setPaidRender(true);
  }

  function allInvoices() {
    setPaidRender(false);
  }

  function selectInvoice(specificInvoiceID: invoiceFields) {
    setSpecificInvoice(specificInvoiceID);
    setOpen(o => !o);
  }

  function GetDate(date: String) {
    const date2 = new Date(`${date}`)

    let month = date2.toLocaleString([], {
      month: 'short',
    });

    let day = date2.toLocaleString([], {
      day: 'numeric',
    });

    let year = date2.toLocaleString([], {
      year: 'numeric',
    });

    if (Number(month) < 10) {
      month = `0${month}`;
    };

    if (Number(day) < 10) {
      day = `0${day}`;
    };

    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <ChakraProvider>
        <div>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className='overlay'>
              <InvoicePopUp invoice={specificInvoice as invoiceFields} />
            </div>
          </Popup>
        </div>
        <div className='filter-buttons'>
          <button onClick={findUnpaid}>OUTSTANDING </button>
          <button onClick={findPaid}>PAID</button>
          <button onClick={allInvoices}>ALL INVOICES</button>
        </div>
        <table className='GeneratedTable'>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Client</th>
              <th>Due Date</th>
              <th>Due</th>
            </tr>
          </thead>
          {!paidRender ? (
            <tbody className='invoicesTable'>
              {invoices?.map((invoice, index) => (
                <tr key={String(invoice._id)}>
                  <>
                    <td data-cy={`link-${index}`}>
                      <button onClick={() => selectInvoice(invoice)}>
                        <>
                          👁️ #{invoice.purchaseOrderNumber}
                        </>
                      </button>
                    </td>
                    <td>{invoice.clientFullName}</td>
                    <td>{GetDate(invoice.date)}</td>
                    <td>
                      <>
                        £{invoice.rate}
                      </></td>
                  </>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {isPaid.map((invoice) => (
                <tr key={String(invoice._id)}>
                  <td>
                    <Link href={`/members-only/invoice/${invoice._id}`}>
                      {`#${invoice.purchaseOrderNumber}`}
                    </Link>
                  </td>
                  <td>{invoice.clientFullName}</td>
                  <td>{GetDate(invoice.date)}</td>
                  <td>
                    <>
                      £{invoice.rate}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </ChakraProvider>
    </>
  );
};

export default DisplayInvoiceList;
