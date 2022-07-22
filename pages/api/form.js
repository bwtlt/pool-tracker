/**
 * Updates values in a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The range of values to update.
 * @param {object} valueInputOption Value update options.
 * @param {(string[])[]} _values A 2d array of values to update.
 * @return {obj} spreadsheet information
 */
async function updateValues(name, value) {
    const { GoogleAuth } = require('google-auth-library');
    const { google } = require('googleapis');

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log(`sheet id: ${process.env.SHEET_ID}`)
    const resource = {
        "range": name,
        "majorDimension": "ROWS",
        "values": [
            [new Date(Date.now()).toLocaleString(), value],
        ],
    };
    try {
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SHEET_ID,
            range: name,
            valueInputOption: 'RAW',
            resource,
        });
        console.log('%d cells updated.', result.data.updatedCells);
        return result;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}

export default async function handler(req, res) {
    const body = req.body
    console.log('body: ', body)

    // Both of these are required.
    if (!body.name || !body.value) {
        return res.json({ data: 'name or value not found' })
    }

    // Found the name.
    //res.json({ data: `${body.first} ${body.last}` })
    let result = await updateValues(body.name, body.value);
    res.json({ data: `${body.name} ${body.value}` })
}