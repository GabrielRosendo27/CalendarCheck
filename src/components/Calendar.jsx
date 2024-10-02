import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import DaysGrid from "./DaysGrid";
import Header from "./Header";
import Navigation from "./Navigation";
import SessionActions from "./SessionActions";
// import "./Calendar.css"; // Import do arquivo CSS

const Calendar = () => {
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("sessions");
    return savedSessions ? JSON.parse(savedSessions) : [{ name: "1", days: [], id: 1 }];
  });

  const [currentSessionId, setCurrentSessionId] = useState(1); // ID da Seção ativa
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCurrentSession = () => sessions.find((session) => session.id === currentSessionId);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 }), // Ajusta para o início da semana do mês
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 }), // Ajusta para o final da semana do mês
  });

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const toggleDay = (day) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) => {
        if (session.id === currentSessionId) {
          if (session.days.some((selectedDay) => isSameDay(new Date(selectedDay), day))) {
            return { ...session, days: session.days.filter((selectedDay) => !isSameDay(new Date(selectedDay), day)) };
          } else {
            return { ...session, days: [...session.days, day] };
          }
        }
        return session;
      })
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // Função para retornar ao mês atual
  const handleCurrentMonth = () => {
    setCurrentDate(new Date()); // Define a data para o mês atual
  };

  const clearMonth = () => {
    const confirmClear = window.confirm("Você tem certeza que deseja limpar todos os dias deste mês?");
    if (confirmClear) {
      const daysInCurrentMonth = daysInMonth.map((day) => day.toISOString());
      setSessions((prevSessions) =>
        prevSessions.map((session) => {
          if (session.id === currentSessionId) {
            return { ...session, days: session.days.filter((day) => !daysInCurrentMonth.includes(new Date(day).toISOString())) };
          }
          return session;
        })
      );
    }
  };

  const renameSession = (newName) => {
    setSessions((prevSessions) => prevSessions.map((session) => (session.id === currentSessionId ? { ...session, name: newName } : session)));
  };

  const addSession = () => {
    const newId = sessions.length > 0 ? Math.max(...sessions.map((session) => session.id)) + 1 : 1;
    setSessions([...sessions, { name: `Nova Seção ${newId}`, days: [], id: newId }]);
    setCurrentSessionId(newId);
  };

  const removeSession = () => {
    const confirmRemove = window.confirm("Tem certeza que deseja remover esta Seção?");
    if (confirmRemove) {
      setSessions((prev) => prev.filter((session) => session.id !== currentSessionId));
      if (sessions.length > 1) {
        setCurrentSessionId(sessions[0].id);
      }
    }
  };

  return (
    <div className="section-container">
      <Navigation sessions={sessions} currentSessionId={currentSessionId} setCurrentSessionId={setCurrentSessionId} addSession={addSession} />
      <SessionActions renameSession={renameSession} removeSession={removeSession} />
      <Header currentDate={currentDate} handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth} />

      {/* Botão para retornar ao mês atual */}
      <div className="mes-atual">
        <button onClick={handleCurrentMonth} className="mes-atual-button">
          Mês Atual
        </button>
      </div>

      <DaysGrid daysInMonth={daysInMonth} toggleDay={toggleDay} selectedDays={getCurrentSession()?.days || []} />

      <div className="dias-marcados">
        <h2>Dias Marcados: {getCurrentSession()?.days.length}</h2>
      </div>

      <button onClick={clearMonth} className="clear-month-button">
        Limpar Mês
      </button>
    </div>
  );
};

export default Calendar;
{
  /* <ul>
  {getCurrentSession()
    ?.days.filter((day) => daysInMonth.some((monthDay) => isSameDay(new Date(day), monthDay)))
    .map((day, index) => (
      <li key={index}>{format(new Date(day), "EEEE, dd MMMM yyyy", { locale: ptBR })}</li>
    ))}
</ul> */
}
