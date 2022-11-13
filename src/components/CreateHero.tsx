import { SyntheticEvent, useState } from "react";

interface PropsHero {
  propsNewHeroName: { (newHeroName: string): void };
  propsNewHeroLife: { (newHerolife: number): void };
  propsNewHeroPower: { (newHeroPower: number): void };
}

const CreateHero = ({
  propsNewHeroName,
  propsNewHeroLife,
  propsNewHeroPower,
}: PropsHero) => {
  const [newHeroName, setNewheroName] = useState<string>("");
  const [newHeroLife, setNewheroLife] = useState<number>(0);
  const [newHeroPower, setNewheroPower] = useState<number>(0);
  const handleChangeName = (e: SyntheticEvent<HTMLInputElement>) => {
    setNewheroName(e.currentTarget.value);
    propsNewHeroName(e.currentTarget.value);
    console.log(newHeroName);
    console.log(e.currentTarget.value);
  };
  const handleChangePower = (e: SyntheticEvent<HTMLInputElement>) => {
    setNewheroPower(e.currentTarget.valueAsNumber);
    propsNewHeroPower(e.currentTarget.valueAsNumber);
    console.log(newHeroPower);
    console.log(e.currentTarget.valueAsNumber);
  };
  const handleChangeLife = (e: SyntheticEvent<HTMLInputElement>) => {
    setNewheroLife(e.currentTarget.valueAsNumber);
    propsNewHeroLife(e.currentTarget.valueAsNumber);
    console.log(newHeroLife);
    console.log(e.currentTarget.valueAsNumber);
  };
  // const handleClickCreate = (e: SyntheticEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  // };

  return (
    <form>
      <div>
        <label htmlFor="name">Enter your hero name: </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          onChange={handleChangeName}
          required
        />
      </div>
      <div>
        <label htmlFor="power">Enter your hero power: </label>
        <input
          type="number"
          name="power"
          id="power"
          className="form-control"
          onChange={handleChangePower}
          required
        />
      </div>
      <div>
        <label htmlFor="life">Enter your hero life: </label>
        <input
          type="number"
          name="life"
          id="life"
          className="form-control"
          onChange={handleChangeLife}
          required
        />
      </div>
    </form>
  );
};
export default CreateHero;
