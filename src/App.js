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

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 600,
        margin: "50px auto",
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

      <section style={{ marginBottom: 20 }}>
        <label htmlFor="vin-input" style={{ fontWeight: 600, fontSize: 16, display: "block", marginBottom: 8 }}>
          VIN eingeben:
        </label>
        <input
          id="vin-input"
          type="text"
          value={vinInput}
          onChange={(e) => setVinInput(e.target.value)}
          placeholder="z.B. 1HGCM82633A004352"
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: 16,
            borderRadius: 8,
            border: `2px solid ${borderColor}`,
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: inputBg,
            color: textColor,
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            marginTop: 16,
            backgroundColor: "#1abc9c",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            width: "100%",
          }}
        >
          Suchen
        </button>
      </section>

      <section style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 14, color: darkMode ? "#aaa" : "#777" }}>Beispiel-VINs zum Testen:</p>
        <ul style={{ listStyleType: "none", paddingLeft: 0, fontSize: 14 }}>
          {cars.map((car) => (
            <li
              key={car.vin}
              style={{ marginBottom: 10, display: "flex", alignItems: "center", color: textColor }}
            >
              <code style={{ marginRight: 8 }}>{car.vin}</code> — {car.model}
              <button
                onClick={() => copyToClipboard(car.vin)}
                style={{
                  marginLeft: 12,
                  padding: "4px 10px",
                  fontSize: 12,
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: copiedVin === car.vin ? "#27ae60" : "#1abc9c",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: copiedVin === car.vin ? "scale(1.05)" : "none",
                }}
              >
                {copiedVin === car.vin ? "Kopiert" : "Kopieren"}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {error && (
        <div
          style={{
            color: "#e74c3c",
            fontWeight: 600,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {car && (
        <section>
          <h3
            style={{
              borderBottom: "3px solid #1abc9c",
              paddingBottom: 8,
              marginBottom: 20,
              fontWeight: "600",
            }}
          >
            Fahrzeugdetails
          </h3>
          <div style={{ fontSize: 18, lineHeight: 1.6 }}>
            <p>
              <strong>Modell:</strong> {car.model}
            </p>
            <p>
              <strong>Baujahr:</strong> {car.year}
            </p>
            <p>
              <strong>Preis:</strong> {car.price.toLocaleString("de-DE")} €
            </p>
          </div>

          <div style={{ marginTop: 40 }}>
            <h4 style={{ marginBottom: 12 }}>Standzeit (Tage)</h4>
            <Bar label={car.model} value={car.standzeit} max={maxStandzeit} darkMode={darkMode} />
          </div>
        </section>
      )}

      <section style={{ marginTop: 60 }}>
        <h3 style={{ borderBottom: "3px solid #1abc9c", paddingBottom: 8, marginBottom: 20 }}>
          Warum diese Seite?
        </h3>
        <p style={{ lineHeight: 1.6, fontSize: 15, color: darkMode ? "#ccc" : "#444" }}>
          Diese Website entstand im Rahmen meiner Bewerbung zum dualen Studium Wirtschaftsinformatik.
          Ziel war es, eine kleine interaktive Anwendung mit React zu entwickeln, die Datenvisualisierung,
          Benutzerfreundlichkeit und Suchlogik kombiniert. Sie zeigt mein Interesse an Technologie
          und mein Verständnis für praxisnahe Softwarelösungen.
        </p>
      </section>

      <footer
        style={{
          marginTop: 60,
          fontSize: 13,
          color: darkMode ? "#999" : "#777",
          textAlign: "center",
          borderTop: darkMode ? "1px solid #444" : "1px solid #ddd",
          paddingTop: 20,
        }}
      >
        &copy; 2025 Albert Korotaev — Bewerbung Wirtschaftsinformatik (dual)
      </footer>
    </div>
  );
}