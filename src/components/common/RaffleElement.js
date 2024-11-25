import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/RaffleElement.css';

const RaffleElement = ({ raffle }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTickets, setShowTickets] = useState(false);
  const containerRef = useRef(null); 

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

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowTickets(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="raffle-element" onClick={toggleTickets} ref={containerRef}>
      <h3>{raffle.name}</h3>
      <p>{raffle.description}</p>
      <p><strong>Premio:</strong> {raffle.prize}</p>
      <p><strong>Costo del boleto:</strong> ${raffle.ticketCost}</p>
      <p><strong>Fecha de inicio:</strong> {new Date(raffle.startDate).toLocaleDateString()}</p>
      <p><strong>Fecha de fin:</strong> {new Date(raffle.endDate).toLocaleDateString()}</p>
      {showTickets && (
        <div className="tickets-grid-container">
          {loading ? (
            <p>Cargando boletos...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            tickets.map((ticket) => (
              <div className="ticket-box" key={ticket}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="currentColor"
                  class="bi bi-ticket"
                  viewBox="0 0 16 16"
                >
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="3"
                    fill="black"
                    className="text-ticket"
                  >
                    #{ticket}
                  </text>
                  <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
                </svg>
              </div>
            ))
          )}
        </div>
      )}
      <div className="button-container">
        <button className="buy-ticket-button">Comprar boleto(s)</button>
        <button className="luck-wheel-button">Ruleta de la suerte</button>
      </div>
    </div>
  );
};

export default RaffleElement;
