import React from "react";

export const PositionPicker = ({ input, field }: any) => {
  // Načtení stávajících hodnot nebo výchozí prázdné
  const values = input.value || { top: "", right: "", bottom: "", left: "" };

  const handleChange = (pos: string, val: string) => {
    input.onChange({ ...values, [pos]: val });
  };

  // 🚀 FIX: Bezpečné rozeznání Margin vs Padding podle textu ve štítku (label)
  const labelText = field?.label ? String(field.label).toLowerCase() : "";
  const isMargin = labelText.includes("margin") || labelText.includes("vnější");
  
  const titleText = isMargin ? "MARGIN (Vnější okraje)" : "PADDING (Vnitřní odsazení)";
  const accentColor = isMargin ? "#f59e0b" : "#ef4444"; // Oranžová pro margin, červená pro padding

  // Framer-like čistý styl pro vstupní políčka
  const inputStyle = {
    width: "100%",
    height: "28px",
    textAlign: "center" as const,
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#334155",
    outline: "none",
    background: "#ffffff",
    transition: "border-color 0.15s ease",
  };

  const miniLabelStyle = {
    fontSize: "9px",
    color: "#94a3b8",
    fontWeight: "600" as const,
    textAlign: "center" as const,
    marginBottom: "2px",
    letterSpacing: "0.5px"
  };

  return (
    <div style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#ffffff", overflow: "hidden", marginTop: "6px", marginBottom: "12px", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)" }}>
      {/* Čistá Framer hlavička boxu */}
      <div style={{ background: "#f8fafc", padding: "6px 12px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: accentColor }} />
        <span style={{ fontSize: "11px", fontWeight: "600", color: "#475569", letterSpacing: "0.3px" }}>{titleText}</span>
      </div>

      {/* Kompaktní ovladač rozměrů */}
      <div style={{ padding: "14px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", alignItems: "center", maxWidth: "240px" }}>
        <div />
        <div>
          <div style={miniLabelStyle}>TOP</div>
          <input type="number" value={values.top} onChange={(e) => handleChange("top", e.target.value)} style={inputStyle} placeholder="0" />
        </div>
        <div />

        <div>
          <div style={miniLabelStyle}>LEFT</div>
          <input type="number" value={values.left} onChange={(e) => handleChange("left", e.target.value)} style={inputStyle} placeholder="0" />
        </div>
        <div style={{ textAlign: "center", color: "#e2e8f0", fontSize: "18px", fontWeight: "300" }}>+</div>
        <div>
          <div style={miniLabelStyle}>RIGHT</div>
          <input type="number" value={values.right} onChange={(e) => handleChange("right", e.target.value)} style={inputStyle} placeholder="0" />
        </div>

        <div />
        <div>
          <div style={miniLabelStyle}>BOTTOM</div>
          <input type="number" value={values.bottom} onChange={(e) => handleChange("bottom", e.target.value)} style={inputStyle} placeholder="0" />
        </div>
        <div />
      </div>
    </div>
  );
};