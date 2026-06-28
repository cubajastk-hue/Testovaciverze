import React from "react";

export const PositionPicker = ({ input, field }: any) => {
  const value = input.value || { top: "0", right: "0", bottom: "0", left: "0" };

  const handleChange = (side: string, val: string) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    const newValue = {
      ...value,
      [side]: cleanVal || "0",
    };
    input.onChange(newValue);
  };

  return (
    // 🚀 FIX: display block a width 100% to zarovná pěkně pod sebe!
    <div style={{ display: "block", width: "100%", marginBottom: "24px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
        {field.label || "Pozice (px)"}
      </label>
      
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "320px",
        height: "140px",
        background: "#f1f5f9",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box"
      }}>
        
        <span style={{ position: "absolute", top: "8px", left: "12px", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", letterSpacing: "0.5px" }}>
          POSITION
        </span>

        {/* TOP */}
        <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2px" }}>
          <input
            type="text"
            value={value.top === "0" ? "" : value.top}
            placeholder="0"
            onChange={(e) => handleChange("top", e.target.value)}
            style={{ width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }}
          />
          <span style={{ fontSize: "11px", color: "#64748b" }}>px</span>
        </div>

        {/* LEFT */}
        <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "2px" }}>
          <input
            type="text"
            value={value.left === "0" ? "" : value.left}
            placeholder="0"
            onChange={(e) => handleChange("left", e.target.value)}
            style={{ width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }}
          />
          <span style={{ fontSize: "11px", color: "#64748b" }}>px</span>
        </div>

        {/* STŘEDOVÝ BLOK */}
        <div style={{
          width: "110px",
          height: "40px",
          background: "#ef4444",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.06)"
        }}>
          <span style={{ color: "#ffffff", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.5px" }}>
            {field.name === "margin" ? "MARGIN" : "PADDING"}
          </span>
        </div>

        {/* RIGHT */}
        <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "2px" }}>
          <input
            type="text"
            value={value.right === "0" ? "" : value.right}
            placeholder="0"
            onChange={(e) => handleChange("right", e.target.value)}
            style={{ width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }}
          />
          <span style={{ fontSize: "11px", color: "#64748b" }}>px</span>
        </div>

        {/* BOTTOM */}
        <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2px" }}>
          <input
            type="text"
            value={value.bottom === "0" ? "" : value.bottom}
            placeholder="0"
            onChange={(e) => handleChange("bottom", e.target.value)}
            style={{ width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }}
          />
          <span style={{ fontSize: "11px", color: "#64748b" }}>px</span>
        </div>

      </div>
    </div>
  );
};