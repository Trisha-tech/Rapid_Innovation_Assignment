const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');


async function pdfGenerator(booking) {
    try {
        const html = await ejs.renderFile(path.join(__dirname, './sample.ejs'), { booking });
        const options = {
            format: 'Letter',  
            border: {
                top: '0.8in',  
                right: '0.8in',
                bottom: '0.8in',
                left: '0.8in'
            },
            paginationOffset: 1,
            header: {
                height: '66mm',
                contents: '<div style="text-align: center;color:red;font-weight:500;font-size:34px">Booking Confirmaton Details on IRCTC, Train: 15074, 17-Jul-2024, SL, BCN - BDL</div>'
            }
        };

        return new Promise((resolve, reject) => {
            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
    } catch (err) {
        console.error('Error generating PDF:', err);
        throw err; 
    }
}

module.exports = {pdfGenerator };
