import React, { useState } from 'react';

function SimpleTest() {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('¡Has hecho clic en el botón! 🎉');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      fontSize: '24px',
      color: '#333'
    }}>
      🍷 ¡Hola! Si ves esto, React está funcionando correctamente 🍷
      <br />
      <br />
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#964B00',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Prueba de Botón
      </button>
      {message && (
        <div style={{
          marginTop: '20px',
          fontSize: '18px',
          color: '#4CAF50'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default SimpleTest;
