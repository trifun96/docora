import React, { useState, useRef, useEffect } from 'react';
import '../components/PatientFrom.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PatientForm({ onGenerateReport, onEmailChange, onPatientDataFilled }) {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [telefon, setTelefon] = useState('');
    const [datumRodjenja, setDatumRodjenja] = useState(null);
    const [kontrola, setDatumKontrola] = useState(null);
    const [email, setEmail] = useState('');
    const [opis, setOpis] = useState('');
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);

    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition && !recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'sr-RS';
        } else if (!SpeechRecognition) {
            console.warn('Ovaj pretraživač ne podržava prepoznavanje govora.');
        }
    }, []);

const toggleListening = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
        alert('Vaš pretraživač ne podržava prepoznavanje govora.');
        return;
    }

    if (listening) {
        recognition.stop();
        setListening(false);
    } else {
        recognition.start();
        setListening(true);

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            if (finalTranscript) {
                // 1. Zamena izgovorenih interpunkcija
                finalTranscript = finalTranscript
                    .replace(/\btačka\b/gi, '.')
                    .replace(/\bzarez\b/gi, ',')
                    .replace(/\buzvičnik\b/gi, '!')
                    .replace(/\bznak pitanja\b/gi, '?');

                // 2. Uklanjanje viška razmaka
                finalTranscript = finalTranscript
                    .replace(/\s+/g, ' ')
                    .replace(/\s([,.!?])/g, '$1')
                    .trim();

                // 3. Veliko slovo na početku rečenica
                finalTranscript = finalTranscript
                    .split(/(?<=[.?!])\s+/)
                    .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
                    .join(' ');

                // 4. Dodavanje u postojeći opis
                setOpis(prevOpis => {
                    const separator = prevOpis ? ' ' : '';
                    return prevOpis + separator + finalTranscript;
                });
            }
        };

        recognition.onerror = (event) => {
            console.error('Greška u prepoznavanju govora:', event.error);
            setListening(false);
            recognition.stop();
        };

        recognition.onend = () => {
            setListening(false);
        };
    }
};


    const formatDatumKontrole = (dateObj) => {
        if (!dateObj || !(dateObj instanceof Date)) return '';
        return new Intl.DateTimeFormat('sr-RS').format(dateObj);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!email || !email.includes('@')) {
            alert('Molimo unesite validnu email adresu.');
            return;
        }

        setLoading(true);

        const patientData = {
            ime,
            prezime,
            telefon,
            datumRodjenja: formatDatumKontrole(datumRodjenja),
            kontrola: formatDatumKontrole(kontrola),
            email,
            opis
        };
  
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <input
                        placeholder="Ime"
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Prezime"
                        value={prezime}
                        onChange={(e) => setPrezime(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <input
                        placeholder="Telefon"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Datum rođenja</label>
                    <DatePicker
                        selected={datumRodjenja}
                        onChange={(date) => setDatumRodjenja(date)}
                        placeholderText="Izaberi datum"
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        className="datepicker-input"
                        style={{ width: '100%', backgroundColor: 'white' }}
                    />


                </div>
                <div className="form-group">
                    <label>Kontrola kod stomatologa</label>
                    <DatePicker
                        selected={kontrola}
                        onChange={(date) => setDatumKontrola(date)}
                        placeholderText="Izaberi datum"
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        className="datepicker-input"
                        style={{ width: '100%', backgroundColor: 'white' }}
                    />


                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <textarea
                        placeholder="Opis ili napomene"
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                        required
                        rows={6}
                    />
                </div>
            </div>

            <div className="form-row">
                <button type="button" onClick={toggleListening}>
                    {listening ? 'Zaustavi snimanje' : 'Govori'}
                </button>
                <button type="submit" disabled={loading}>
                    {loading ? 'Generišem...' : 'Generiši izveštaj'}
                </button>
            </div>
        </form>
    );
}
