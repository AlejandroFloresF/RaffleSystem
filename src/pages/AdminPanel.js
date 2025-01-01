import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import DatePicker from 'react-date-picker';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/styles/AdminPanel.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const AdminPanel = () => {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRaffle, setEditingRaffle] = useState(null); 
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/auth/role', {
      credentials: 'include', 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role !== 'admin') {
          alert('Acceso no autorizado');
          navigate('/'); 
        } else {
          setUserRole(data.role);
        }
      })
      .catch((err) => console.error('Error al verificar rol:', err));
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/raffles')
      .then((response) => response.json())
      .then((data) => {
        setRaffles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener rifas:', error);
        setError('Error al cargar rifas.');
        setLoading(false);
      });
  }, []);

  const handleEdit = (raffle) => {
    setEditingRaffle(raffle); 
  };

  const handleSave = () => {
    fetch(`http://localhost:8080/api/v1/raffles/updateRaffle/${editingRaffle.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingRaffle),
    })
      .then((response) => {
        if (response.ok) {
          setRaffles((prevRaffles) =>
            prevRaffles.map((raffle) =>
              raffle.id === editingRaffle.id ? editingRaffle : raffle
            )
          );
          setEditingRaffle(null); 
          alert('Rifa actualizada exitosamente');
        } else {
          throw new Error('Error al guardar los cambios.');
        }
      })
      .catch((error) => alert(error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-panel-container">
      <Navbar />
      <h1>Panel de Administración</h1>
      <div className="raffles-list">
        {raffles.map((raffle) => (
          <div key={raffle.id} className="raffle-item">
            <p><strong>ID:</strong> {raffle.id}</p>
            <p><strong>Título:</strong> {raffle.name}</p>
            <button onClick={() => handleEdit(raffle)}>Editar</button>
          </div>
        ))}
      </div>

      {editingRaffle && (
        <div className="edit-form">
          <h2>Editando Rifa</h2>
          <label>
            Título:
            <input
              type="text"
              value={editingRaffle.name}
              onChange={(e) =>
                setEditingRaffle({ ...editingRaffle, title: e.target.value })
              }
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={editingRaffle.description}
              onChange={(e) =>
                setEditingRaffle({ ...editingRaffle, description: e.target.value })
              }
            />
          </label>
          <label>
            Precio:
            <textarea
              value={editingRaffle.prize}
              onChange={(e) =>
                setEditingRaffle({ ...editingRaffle, prize: e.target.value })
              }
            />
          </label>
          <label>
            Fecha de inicio:
            <DatePicker 
              onChange={(date) => setEditingRaffle({ 
                ...editingRaffle, startDate: date 
              })} 
              value={editingRaffle.startDate} 
            />
          </label>
          <label>
            Fecha de cierre:
            <DatePicker 
              onChange = {(date) => setEditingRaffle({ 
              ...editingRaffle, endDate: date 
              })} 
              value={editingRaffle.endDate} />
          </label>
          <label>
            Imagen Promocional:
            <textarea
              value={editingRaffle.backgroundImage}
              onChange={(e) =>
                setEditingRaffle({ ...editingRaffle, backgroundImage: e.target.value })
              }
            />
          </label>
          <label>
            Maximo Numero de Tickets:
            <textarea
              value={editingRaffle.maxTickets}
              onChange={(e) =>
                setEditingRaffle({ ...editingRaffle, maxTickets: e.target.value })
              }
            />
          </label>
          <button onClick={handleSave}>Guardar Cambios</button>
          <button onClick={() => setEditingRaffle(null)}>Cancelar</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminPanel;
