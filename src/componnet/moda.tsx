import Button from 'react-bootstrap/Button';
import "./modal.css";

interface modalProps {
  isOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
}

const moda = ({ isOpen, setIsModalOpen }: modalProps) => {
  if (!isOpen) return null;
  console.log(isOpen);

  return (
    <div className="modal">
      <div className="container">
        <div className="contModal">
          <h1>Pasos para encriptar</h1>
        <ul>
          <li>Selecionar un modo de encriptacion</li>
          <li>
            Si es necesirio generar un clave y colocarlar en "Key de encriptar"
          </li>
          <li>Colocar un clave si es Vigenere o numeria si es cesar</li>
          <li>Poner un mensaje para encriptar</li>
          <li>Poner el mensaje cifrado para decifrar</li>
        </ul>

        <Button className='btn'  onClick={() => setIsModalOpen(false)}>Cerrar</Button>  
        </div>
        
      </div>
    </div>
  );
};

export default moda;
