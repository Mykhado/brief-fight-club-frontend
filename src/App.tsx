import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import CreateHero from "./components/CreateHero";
import "../src/App.css";

import { SyntheticEvent } from "react";

export interface Hero {
  id: number;
  name: string;
  power: number;
  life: number;
  id_type_weapon: number;
}
// let heroId: number = 1;
// let heroNameGet: string;
// let heroLifeGet: number;
// let heroPowerGet: number;
let nameHero: string;
let powerHero: number;
let lifeHero: number;

const App = () => {
  // const [listHero, setListHero] = useState<any[]>([
  //   { name: "Coco" },
  //   { name: "Zozo" },
  //   { name: "Toto" },
  // ]);
  const heroNameGet = (theNameOfHero: string) => {
    nameHero = theNameOfHero;
    console.log(nameHero);
  };
  const heroLifeGet = (theLifeOfHero: number) => {
    lifeHero = theLifeOfHero;
    console.log(lifeHero);
  };
  const heroPowerGet = (thePowerOfHero: number) => {
    powerHero = thePowerOfHero;
    console.log(powerHero);
  };

  const [listHero, setListHero] = useState<Hero[]>([]);
  const [hero, setHero] = useState<Hero>();
  const [newHero, setNewHero] = useState<string>();
  const [updateNewHero, setUpdateNewHero] = useState<string>();
  const [heroId, setHeroId] = useState<number>();
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroId(e.currentTarget.valueAsNumber);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/heros")
      .then((response: AxiosResponse<{ data: Hero[] }>) => {
        setListHero(response.data.data);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // heroId = e.currentTarget.valueAsNumber;
    const id = e.currentTarget.valueAsNumber;
    console.log("le User a saisie : ", id);

    // id !== NaN equivaut à !isNaN(id)
    if (!isNaN(id)) {
      const urlApi = `http://localhost:8080/api/heros/${id}`;
      // même chose que ci dessous
      //const urlApi = 'http://localhost:8080/api/heros/' + id;
      console.log("Notre url pour la request : ", urlApi);
      axios.get(urlApi).then((response: AxiosResponse<{ data: Hero[] }>) => {
        // affichage pas a pas de l'avancée dans les données api
        console.log(response);
        console.log(response.data);
        console.log(response.data.data);
        console.log(response.data.data[0]);
        // on va repecurer le seul hero qui est le premier du tableau par logique
        const oneHero: Hero = response.data.data[0];
        setHero(oneHero);
      });
    } else {
      setHero(undefined);
    }
  };

  function createNewHero(e: SyntheticEvent<HTMLInputElement>) {
    axios
      .post("http://localhost:8080/api/heros", {
        name: nameHero,
        power: powerHero,
        life: lifeHero,
      })
      .then((response: AxiosResponse<string>) => {
        const heroTest = response.data;
        setNewHero(heroTest);
        console.log(heroTest);
        console.log(listHero[listHero.length - 1].name);
      });
  }
  function updateHero(e: SyntheticEvent<HTMLInputElement>) {
    axios
      .put(`http://localhost:8080/api/heros/${heroId}`, {
        name: nameHero,
        power: powerHero,
        life: lifeHero,
      })
      .then((response) => {
        setUpdateNewHero(response.data);
      });
  }
  function deleteHero(e: SyntheticEvent<HTMLInputElement>) {
    axios.delete(`http://localhost:8080/api/heros/${heroId}`).then(() => {
      alert(`Héro Id: ${heroId} supprimé `);
      // setPost(null);
    });
  }

  return (
    <div className="App d-flex align-items-stretch">
      <div className="gestionList text-center p-2 custom-side-bar flex-shrink-0  border-end border-3 ">
        <div className=" idSelect p-2 create border-bottom border-3">
          <h2 className="fs-5">Mon hero en fonction d'un Id : </h2>
          <input
            type="number"
            className="form-control"
            onChange={handleInputChange}
          />
          {hero ? (
            <p>
              {hero.name} Puissance: {hero.power} Vie: {hero.life}
            </p>
          ) : (
            <p>Rien à afficher</p>
          )}
        </div>
        <div className=" create p-2 border-bottom border-3">
          <h2 className="fs-5">Mon nouveau Hero</h2>
          <CreateHero
            propsNewHeroName={heroNameGet}
            propsNewHeroLife={heroLifeGet}
            propsNewHeroPower={heroPowerGet}
          />
          {newHero ? (
            <p>
              {nameHero} avec {powerHero} Pw et {lifeHero}Pv a été ajouté .
            </p>
          ) : (
            <p></p>
          )}
          <div>
            <input
              type="button"
              className="btn btn-outline-success mb-3"
              value="Create"
              onClick={createNewHero}
            />
          </div>
        </div>
        <div className=" update p-2 border-bottom border-3">
          <h2 className="fs-5">Modifie un héro</h2>
          <form action="">
            <label htmlFor="id">Select one ID Hero for update </label>
            <input
              type="number"
              className="form-control"
              id="id"
              onChange={handleIdChange}
            />
          </form>
          <CreateHero
            propsNewHeroName={heroNameGet}
            propsNewHeroLife={heroLifeGet}
            propsNewHeroPower={heroPowerGet}
          />
          {updateNewHero ? (
            <p>Les modifications de l'héro ID:{heroId} ont été effectué. </p>
          ) : (
            <p></p>
          )}
          <input
            type="submit"
            className="btn btn-outline-warning mb-3"
            value="Update"
            onClick={updateHero}
          />
        </div>
        <div className=" delete p-2 create border-bottom border-3">
          <h2 className="fs-5">Suppression d'un Héro.</h2>
          <form action="">
            <label htmlFor="idDelete">Select one ID Hero for delete </label>
            <input
              type="number"
              className="form-control"
              id="idDelete"
              onChange={handleIdChange}
            />
            <br />
            <input
              type="submit"
              className="btn btn-outline-danger mb-3"
              value="Delete"
              onClick={deleteHero}
            />
          </form>
        </div>
      </div>

      {/* <ul>
        {listHero.map((hero: Hero) => (
          <li key={hero.id}>
            {" "}
            ID: {hero.id} /Name: {hero.name}/
          </li>
        ))}
      </ul> */}
      <div className="row p-2 g-2 text-center container-fluid custom-main ">
        <h2 className="fs-1">Liste des Héros</h2>
        {listHero.map((hero: Hero, i) => (
          <div key={i + 1} className="col-sm-6 blockcard ">
            <div key={i + 2} className="card shadow p-3 mb-5  rounded ">
              <div key={i + 3} className="card-body">
                <h5 key={i + 4} className="card-title">
                  #{hero.id} {hero.name}
                </h5>
                <div key={i + 5}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/images/image (${getRandomInt(28)}).png`
                    }
                    alt="avatar icon"
                  />
                </div>
                <p className="card-text">
                  <span className="red">{hero.power} Pow</span>{" "}
                  <span className="green">{hero.life} Pv</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
