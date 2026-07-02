import React from "react";

export const PositionPicker = ({ input, field }: any) => {
  const values = input.value || { top: "", right: "", bottom: "", left: "" };

  const handleChange = (pos: string, val: string) => {
    input.onChange({ ...values, [pos]: val });
  };

  // 🚀 FIX: Rozpoznání Margin/Padding podle štítku (label), což funguje vždy
  const isMargin = field?.label?.toLowerCase().includes("margin");
  const title = isMargin ? "MARGIN" : "PADDING";
  const bgColor = isMargin ? "#f59e0b" : "#ef4444"; // Oranžová vs Červená

  // Společný styl pro malá, hezká políčka
  const inputStyle = {
    width: "46px",
    height: "28px",
    textAlign: "center" as const,
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    fontSize: "12px",
    outline: "none",
    color: "#334155",
  };

  return (
    <div style={{ padding: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%", maxWidth: "220px", marginBottom: "8px", boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)" }}>
      
      {/* Hlavička */}
      <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "10px", color: "white", background: bgColor, padding: "4px", borderRadius: "4px", marginBottom: "12px", letterSpacing: "1px" }}>
        {title}
      </div>

      {/* Kompaktní CSS Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "46px 46px 46px", gridTemplateRows: "28px 28px 28px", gap: "6px", justifyContent: "center", alignItems: "center" }}>
        
        {/* Top */}
        <div style={{ gridColumn: "2", gridRow: "1" }}>
          <input type="number" value={values.top} onChange={(e) => handleChange("top", e.target.value)} style={inputStyle} placeholder="top" />
        </div>
        
        {/* Left */}
        <div style={{ gridColumn: "1", gridRow: "2" }}>
          <input type="number" value={values.left} onChange={(e) => handleChange("left", e.target.value)} style={inputStyle} placeholder="left" />
        </div>
        
        {/* Střed (Ikonka křížku/středu) */}
        <div style={{ gridColumn: "2", gridRow: "2", textAlign: "center", fontSize: "16px", color: "#94a3b8", fontWeight: "bold" }}>
          +
        </div>
        
        {/* Right */}
        <div style={{ gridColumn: "3", gridRow: "2" }}>
          <input type="number" value={values.right} onChange={(e) => handleChange("right", e.target.value)} style={inputStyle} placeholder="right" />
        </div>
        
        {/* Bottom */}
        <div style={{ gridColumn: "2", gridRow: "3" }}>
          <input type="number" value={values.bottom} onChange={(e) => handleChange("bottom", e.target.value)} style={inputStyle} placeholder="bot" />
        </div>

      </div>
    </div>
  );
};