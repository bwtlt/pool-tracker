import { getAuthToken } from '../../googleapi/getAuthToken';

async function updateValues(data) {
    const { GoogleAuth } = require('google-auth-library');
    const { google } = require('googleapis');

    const auth = await getAuthToken();

    const sheets = google.sheets({ version: 'v4', auth });
    const resource = {
        "range": data.name,
        "majorDimension": "ROWS",
        "values": [
            [data.date, data.value],
        ],
    };
    try {
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SHEET_ID,
            range: data.name,
            valueInputOption: 'RAW',
            resource,
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export default async function handler(req, res) {
    const body = req.body
    console.log('body: ', body)

    if (!body.date || !body.name || !body.value) {
        return res.json({ data: 'missing field' })
    }

    let result = await updateValues(body);
    res.json({ data: `${body.date} ${body.name} ${body.value}` })
}