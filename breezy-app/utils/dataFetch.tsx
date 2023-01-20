// import 'server-only'

import { invoiceFields } from "./types";

const uri = 'http://localhost:3000';

export async function getData() {
  const res = await fetch(`${uri}/api/hello`);
  if (!res.ok) {
    throw new Error('failed to fetch data');
  }
  const parsed = await res.json()
  console.log(parsed)

  return parsed;
}

export async function getDataById(id: String) {
  console.log('get data by id =====>', id);
  const res = await fetch(`${uri}/api/${id}`);
  console.log('res', res.body);
  if (!res.ok) {
    throw new Error('failed to fetch data');
  }
  return await res.json();
}

export async function getInvoiceDataById(id: String) {
  const res = await fetch(`${uri}/api/pay-invoice/${id}`);
  console.log('res', res.body);
  if (!res.ok) {
    throw new Error('failed to fetch data');
  }
  return await res.json();
}

export async function submitData(data: invoiceFields) {
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
  console.log('id from param', id);
  console.log('data from param', data);
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
