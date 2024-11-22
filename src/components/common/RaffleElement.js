import React, { useState, useEffect } from 'react';
import '../../assets/styles/RaffleElement.css';

const RaffleElement = ({ raffle }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTickets, setShowTickets] = useState(false);

  const raffleId = raffle.id;

  useEffect(() => {
    const url = `http://localhost:8080/api/v1/raffles/available-tickets/${raffleId}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching available tickets:', error);
        setError('Error loading tickets.');
        setLoading(false);
      });
  }, [raffleId]);

  const toggleTickets = () => {
    setShowTickets(!showTickets);
  };

  return (
    <div className="raffle-element" onClick={toggleTickets}>
      <h3>{raffle.name}</h3>
      <p>{raffle.description}</p>
      <p><strong>Premio:</strong> {raffle.prize}</p>
      <p><strong>Costo del boleto:</strong> ${raffle.ticketCost}</p>
      <p><strong>Fecha de inicio:</strong> {new Date(raffle.startDate).toLocaleDateString()}</p>
      <p><strong>Fecha de fin:</strong> {new Date(raffle.endDate).toLocaleDateString()}</p>
      <div className="button-container">
        <button className="buy-ticket-button">Comprar boleto(s)</button>
        <button className="luck-wheel-button">Ruleta de la suerte</button>
      </div>
      {showTickets && (
        <div className="tickets-grid-container">
          {loading ? (
            <p>Cargando boletos...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            tickets.map((ticket) => (
              <div className="ticket-box" key={ticket}>
                Ticket #{ticket}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RaffleElement;
