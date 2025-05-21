import React, { useState } from 'react';

const cars = [
  { vin: '1HGCM82633A004352', model: 'VW Golf', year: 2019, price: 18000, standzeit: 30 },
  { vin: 'WBA5A7C53FG123456', model: 'BMW 3er', year: 2021, price: 35000, standzeit: 15 },
  { vin: 'WAUZZZ8K4BA123789', model: 'Audi A4', year: 2020, price: 30000, standzeit: 20 },
];

function Bar({ label, value, max }) {
  const barWidth = (value / max) * 100;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: '600', marginBottom: 4, color: '#3a3a3a' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            backgroundColor: '#4CAF50',
            width: `${barWidth}%`,
            height: 22,
            borderRadius: 12,
            transition: 'width 0.5s ease-in-out',
          }}
        />
        <div style={{ marginLeft: 12, fontWeight: '500', color: '#2c3e50' }}>
          {value} Tage
        </div>
      </div>
    </div>
  );
}

function App() {
  const [vinInput, setVinInput] = useState('');
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  const maxStandzeit = Math.max(...cars.map(c => c.standzeit));

  const handleSearch = () => {
    const found = cars.find(c => c.vin.toLowerCase() === vinInput.toLowerCase());
    if (found) {
      setCar(found);
      setError('');
    } else {
      setCar(null);
      setError('Fahrzeug mit dieser VIN nicht gefunden.');
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: 600,
      margin: '40px auto',
      padding: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 12,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#222',
    }}>
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ color: '#2c3e50' }}>Albert Korotaev</h1>
        <h2 style={{ color: '#16a085', fontWeight: 'normal' }}>Bewerbung Wirtschaftsinformatik (dual)</h2>
        <p style={{ fontStyle: 'italic', color: '#555' }}>Fahrzeugsuche per VIN & Standzeit-Visualisierung</p>
      </header>

      <section style={{ marginBottom: 30 }}>
        <label htmlFor="vin-input" style={{ fontWeight: '600', fontSize: 16, display: 'block', marginBottom: 8 }}>
          VIN eingeben:
        </label>
        <input
          id="vin-input"
          type="text"
          value={vinInput}
          onChange={e => setVinInput(e.target.value)}
          placeholder="z.B. 1HGCM82633A004352"
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: 16,
            borderRadius: 8,
            border: '2px solid #16a085',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            marginTop: 16,
            backgroundColor: '#16a085',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 16,
            width: '100%',
          }}
        >
          Suchen
        </button>
      </section>

      {error && (
        <div style={{ color: '#e74c3c', fontWeight: '600', marginBottom: 30, textAlign: 'center' }}>
          {error}
        </div>
      )}

      {car && (
        <section>
          <h3 style={{ borderBottom: '2px solid #16a085', paddingBottom: 8, marginBottom: 20 }}>
            Fahrzeugdetails
          </h3>
          <div style={{ fontSize: 18, lineHeight: 1.6, color: '#34495e' }}>
            <p><strong>Modell:</strong> {car.model}</p>
            <p><strong>Baujahr:</strong> {car.year}</p>
            <p><strong>Preis:</strong> {car.price.toLocaleString('de-DE')} €</p>
          </div>

          <div style={{ marginTop: 40 }}>
            <h4 style={{ marginBottom: 12, color: '#2c3e50' }}>Standzeit (Tage)</h4>
            <Bar label={`${car.model}`} value={car.standzeit} max={maxStandzeit} />
          </div>
        </section>
      )}

      <footer style={{ marginTop: 60, fontSize: 12, color: '#999', textAlign: 'center' }}>
        &copy; 2025 Albert Korotaev
      </footer>
    </div>
  );
}

export default App;
