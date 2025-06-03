export async function generateReport(prompt) {
  console.log(prompt, 'prompt');

  const response = await fetch('http://localhost:3001/api/generate-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('generateReport data:', data);

  return data.report;  // <-- OVO JE KLJUČNO
}

export async function sendReport(email, pdfBlob) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('pdf', pdfBlob, 'izvestaj.pdf');

  const response = await fetch('http://localhost:3001/api/send-report', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to send report');
  }
}
