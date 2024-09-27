import React from "react";
import { format, isSameDay } from "date-fns";

const DaysGrid = ({ daysInMonth, toggleDay, selectedDays }) => {
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div>
      {/* Cabeçalho com os dias da semana */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", textAlign: "center", fontWeight: "bold" }}>
        {daysOfWeek.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      {/* Dias do mês */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", marginTop: "10px" }}>
        {daysInMonth.map((day) => (
          <div
            key={day}
            onClick={() => toggleDay(day)}
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: selectedDays.some((selectedDay) => isSameDay(new Date(selectedDay), day)) ? "lightgreen" : "lightgray",
              cursor: "pointer",
            }}
          >
            {format(day, "d")}
            {selectedDays.some((selectedDay) => isSameDay(new Date(selectedDay), day)) && <span> X</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaysGrid;
