import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RaffleElement from '../components/common/RaffleElement.js';

const HomePage = () => {
  // State para almacenar los datos de las rifas
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje de carga mientras se obtienen los datos
  const [error, setError] = useState(null); // Para manejar errores

  // Hook useEffect para realizar el fetch al cargar el componente
  useEffect(() => {
    // Realizar fetch a la API
    fetch('http://localhost:8080/api/v1/raffles')
      .then((response) => response.json()) // Convertir la respuesta en JSON
      .then(data => {
        setRaffles(data); // Guardar los datos en el state
        setLoading(false); // Desactivar el estado de carga
      })
      .catch(error => {
        console.error('Error al obtener las rifas:', error); // Manejar cualquier error
        setError('Error al cargar las rifas.'); // Establecer un mensaje de error
        setLoading(false); // Desactivar el estado de carga
      });
  }, []); // El array vacío [] asegura que el fetch solo se ejecute una vez al cargar el componente

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras los datos se obtienen
  }

  if (error) {
    return <div>{error}</div>; // Mostrar un mensaje de error si algo salió mal
  }

  return (
    <div className="main-galery-container">
      <Navbar />
      <section className="main-galery-container--slider">
        <ul className="photos-container--slider">
          {raffles.length > 0 ? (
            raffles.map((raffle, index) => (
            console.log(raffle[2]),
              <div key={index}>
                <h2>{raffle.name}</h2> {/* Nombre de la rifa */}
                <p>{raffle.description}</p> {/* Descripción de la rifa */}
                <p><strong>Premio:</strong> {raffle.prize}</p> {/* Premio */}
                <p><strong>Costo del boleto:</strong> ${raffle.ticketCost}</p> {/* Costo del boleto */}
                <p><strong>Fecha de inicio:</strong> {new Date(raffle.startDate).toLocaleDateString()}</p> {/* Fecha de inicio */}
                <p><strong>Fecha de fin:</strong> {new Date(raffle.endDate).toLocaleDateString()}</p> {/* Fecha de fin */}
                {/* Puedes agregar más información si lo necesitas */}
                <RaffleElement key={raffle.id} raffle={raffle} />
              </div>
            ))
          ) : (
            <p>No hay rifas disponibles.</p> // Mensaje cuando no hay rifas
          )}
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
