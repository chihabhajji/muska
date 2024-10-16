'use server';
import { google } from 'googleapis';

import keys from '../../sheet-service-account.json';

import { env } from '@/env.mjs';

export const getMuskaUsers = async () => {
  const client = new google.auth.JWT(
    keys.client_email,
    undefined,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  await client.authorize();
  const gsapi = google.sheets({ version: 'v4', auth: client });
  const response = await gsapi.spreadsheets.values.get({
    spreadsheetId: env.SHEET_ID,
    range: 'Sheet1!A2:A',
  });
  if (!response.data?.values || !response.data?.values?.length) {
    throw new Error('No data found');
  }

  return response.data.values as string[][];
};
