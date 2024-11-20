import React from 'react';

// Recibe los datos de la rifa como props
const RaffleElement = ({ raffle }) => {
  return (
    <div className="raffle-element">
      <h3>{raffle.name}</h3>
      <p>{raffle.description}</p>
      <p><strong>Premio:</strong> {raffle.prize}</p>
      <p><strong>Costo del boleto:</strong> ${raffle.ticketCost}</p>
      <p><strong>Fecha de inicio:</strong> {new Date(raffle.startDate).toLocaleDateString()}</p>
      <p><strong>Fecha de fin:</strong> {new Date(raffle.endDate).toLocaleDateString()}</p>
    </div>
  );
};

export default RaffleElement;
