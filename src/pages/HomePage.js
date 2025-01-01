import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RaffleElement from '../components/common/RaffleElement.js';
import '../assets/styles/HomePage.css'
 

const HomePage = () => {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/raffles')
      .then((response) => response.json()) 
      .then(data => {
        setRaffles(data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error al obtener las rifas:', error); 
        setError('Error al cargar las rifas.'); 
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main-homePage-container">
      <Navbar />
        <div className='main-homePage-raffles-scroll'>
          {raffles.length > 0 ? (
            raffles.map((raffle, index) => (
              <div key={index} className=''>
                <RaffleElement key={raffle.id} raffle={raffle} />
              </div>
            ))
          ) : (
            <p>No hay rifas disponibles.</p> 
          )}
        </div>
    <Footer />
  </div>
  );
};

export default HomePage;
