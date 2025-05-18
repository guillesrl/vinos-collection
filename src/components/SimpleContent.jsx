import React from 'react';

function SimpleContent() {
  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        color: '#964B00',
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2.5rem'
      }}>🍷 Colección de Vinos 🍷</h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          color: '#333',
          marginBottom: '1rem'
        }}>Buscar Vinos</h2>
        <input
          type="text"
          placeholder="Buscar por nombre, bodega o región"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '1rem'
          }}
        />
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#964B00',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background-color 0.2s'
        }}>
          Buscar
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minHeight: '200px'
      }}>
        <h2 style={{
          color: '#333',
          marginBottom: '1rem'
        }}>Lista de Vinos</h2>
        <p style={{ 
          color: '#666',
          textAlign: 'center',
          padding: '20px',
          fontSize: '1.1rem'
        }}>
          Aquí se mostrarán tus vinos cuando estén disponibles
        </p>
      </div>
    </div>
  );
}

export default SimpleContent;
