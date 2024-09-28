import React from "react";

const Navigation = ({ sessions, currentSessionId, setCurrentSessionId, addSession }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => setCurrentSessionId(session.id)}
          style={{ fontWeight: currentSessionId === session.id ? "bold" : "normal", background: currentSessionId === session.id ? "black" : "darkgrey" }}
        >
          {session.name}
        </button>
      ))}
      <button onClick={addSession}>+ Adicionar Seção</button>
    </div>
  );
};

export default Navigation;
