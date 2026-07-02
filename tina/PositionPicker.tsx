import React from "react";

export const PositionPicker = ({ input, field }: any) => {
  // Výchozí hodnoty
  const values = input.value || { top: "", right: "", bottom: "", left: "" };

  const handleChange = (pos: string, val: string) => {
    input.onChange({ ...values, [pos]: val });
  };

  // 🚀 FIX: Dynamické rozeznání Margin vs Padding
  const isMargin = field.name === "margin";
  const centerText = isMargin ? "MARGIN" : "PADDING";
  // Margin je oranžový, Padding je červený
  const centerBgColor = isMargin ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", width: "fit-content" }}>
      
      {/* Top */}
      <input 
        type="number" 
        value={values.top} 
        onChange={(e) => handleChange("top", e.target.value)} 
        style={{ width: "60px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "4px" }} 
        placeholder="0" 
      />
      
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* Left */}
        <input 
          type="number" 
          value={values.left} 
          onChange={(e) => handleChange("left", e.target.value)} 
          style={{ width: "60px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "4px" }} 
          placeholder="0" 
        />
        
        {/* Center - Dynamický štítek */}
        <div style={{ background: centerBgColor, color: "white", fontWeight: "bold", fontSize: "12px", padding: "8px 16px", borderRadius: "4px", minWidth: "90px", textAlign: "center", letterSpacing: "1px" }}>
          {centerText}
        </div>
        
        {/* Right */}
        <input 
          type="number" 
          value={values.right} 
          onChange={(e) => handleChange("right", e.target.value)} 
          style={{ width: "60px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "4px" }} 
          placeholder="0" 
        />
      </div>

      {/* Bottom */}
      <input 
        type="number" 
        value={values.bottom} 
        onChange={(e) => handleChange("bottom", e.target.value)} 
        style={{ width: "60px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "4px" }} 
        placeholder="0" 
      />
    </div>
  );
};