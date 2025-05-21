import React, { useState } from "react";

const cars = [
  { vin: "1HGCM82633A004352", model: "VW Golf", year: 2019, price: 18000, standzeit: 30 },
  { vin: "WBA5A7C53FG123456", model: "BMW 3er", year: 2021, price: 35000, standzeit: 15 },
  { vin: "WAUZZZ8K4BA123789", model: "Audi A4", year: 2020, price: 30000, standzeit: 20 },
];

function Bar({ label, value, max, darkMode }) {
  const widthPercent = (value / max) * 100;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: darkMode ? "#eee" : "#333" }}>{label}</div>
      <div
        style={{
          height: 24,
          width: `${widthPercent}%`,
          backgroundColor: "#1abc9c",
          borderRadius: 12,
          transition: "width 0.5s ease",
        }}
      />
      <div style={{ fontSize: 14, color: darkMode ? "#ccc" : "#555", marginTop: 4 }}>{value} Tage</div>
    </div>
  );
}

export default function App() {
  const [vinInput, setVinInput] = useState("");
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");
  const [copiedVin, setCopiedVin] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const maxStandzeit = Math.max(...cars.map((c) => c.standzeit));

  const handleSearch = () => {
    if (!vinInput) {
      setError("Bitte eine VIN eingeben.");
      setCar(null);
      return;
    }
    const found = cars.find((c) => c.vin.toLowerCase() === vinInput.toLowerCase());
    if (found) {
      setCar(found);
      setError("");
    } else {
      setCar(null);
      setError("Fahrzeug mit dieser VIN nicht gefunden.");
    }
  };

  const copyToClipboard = async (vin) => {
    try {
      await navigator.clipboard.writeText(vin);
      setCopiedVin(vin);
      setTimeout(() => setCopiedVin(null), 2000);
    } catch (err) {
      alert("Kopieren nicht möglich. Bitte manuell kopieren.");
    }
  };

  const bgColor = darkMode ? "#1e1e1e" : "#f9f9f9";
  const textColor = darkMode ? "#eee" : "#222";
  const inputBg = darkMode ? "#2e2e2e" : "#fff";
  const borderColor = darkMode ? "#1abc9c" : "#1abc9c";
  const bodyBgColor = darkMode ? "#000" : "#fff";

  return (
    <div style={{ backgroundColor: bodyBgColor, minHeight: "100vh", padding: 20 }}>
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          maxWidth: 600,
          margin: "0 auto",
          padding: 20,
          backgroundColor: bgColor,
          borderRadius: 14,
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          color: textColor,
        }}
      >
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ marginBottom: 4 }}>Albert Korotaev</h1>
          <h3 style={{ fontWeight: "normal", color: "#1abc9c", marginTop: 0 }}>
            Bewerbung Wirtschaftsinformatik (dual)
          </h3>
          <p style={{ fontStyle: "italic", color: darkMode ? "#aaa" : "#666" }}>
            Fahrzeugdetails per VIN-Suche & Standzeit-Visualisierung
          </p>
          <p style={{ marginTop: 10, fontSize: 14, color: darkMode ? "#bbb" : "#555" }}>
            Hi, ich bin Albert – diese kleine Website habe ich im Rahmen meiner Bewerbung selbst programmiert.
          </p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              marginTop: 10,
              backgroundColor: "#1abc9c",
              border: "none",
              color: "white",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {darkMode ? "☀️ Hell" : "🌙 Dunkel"} Modus
          </button>
        </header>

        <section style={{ marginBottom: 30 }}>
          <label htmlFor="vin-input" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>VIN eingeben:</label>
          <input
            id="vin-input"
            type="text"
            value={vinInput}
            onChange={(e) => setVinInput(e.target.value)}
            placeholder="z. B. 1HGCM82633A004352"
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: 16,
              backgroundColor: inputBg,
              border: `2px solid ${borderColor}`,
              color: textColor,
              borderRadius: 8,
              marginBottom: 10,
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#1abc9c",
              color: "white",
              padding: "10px 16px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Suchen
          </button>
        </section>

        <section style={{ marginBottom: 30 }}>
          <p style={{ fontWeight: 600, marginBottom: 10 }}>Beispiel-VINs zum Testen:</p>
          {cars.map((c) => (
            <div key={c.vin} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <code style={{ flexGrow: 1, fontSize: 14 }}>{c.vin}</code>
              <button
                onClick={() => copyToClipboard(c.vin)}
                style={{
                  marginLeft: 10,
                  padding: "4px 10px",
                  backgroundColor: copiedVin === c.vin ? "#16a085" : "#1abc9c",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                {copiedVin === c.vin ? "✓ Kopiert" : "Kopieren"}
              </button>
            </div>
          ))}
        </section>

        {error && (
          <div style={{ color: "#e74c3c", fontWeight: 600, marginBottom: 20, textAlign: "center" }}>{error}</div>
        )}

        {car && (
          <section>
            <h3 style={{ borderBottom: `2px solid ${borderColor}`, paddingBottom: 6, marginBottom: 20 }}>
              Fahrzeugdetails
            </h3>
            <p><strong>Modell:</strong> {car.model}</p>
            <p><strong>Baujahr:</strong> {car.year}</p>
            <p><strong>Preis:</strong> {car.price.toLocaleString("de-DE")} €</p>
            <div style={{ marginTop: 30 }}>
              <h4 style={{ marginBottom: 10 }}>Standzeit (Tage)</h4>
              <Bar label={car.model} value={car.standzeit} max={maxStandzeit} darkMode={darkMode} />
            </div>
          </section>
        )}

        <footer style={{ marginTop: 60, fontSize: 12, color: darkMode ? "#aaa" : "#999", textAlign: "center" }}>
          &copy; 2025 Albert Korotaev · Diese Website entstand zur Demonstration meiner Motivation und Lernbereitschaft.
        </footer>
      </div>
    </div>
  );
}
