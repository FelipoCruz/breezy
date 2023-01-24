import { getDataById } from '../../../utils/dataFetch';
import React from 'react';
import Logo from '../../../public/ForWeb/png/BlackLogo.png';
import Image from 'next/image';
import { Params } from '../../../utils/types';
import { useEffect, useState } from 'react';

export default function FetchInvoice({ params }: Params ) {
  console.log('params are:', params);
  // const id = params.id;
  const [ invoice, setInvoice ] = useState([])
  const fetchInvoices = async () => {
    const response = await getDataById(id);
    setInvoice(response)
  }

  useEffect(()=> {
    fetchInvoices()
  }, [])

  function GetDate(date: number) {
    const date2 = new Date(date);

    let month = date2.toLocaleString([], {
      month: 'numeric',
    });
    let day = date2.toLocaleString([], {
      day: 'numeric',
    });

    let year = date2.toLocaleString([], {
      year: 'numeric',
    });

    if (Number(month) < 10) {
      month = `0${month}`;
    }
    if (Number(day) < 10) {
      day = `0${day}`;
    }

    const formatedDate = `${day}/${month}/${year}`;
    return formatedDate;
  }

  const currentDate = GetDate(Date.now());
  const dueDate = GetDate(invoice.date);

  return (
    <>
      <div className='invoice-box'>
        <table cellPadding='0' cellSpacing='0'>
          <tr className='top'>
            <td colSpan={Number('3')}>
              <table>
                <tr>
                  <td className='title'>
                    <Image alt='logo of the brand' src={Logo} width={150}></Image>
                  </td>
                  <td>
                    INVOICE #1
                    <br />
                    <br />
                    <strong>PO Number:#{invoice.purchaseOrderNumber}</strong>
                    <br />
                    <strong>Date:</strong> {currentDate}
                    <br />
                    <strong>Due:</strong> {dueDate === currentDate ? 'On Receipt' : dueDate}
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
            <td>£{invoice.rate}</td>
          </tr>
          <tr className='total'>
            <td></td>
            <td>Total: £{invoice.rate}</td>
          </tr>
        </table>
      </div>
    </>
  );
};