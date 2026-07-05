import React from "react";

export const PositionPicker = ({ input, field }: any) => {
  const values = input.value || { top: "", right: "", bottom: "", left: "" };

  const handleChange = (pos: string, val: string) => {
    input.onChange({ ...values, [pos]: val });
  };

  const labelText = field?.label ? String(field.label).toLowerCase() : "";
  const isMargin = labelText.includes("margin") || labelText.includes("vnější");
  
  const titleText = isMargin ? "Margin" : "Padding";

  const inputStyle = {
    width: "44px",
    height: "26px",
    textAlign: "center" as const,
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#111827",
    outline: "none",
    background: "#ffffff",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    transition: "border-color 0.15s ease",
  };

  const miniLabelStyle = {
    fontSize: "10px",
    color: "#6b7280",
    fontWeight: "500" as const,
    textAlign: "center" as const,
  };

  return (
    <div style={{ width: "100%", fontFamily: "inherit" }}>
      
      {/* 🚀 Nadpis 1:1 k originálnímu TinaCMS ("Interní název bloku") */}
      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", fontFamily: "inherit" }}>
        {titleText}
      </label>

      {/* Sjednocený box (border 6px, originální Tina stín) */}
      <div style={{ 
        border: "1px solid #d1d5db", 
        borderRadius: "6px", 
        background: "#ffffff", 
        padding: "20px", 
        display: "flex", 
        justifyContent: "center", 
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" 
      }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", alignItems: "center" }}>
          <div />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div style={miniLabelStyle}>Top</div>
            <input type="number" value={values.top} onChange={(e) => handleChange("top", e.target.value)} style={inputStyle} placeholder="0" />
          </div>
          <div />

          <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end" }}>
            <div style={miniLabelStyle}>Left</div>
            <input type="number" value={values.left} onChange={(e) => handleChange("left", e.target.value)} style={inputStyle} placeholder="0" />
          </div>
          
          <div style={{ textAlign: "center", color: "#cbd5e1", fontSize: "16px", fontWeight: "300" }}>+</div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-start" }}>
            <input type="number" value={values.right} onChange={(e) => handleChange("right", e.target.value)} style={inputStyle} placeholder="0" />
            <div style={miniLabelStyle}>Right</div>
          </div>

          <div />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <input type="number" value={values.bottom} onChange={(e) => handleChange("bottom", e.target.value)} style={inputStyle} placeholder="0" />
            <div style={miniLabelStyle}>Bottom</div>
          </div>
          <div />
        </div>

      </div>
    </div>
  );
};