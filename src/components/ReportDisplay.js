import React, { useCallback, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from 'axios';

pdfMake.vfs = pdfFonts.vfs;

const ReportDisplay = React.memo(({ report, email, patientData }) => {
    console.log(patientData, 'patientdata');

    const [loading, setLoading] = useState(false);

    const generateAndSendPdf = useCallback(async () => {
        if (!email || !email.includes('@')) {
            alert('Email adresa nije validna.');
            return;
        }

        const cleanedReport = report
            .replace(/Potpis lekara:.*(\r?\n)?/gi, '')
            .replace(/Potpis:.*(\r?\n)?/gi, '')
            .replace(/Dr\.?\s+[^\n]+(\r?\n)?/gi, '')
            .replace(/Prim\.?\s+[^\n]+(\r?\n)?/gi, '')
            .replace(/Prof\.?\s+[^\n]+(\r?\n)?/gi, '')
            .replace(/Specijalista.*(\r?\n)?/gi, '')
            .replace(/Lekar specijalista.*(\r?\n)?/gi, '')
            .replace(/Medicinski izveštaj:.*(\r?\n)?/gi, '')
            .replace(/Izveštaj:.*(\r?\n)?/gi, '')
            .replace(/Stomatološki:.*(\r?\n)?/gi, '')

            .replace(/S poštovanjem,?(\r?\n)?/gi, '')
            .replace(/(Srdačan|Srdačno)?\s*Pozdrav,?(\r?\n)?/gi, '')
            .replace(/Lep pozdrav,?(\r?\n)?/gi, '')
            .replace(/Hvala na poverenju\.?(\r?\n)?/gi, '')

            .replace(/Datum pregleda:.*(\r?\n)?/gi, '')
            .replace(/Datum:.*(\r?\n)?/gi, '')
            .replace(/Vreme:.*(\r?\n)?/gi, '')
            .replace(/Datu[mn]\s+generisan[oa]:?.*(\r?\n)?/gi, '')
            .replace(/Napomena:.*(\r?\n)?/gi, '')

            .replace(/Web:.*(\r?\n)?/gi, '')

            .replace(/Ovaj izveštaj je generisan.*(\r?\n)?/gi, '')
            .replace(/Generisano pomoću.*(\r?\n)?/gi, '')
            .replace(/AI model.*(\r?\n)?/gi, '')

            .replace(/\n{2,}/g, '\n')
            .trim();



        const docDefinition = {
            content: [
                { text: 'Dental Medic', style: 'header', alignment: 'center' },
                { text: 'Ulica Djordja Stanojevica 43, 31210 Požega', style: 'headerSub', alignment: 'center' },
                {
                    style: 'patientInfo',
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Ime:', patientData.ime || ''],
                            ['Prezime:', patientData.prezime || ''],
                            ['Datum rođenja:', patientData.datumRodjenja || ''],
                            ['Telefon:', patientData.telefon || ''],
                            ['Email:', patientData.email || ''],
                            ['Datum kontrole:', patientData.kontrola || ''],
                        ],
                    },
                    layout: 'noBorders',
                    margin: [0, 50, 0, 10]
                },

                { text: cleanedReport, style: 'content', margin: [0, 10, 0, 10] },

                {
                    text: `Datum generisanja: ${new Date().toLocaleDateString()}`,
                    style: 'footer',
                    absolutePosition: { x: 40, y: 780 },
                },

                {
                    text: 'Lekar specijalista: DR. Jelena Maksimović',
                    style: 'footer',
                    absolutePosition: { x: 370, y: 780 },
                },
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 5],
                },
                headerSub: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 5],
                },
                subheader: {
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 50, 0, 10] 
                },
                content: {
                    fontSize: 12,
                    lineHeight: 1.5,
                },
                footer: {
                    fontSize: 10,
                    italics: true,
                },
                patientInfo: {
                    fontSize: 11,
                    margin: [0, 10, 0, 10],
                },
            },
            pageMargins: [40, 40, 40, 40],
        };

        setLoading(true);

        pdfMake.createPdf(docDefinition).getBlob(async (blob) => {
            try {
                const formData = new FormData();
                formData.append('pdf', blob, 'izvestaj.pdf');
                formData.append('email', email);

                for (let [key, value] of formData.entries()) {
                    console.log(`${key}:`, value);
                }

                await axios.post('http://localhost:3001/api/send-report', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                alert('Izveštaj je uspešno poslat na mejl!');
            } catch (error) {
                console.error('Greška pri slanju mejla:', error);
                alert('Došlo je do greške prilikom slanja mejla.');
            } finally {
                setLoading(false);
            }
        });
    }, [report, email]);

    return (
        <div style={{ marginTop: 20 }}>
            <h2>Generisani izveštaj</h2>
            <pre
                style={{
                    whiteSpace: 'pre-wrap',
                    backgroundColor: '#f5f5f5',
                    padding: 10,
                    maxHeight: 300,
                    overflowY: 'auto',
                    borderRadius: 4,
                }}
            >
                {report}
            </pre>
            <button onClick={generateAndSendPdf} disabled={loading} style={{ marginTop: 10 }}>
                {loading ? 'Šaljem...' : 'Pošalji PDF na mejl'}
            </button>
        </div>
    );
});

export default ReportDisplay;
