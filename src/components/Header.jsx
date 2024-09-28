import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Header = ({ currentDate, handlePrevMonth, handleNextMonth }) => {
  return (
    <div className="next-prev-month">
      <button onClick={handlePrevMonth}>Mês Anterior</button>
      <h2>{format(currentDate, "MMMM - yyyy", { locale: ptBR })}</h2>
      <button onClick={handleNextMonth}>Próximo Mês</button>
    </div>
  );
};

export default Header;
