import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import ReportDisplay from './components/ReportDisplay';

function App() {
  const [report, setReport] = useState('');
  const [email, setEmail] = useState('');
  const [patientData, setPatientData] = useState('');

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ textAlign: 'center', fontSize:'18px', fontWeight:'200' }}>Docora - NextGen izveštaj za stomatologe</h3>
      <PatientForm
        onGenerateReport={setReport}
        onEmailChange={setEmail}
        onPatientDataFilled={setPatientData}
      />
      {report && <ReportDisplay report={report} email={email} patientData={patientData} />}
    </div>
  );
}

export default App;
