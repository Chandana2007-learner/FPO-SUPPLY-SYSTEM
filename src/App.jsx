 import React, { useEffect, useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f7f2",
    fontFamily: "Arial, sans-serif",
    color: "#26352b",
  },
  header: {
    background: "#176b3a",
    color: "white",
    padding: "22px 5%",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "18px",
  },
  button: {
    padding: "11px 17px",
    border: "none",
    borderRadius: "7px",
    background: "#23834b",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "25px 18px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 9px #00000012",
    marginBottom: "18px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "7px",
    marginBottom: "14px",
    border: "1px solid #cbd5cb",
    borderRadius: "7px",
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
};

const initialFarmers = [];
const initialBuyers = [];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [page, setPage] = useState("home");

  const [farmers, setFarmers] = useState(() =>
    loadData("fpo_farmers", initialFarmers)
  );

  const [buyers, setBuyers] = useState(() =>
    loadData("fpo_buyers", initialBuyers)
  );

  const [farmer, setFarmer] = useState({
    name: "",
    phone: "",
    location: "",
    crop: "",
    quantity: "",
  });

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    crop: "",
    quantity: "",
    location: "",
  });

  useEffect(() => {
    localStorage.setItem("fpo_farmers", JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem("fpo_buyers", JSON.stringify(buyers));
  }, [buyers]);

  const handleFarmerSubmit = (e) => {
    e.preventDefault();

    const newFarmer = {
      ...farmer,
      id: Date.now(),
      quantity: Number(farmer.quantity),
    };

    setFarmers((previous) => [...previous, newFarmer]);

    setFarmer({
      name: "",
      phone: "",
      location: "",
      crop: "",
      quantity: "",
    });

    alert("Farmer registered successfully!");
    setPage("dashboard");
  };

  const handleBuyerSubmit = (e) => {
    e.preventDefault();

    const newBuyer = {
      ...buyer,
      id: Date.now(),
      quantity: Number(buyer.quantity),
    };

    setBuyers((previous) => [...previous, newBuyer]);

    setBuyer({
      name: "",
      phone: "",
      crop: "",
      quantity: "",
      location: "",
    });

    alert("Buyer requirement submitted successfully!");
    setPage("dashboard");
  };

  const totalSupply = farmers.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const totalDemand = buyers.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const recommendations = buyers.map((item) => {
    const matchingFarmers = farmers.filter(
      (f) => f.crop.toLowerCase() === item.crop.toLowerCase()
    );

    return {
      ...item,
      matchingFarmers,
    };
  });

  return (
    <div style={styles.page}>
      <style>{`
        button:hover { opacity: 0.88; }
        input:focus { outline: 2px solid #80b88d; }
        .nav-button {
          background: #ffffff;
          color: #176b3a;
          border: 1px solid #d7eadc;
          padding: 10px 14px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: bold;
        }
        .nav-button.active {
          background: #d9f0df;
        }
        .section-title {
          color: #176b3a;
          margin-top: 0;
        }
      `}</style>

      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>🌾 FPO Connect</h1>
        <p>Smart Agriculture and Farmer-Buyer Connection Platform</p>

        <nav style={styles.nav}>
          {[
            ["home", "Home"],
            ["farmer", "Farmer Registration"],
            ["buyer", "Buyer Requirements"],
            ["dashboard", "FPO Dashboard"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={`nav-button ${page === value ? "active" : ""}`}
              onClick={() => setPage(value)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main style={styles.container}>
        {page === "home" && (
          <>
            <section style={styles.card}>
              <h2 className="section-title">
                Welcome to FPO Connect!
              </h2>
              <p>
                A smart platform connecting farmers, buyers and
                Farmer Producer Organisations.
              </p>
              <p>
                Register farmers, submit buyer requirements and
                monitor agricultural supply and demand.
              </p>

              <div style={styles.nav}>
                <button
                  style={styles.button}
                  onClick={() => setPage("farmer")}
                >
                  Register Farmer
                </button>

                <button
                  style={styles.button}
                  onClick={() => setPage("buyer")}
                >
                  Add Buyer Requirement
                </button>

                <button
                  style={styles.button}
                  onClick={() => setPage("dashboard")}
                >
                  View Dashboard
                </button>
              </div>
            </section>

            <div style={styles.grid}>
              <div style={styles.card}>
                <h3>👨‍🌾 Farmer Registration</h3>
                <p>Register farmers and their available crops.</p>
              </div>

              <div style={styles.card}>
                <h3>🛒 Buyer Requirements</h3>
                <p>Collect buyer crop and quantity requirements.</p>
              </div>

              <div style={styles.card}>
                <h3>📊 FPO Dashboard</h3>
                <p>Monitor predictions, risks and recommendations.</p>
              </div>
            </div>
          </>
        )}

        {page === "farmer" && (
          <section style={styles.card}>
            <h2 className="section-title">
              👨‍🌾 Farmer Registration
            </h2>

            <form onSubmit={handleFarmerSubmit}>
              <label>Farmer Name</label>
              <input
                style={styles.input}
                placeholder="Enter farmer name"
                value={farmer.name}
                onChange={(e) =>
                  setFarmer({ ...farmer, name: e.target.value })
                }
                required
              />

              <label>Phone Number</label>
              <input
                style={styles.input}
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit phone number"
                value={farmer.phone}
                onChange={(e) =>
                  setFarmer({ ...farmer, phone: e.target.value })
                }
                required
              />

              <label>Village / Location</label>
              <input
                style={styles.input}
                placeholder="Enter village"
                value={farmer.location}
                onChange={(e) =>
                  setFarmer({ ...farmer, location: e.target.value })
                }
                required
              />

              <label>Available Crop</label>
              <select
                style={styles.input}
                value={farmer.crop}
                onChange={(e) =>
                  setFarmer({ ...farmer, crop: e.target.value })
                }
                required
              >
                <option value="">Select crop</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Onion">Onion</option>
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
              </select>

              <label>Available Quantity (kg)</label>
              <input
                style={styles.input}
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={farmer.quantity}
                onChange={(e) =>
                  setFarmer({ ...farmer, quantity: e.target.value })
                }
                required
              />

              <button style={styles.button} type="submit">
                Submit Registration
              </button>
            </form>
          </section>
        )}

        {page === "buyer" && (
          <section style={styles.card}>
            <h2 className="section-title">
              🛒 Buyer Requirement Form
            </h2>

            <form onSubmit={handleBuyerSubmit}>
              <label>Buyer Name / Company</label>
              <input
                style={styles.input}
                placeholder="Enter buyer name"
                value={buyer.name}
                onChange={(e) =>
                  setBuyer({ ...buyer, name: e.target.value })
                }
                required
              />

              <label>Phone Number</label>
              <input
                style={styles.input}
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit phone number"
                value={buyer.phone}
                onChange={(e) =>
                  setBuyer({ ...buyer, phone: e.target.value })
                }
                required
              />

              <label>Required Crop</label>
              <select
                style={styles.input}
                value={buyer.crop}
                onChange={(e) =>
                  setBuyer({ ...buyer, crop: e.target.value })
                }
                required
              >
                <option value="">Select crop</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Onion">Onion</option>
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
              </select>

              <label>Required Quantity (kg)</label>
              <input
                style={styles.input}
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={buyer.quantity}
                onChange={(e) =>
                  setBuyer({ ...buyer, quantity: e.target.value })
                }
                required
              />

              <label>Delivery Location</label>
              <input
                style={styles.input}
                placeholder="Enter delivery location"
                value={buyer.location}
                onChange={(e) =>
                  setBuyer({ ...buyer, location: e.target.value })
                }
                required
              />

              <button style={styles.button} type="submit">
                Submit Buyer Requirement
              </button>
            </form>
          </section>
        )}

        {page === "dashboard" && (
          <>
            <h2 className="section-title">
              📊 Smart Agriculture Dashboard
            </h2>

            <div style={styles.grid}>
              <div style={styles.card}>
                <h3>👨‍🌾 Registered Farmers</h3>
                <h1>{farmers.length}</h1>
                <p>Total registered farmers</p>
              </div>

              <div style={styles.card}>
                <h3>🛒 Buyer Requirements</h3>
                <h1>{buyers.length}</h1>
                <p>Total buyer requests</p>
              </div>

              <div style={styles.card}>
                <h3>🌱 Crop Supply</h3>
                <h1>{totalSupply.toLocaleString("en-IN")} kg</h1>
                <p>Total available quantity</p>
              </div>

              <div style={styles.card}>
                <h3>📦 Crop Demand</h3>
                <h1>{totalDemand.toLocaleString("en-IN")} kg</h1>
                <p>Total requested quantity</p>
              </div>
            </div>

            <section style={styles.card}>
              <h3 className="section-title">
                🌾 Crop Yield Predictions
              </h3>
              <p>
                Prediction results from the project model can be
                displayed here.
              </p>
              <p>
                <b>Example:</b> Tomato – Expected yield: 5,000 kg
              </p>
              <small>
                Demonstration value only; not a live AI prediction.
              </small>
            </section>

            <section style={styles.card}>
              <h3 className="section-title">
                ⚠️ Risk Alerts
              </h3>
              <ul>
                <li>Weather risk – Monitor rainfall forecasts.</li>
                <li>Crop disease – Inspect crops regularly.</li>
                <li>Harvest delay – Monitor crop maturity.</li>
              </ul>
              <small>
                These are sample alerts, not live weather or disease
                detections.
              </small>
            </section>

            <section style={styles.card}>
              <h3 className="section-title">
                🤝 Farmer Recommendations
              </h3>

              {recommendations.length === 0 ? (
                <p>No buyer requirements available yet.</p>
              ) : (
                recommendations.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <b>{item.crop}</b> – Buyer needs {item.quantity} kg
                    <p>Buyer: {item.name}</p>

                    {item.matchingFarmers.length > 0 ? (
                      <p>
                        Matching farmers:{" "}
                        {item.matchingFarmers
                          .map((f) => f.name)
                          .join(", ")}
                      </p>
                    ) : (
                      <p>No matching farmers registered yet.</p>
                    )}
                  </div>
                ))
              )}
            </section>

            <section style={styles.card}>
              <h3 className="section-title">
                👨‍🌾 Registered Farmer Details
              </h3>

              {farmers.length === 0 ? (
                <p>No farmers registered yet.</p>
              ) : (
                farmers.map((f) => (
                  <div
                    key={f.id}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <b>{f.name}</b>
                    <p>Phone: {f.phone}</p>
                    <p>Location: {f.location}</p>
                    <p>Crop: {f.crop}</p>
                    <p>Available: {f.quantity} kg</p>
                  </div>
                ))
              )}
            </section>

            <section style={styles.card}>
              <h3 className="section-title">
                🛒 Buyer Requirement Details
              </h3>

              {buyers.length === 0 ? (
                <p>No buyer requirements submitted yet.</p>
              ) : (
                buyers.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <b>{b.name}</b>
                    <p>Phone: {b.phone}</p>
                    <p>Crop: {b.crop}</p>
                    <p>Required: {b.quantity} kg</p>
                    <p>Delivery: {b.location}</p>
                  </div>
                ))
              )}
            </section>
          </>
        )}
      </main>

      <footer
        style={{
          background: "#176b3a",
          color: "white",
          textAlign: "center",
          padding: "20px",
          marginTop: "30px",
        }}
      >
        <p>FPO Connect – Smart Agriculture Platform</p>
        <p>Connecting Farmers and Buyers for a Better Future 🌱</p>
      </footer>
    </div>
  );
}