import { useEffect, useState } from "react";
import {
  vigenere,
  cesarEncryption,
  quantumEncryption,
  Dicionarygenerator,
} from "utils-criptografia";
import "./App.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button';
import Modal from './../src/componnet/moda';
function App() {
  const [select, setSelect] = useState<
    "vigenere" | "quantumEncryption" | "cesarEncryption" | ""
  >("");
  const [message, setMessage] = useState<string>("");
  const [messageEcrip, setMessageEcrip] = useState<string>("");
  const [messageForDesencrypt, setMessageForDesencrypt] = useState<string>("");
  const [messageDescrypt, setMessageDescrypt] = useState<string>("");
  const [key, setKey] = useState<string | number | number[]>("");
  const [dicionaryKey, setDicionaryKey] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  useEffect(() => {
    if (select === "vigenere") {
      if (typeof key === "string") {
        setMessageEcrip(vigenere(key, message, "encrypt"));
      } else {
        console.log("el key no es el tipo esperado");
      }
    } else if (select === "cesarEncryption") {
      if (typeof +key === "number" && !isArrayAndAllNumbers(+key)) {
        const cesarencrp = cesarEncryption(message, +key, "encrypt");

        setMessageEcrip(cesarencrp);
      } else {
        console.log("el key no es el tipo esperado");
      }
    } else if (select === "quantumEncryption") {
      console.log(`typog ${typeof +key}`);
      const keyNumber: number[] = [];
      if (typeof key === "string") {
        const ketArry: string[] = key.split("");
        ketArry.forEach((string) => {
          keyNumber.push(+string);
        });
      }

      if (isArrayAndAllNumbers(keyNumber)) {
        const cesarencrp = quantumEncryption(message, keyNumber, "encrypt");
        console.log("cesarencrp", cesarencrp);
        setMessageEcrip(cesarencrp);
      } else {
        console.log("el key no es el tipo esperado");
      }
    }
  }, [select, message, key]);
  const handlerGenerateDiccionary = () => {
    const dicionario = Dicionarygenerator(message);
    setDicionaryKey(dicionario);
  };
  function isArrayAndAllNumbers(arry: number | number[]) {
    return Array.isArray(arry);
  }
  useEffect(() => {
    if (select === "vigenere") {
      if (typeof key === "string") {
        setMessageDescrypt(vigenere(key, messageForDesencrypt, "decrypt"));
      }
    } else if (select === "cesarEncryption") {
      if (typeof +key === "number" && !isArrayAndAllNumbers(+key)) {
        setMessageDescrypt(
          cesarEncryption(messageForDesencrypt, +key, "decrypt")
        );
      }
    } else if (select === "quantumEncryption") {
      console.log(`typog ${typeof +key}`);
      const keyNumber: number[] = [];
      if (typeof key === "string") {
        const ketArry: string[] = key.split("");
        ketArry.forEach((string) => {
          keyNumber.push(+string);
        });
      }
      if (isArrayAndAllNumbers(keyNumber)) {
        const cesarencrp = quantumEncryption(
          messageForDesencrypt,
          keyNumber,
          "decrypt"
        );
        console.log("cesarencrp", cesarencrp);
        setMessageDescrypt(cesarencrp);
      } else {
        console.log("el key no es el tipo esperado");
      }
    }
  }, [select, messageForDesencrypt]);
  return (
    <div className="container">
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Username"
          aria-describedby="basic-addon1"
          placeholder="mensage para encriptar"
          onChange={(e) => setMessage(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Username"
          aria-describedby="basic-addon1"
          
          placeholder="key para encriptar"
          onChange={(e) => setKey(e.target.value)}
        />
      </InputGroup>

      <Form.Select aria-label="Default select example" onChange={(e) => setSelect(e.target.value)}>
        <option>elegi una opcin de encriptamineto</option>
        <option value="vigenere">vigenere</option>
        <option value="cesarEncryption">cesar Encryption</option>
        <option value="quantumEncryption">Quantum Encryption</option>
      </Form.Select>
      <h2>Mensaje encriptrado:{messageEcrip}</h2>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Username"
          aria-describedby="basic-addon1"
          placeholder="desencriptar"
          onChange={(e) => setMessageForDesencrypt(e.target.value)}
        />
      </InputGroup>

      <h2>Mensaje descriptado:{messageDescrypt}</h2>
      {select === "quantumEncryption" && (
        <div>
          <p>se necesita un arry de numeros aleatorios </p>
          <Button variant="primary" onClick={handlerGenerateDiccionary}>
            Generar nuemro aleatorios
          </Button>
          <p>{dicionaryKey}</p>
        </div>
      )}
     <div>
      <Button onClick={()=>setIsModalOpen(true)}>Abril modal</Button>
      <Modal  isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
     </div>
    </div>
  );
}

export default App;
