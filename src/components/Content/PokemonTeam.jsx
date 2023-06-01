import React, { useState } from "react";
import Pokemon from "./Pokemon";
import "./content.css";

function PokemonTeam() {
  const [trigger, setTrigger] = useState(0);

  return (
    <>
      <button
        className="btn_refresh"
        onClick={() => {
          setTrigger((trigger) => trigger + 1);
        }}
      >
        Refresh
      </button>
      <div className="pokemon-team">
        <Pokemon trigger={trigger} />
        <Pokemon trigger={trigger} />
        <Pokemon trigger={trigger} />
        <Pokemon trigger={trigger} />
        <Pokemon trigger={trigger} />
        <Pokemon trigger={trigger} />
      </div>
    </>
  );
}

export default PokemonTeam;
