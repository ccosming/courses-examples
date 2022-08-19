import axios from "axios";
import { useState } from "react";

interface Person {
  name: string;
  lastname: string;
  age: string;
}

export const App = () => {
  const [data, setData] = useState({ message: "" });
  const [countData, setCount] = useState<{ count: number } | null>();
  const [newUserData, setNewUserData] = useState<Person>({
    name: "",
    lastname: "",
    age: "0",
  });
  const [id, setId] = useState<string>("0");
  const [currentPerson, setCurrentPerson] = useState<Person>();

  const callHelloWorld = async () => {
    axios({
      method: "get",
      url: "http://localhost:4000",
      responseType: "json",
    }).then(function (response) {
      setData(response.data);
    });
  };

  const callPersonsCount = async () => {
    axios({
      method: "get",
      url: "http://localhost:4000/persons/count",
      responseType: "json",
    }).then(function (response) {
      setCount(response.data);
    });
  };

  const callAddPerson = async ({ name, lastname, age }: Person) => {
    const url = `http://localhost:4000/persons/add?name=${name}&lastname=${lastname}&age=${age}`;

    axios({
      method: "get",
      url,
      responseType: "json",
    }).then(function (response) {
      callPersonsCount();
    });
  };

  const callGetPerson = async (id: string) => {
    const url = `http://localhost:4000/persons/get?id=${id}`;

    axios({
      method: "get",
      url,
      responseType: "json",
    }).then(function (response) {
      setCurrentPerson(response.data);
    });
  };

  return (
    <div>
      <div>
        <h2>Hello World Smart Contract</h2>

        {data && <h3>Respuesta: {data.message}</h3>}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await callHelloWorld();
          }}
        >
          Call smart contract
        </button>
      </div>

      <hr />

      <div>
        <h2>Digital Identity Smart Contract</h2>
        {countData && countData.count && (
          <h3>Respuesta: {countData.count} persons</h3>
        )}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await callPersonsCount();
          }}
        >
          Get persons count
        </button>

        <div
          style={{ border: "1px solid #000", marginTop: "1em", padding: "1em" }}
        >
          <h3>Create new person</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setNewUserData({ ...newUserData, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Lastname"
            onChange={(e) =>
              setNewUserData({ ...newUserData, lastname: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) =>
              setNewUserData({ ...newUserData, age: e.target.value })
            }
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await callAddPerson(newUserData);
            }}
          >
            Add person
          </button>
        </div>

        <hr />
        <div
          style={{ border: "1px solid #000", marginTop: "1em", padding: "1em" }}
        >
          <h3>Get person</h3>

          {currentPerson && (
            <div>
              <p>
                <strong>Name:</strong> {currentPerson.name}
              </p>
              <p>
                <strong>Lastname:</strong> {currentPerson.lastname}
              </p>
              <p>
                <strong>Age:</strong> {currentPerson.age}
              </p>
            </div>
          )}

          <input
            type="number"
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await callGetPerson(id);
            }}
          >
            Get person
          </button>
        </div>
      </div>
    </div>
  );
};
