'use client';

import React from 'react';
import styles from '../styles/landing-page.module.css';
import './displayInvoice.css';
import Image from 'next/image';
import Logo from '../public/BlackLogo.png';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { updateData } from '../utils/dataFetch';
import { invoiceFields } from '../utils/types';

const ClientViewInvoice = ({
  invoice,
  dueDate,
  currentDate,
  amount
}: { invoice: invoiceFields, dueDate: String, currentDate: String, amount: String }) => {
  const [invoiceStatus, setInvoiceStatus] = useState(invoice.paid);
  // TODO; check what is the type of invoice._id
  const updateStatus = async (invoice: invoiceFields) => {
    const newInvoiceStatus = invoice._id && await updateData(invoice._id, invoice);
    setInvoiceStatus(newInvoiceStatus.paid);
  };

  function handleOnClick() {
    updateStatus({ ...invoice, paid: true });
  };

  return (
    <>
      <ChakraProvider>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image src={Logo} height={120} alt='logo' priority />
          </div>
        </div>
        <div className={styles.container}>
          {invoiceStatus ? (
            <div>
              <h1>Thanks for your payment!</h1>
              <a href='/'>
                <Button bg='#bfdbfe' size='lg'>
                  BACK TO HOME
                </Button>
              </a>
            </div>
          ) : (
            <div className='invoice-box'>
              <table cellPadding='0' cellSpacing='0'>
                <tr className='top'>
                  <td colSpan={Number('3')}>
                    <table>
                      <tr>
                        <td className='title'>
                          <Image alt={'logo'} src={Logo} width={150}></Image>
                        </td>
                        <td>
                          <>
                            #{invoice.purchaseOrderNumber}
                            <br />
                            <br />
                            <strong>
                              <>
                                PO Number:#{invoice.purchaseOrderNumber}
                              </>
                            </strong>
                            <br />
                            <strong>Date:</strong> {currentDate}
                            <br />
                            <strong>Due:</strong>{' '}
                            {dueDate === currentDate ? 'On Receipt' : dueDate}
                          </>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr className='information'>
                  <td colSpan={Number('2')}>
                    <table>
                      <tr>
                        <td>
                          {invoice.fullName}
                          <br />
                          {invoice.address}
                          <br />
                          {invoice.email}
                        </td>
                        <td>
                          <strong>Bill To</strong>
                          <br />
                          {invoice.clientFullName}
                          <br />
                          {invoice.clientAddress}
                          <br />
                          {invoice.clientEmail}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr className='heading'>
                  <td>Item</td>
                  <td>Price</td>
                </tr>
                <tr className='item'>
                  <td>{invoice.description}</td>
                  <td>
                    <>
                      £{invoice.rate}
                    </>
                  </td>
                </tr>
                <tr className='total'>
                  <td></td>
                  <td>
                    <>
                      Total: £{invoice.rate}
                    </>
                  </td>
                </tr>
              </table>
              <div className={styles.payButton}>
                {!invoiceStatus ? (
                  <Button onClick={handleOnClick} bg='#bfdbfe'>
                    PAY INVOICE
                  </Button>
                ) : (
                  'paid!'
                )}
              </div>
            </div>
          )}
        </div>
      </ChakraProvider>
    </>
  );
};

export default ClientViewInvoice;
