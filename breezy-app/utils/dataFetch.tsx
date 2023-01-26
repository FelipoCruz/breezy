// import 'server-only'

import { invoiceFields } from './types';

const uri = 'https://breezy-delta.vercel.app';

export async function getData(id: String) {
  console.log('user id in dataFetch module is :', id)
  try {
    const res = await fetch(`${uri}/api/${id}`);
    const parsed = await res.json()
    return parsed;
  } catch (error) {
    console.log('error in getData', error);
  }  
}


export async function getDataById(id: String) {
  try {
    const res = await fetch(`${uri}/api/${id}`);
    return await res.json();    
  } catch (error) {
    console.log('error in getDataById', error);
  }
}

export async function getInvoiceDataById(id: String) {
  try {
    console.log('id in getInvoiceDataById', id);
    const res = await fetch(`${uri}/api/pay-invoice/${id}`);
    console.log('response of getInvoiceDataById', res);
    return await res.json();
  } catch (error) {
    console.log('Error in getInvoiceDatabyId :', error)
  }
}

export async function submitData(data: invoiceFields) {
  console.log('data in SumbitData (BE) :', data)
  try {
    const res = await fetch(`${uri}/api/hello`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateData(id: String, data: invoiceFields) {
  try {
    const response = await fetch(`${uri}/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
