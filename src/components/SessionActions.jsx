import React from "react";

const SessionActions = ({ renameSession, removeSession }) => {
  const handleRename = () => {
    const newName = prompt("Digite o novo nome da Seção:");
    if (newName) {
      renameSession(newName);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button onClick={handleRename} style={{ background: "yellow", color: "black" }}>
        Renomear Seção
      </button>
      <button onClick={removeSession} style={{ backgroundColor: "red", color: "white" }}>
        Remover Seção
      </button>
    </div>
  );
};

export default SessionActions;
