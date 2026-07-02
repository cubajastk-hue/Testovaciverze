import React from "react";

export const PositionPicker = ({ input, field }: any) => {
  const values = input.value || { top: "", right: "", bottom: "", left: "" };
  const handleChange = (pos: string, val: string) => {
    input.onChange({ ...values, [pos]: val });
  };

  // Rozpoznání Margin/Padding
  const isMargin = field?.name === "margin";
  const title = isMargin ? "MARGIN (Vnější okraje)" : "PADDING (Vnitřní odsazení)";
  const accentColor = isMargin ? "#f59e0b" : "#ef4444";

  const inputStyle = {
    width: "100%",
    height: "30px",
    textAlign: "center" as const,
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#334155",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "9px",
    color: "#94a3b8",
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    marginBottom: "2px"
  };

  return (
    <div style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#ffffff", overflow: "hidden", marginTop: "4px", marginBottom: "12px" }}>
      {/* Záhlaví lícující s ostatními boxy */}
      <div style={{ background: "#f8fafc", padding: "6px 12px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: accentColor }} />
        <span style={{ fontSize: "11px", fontWeight: "bold", color: "#475569", letterSpacing: "0.5px" }}>{title}</span>
      </div>

      {/* Grid ovladač */}
      <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", alignItems: "center", maxWidth: "250px" }}>
        <div />
        <div>
          <div style={labelStyle}>TOP</div>
          <input type="number" value={values.top} onChange={(e) => handleChange("top", e.target.value)} style={inputStyle} placeholder="0" />
        </div>
        <div />

        <div>
          <div style={labelStyle}>LEFT</div>
          <input type="number" value={values.left} onChange={(e) => handleChange("left", e.target.value)} style={inputStyle} placeholder="0" />
        </div>
        <div style={{ textAlign: "center", color: "#e2e8f0", fontSize: "20px" }}>+</div>
        <div>
          <div style={labelStyle}>RIGHT</div>
          <input type="number" value={values.right} onChange={(e) => handleChange("right", e.target.value)} style={inputStyle} placeholder="0" />
        </div>

        <div />
        <div>
          <div style={labelStyle}>BOTTOM</div>
          <input type="number" value={values.bottom} onChange={(e) => handleChange("bottom", e.target.value)} style={inputStyle} placeholder="0" />
        </div>
        <div />
      </div>
    </div>
  );
};