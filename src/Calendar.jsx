import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

const Calendar = () => {
  const [selectedDays, setSelectedDays] = useState(() => {
    const savedDays = localStorage.getItem("selectedDays");
    return savedDays ? JSON.parse(savedDays) : [];
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  useEffect(() => {
    localStorage.setItem("selectedDays", JSON.stringify(selectedDays));
  }, [selectedDays]);

  const toggleDay = (day) => {
    setSelectedDays((prev) => {
      if (prev.some((selectedDay) => isSameDay(new Date(selectedDay), day))) {
        return prev.filter((selectedDay) => !isSameDay(new Date(selectedDay), day));
      } else {
        return [...prev, day];
      }
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // Função para limpar todos os dias do mês atual
  const clearMonth = () => {
    const confirmClear = window.confirm("Você tem certeza que deseja limpar todos os dias deste mês?");
    if (confirmClear) {
      // Filtrar apenas os dias que NÃO estão no mês atual
      const daysInCurrentMonth = daysInMonth.map((day) => day.toISOString());
      setSelectedDays((prev) => prev.filter((day) => !daysInCurrentMonth.includes(new Date(day).toISOString())));
    }
  };

  return (
    <div>
      <h1>Calendário - Dias de Academia</h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button onClick={handlePrevMonth}>Mês Anterior</button>
        <h2>{format(currentDate, "MMMM yyyy", { locale: ptBR })}</h2>
        <button onClick={handleNextMonth}>Próximo Mês</button>
      </div>

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

      <div style={{ marginTop: "20px" }}>
        <h2>Dias Marcados: {selectedDays.length}</h2>
        {selectedDays.length > 0 && (
          <ul>
            {selectedDays
              .filter((day) => daysInMonth.some((monthDay) => isSameDay(new Date(day), monthDay))) // Exibir apenas os dias do mês atual
              .map((day, index) => (
                <li key={index}>{format(new Date(day), "EEEE, dd MMMM yyyy", { locale: ptBR })}</li>
              ))}
          </ul>
        )}
      </div>

      {/* Botão para limpar o mês atual */}
      <button onClick={clearMonth} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}>
        Limpar Mês
      </button>
    </div>
  );
};

export default Calendar;
