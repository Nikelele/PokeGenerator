import { useEffect, useState, useMemo } from "react";
import useRandomPokemon from "../../hooks/useRandomPokemon";
import { getRandomInt } from "../../helper/helper";
import PropTypes from "prop-types";
import "./types.css";

const Pokemon = ({ trigger }) => {
  let Pokemon = useRandomPokemon();

  const moves = useMemo(() => {
    if (Pokemon.data) {
      const list = [];
      for (let index = 0; index < 4; index++) {
        const data =
          Pokemon.data?.moves[getRandomInt(0, Pokemon.data.moves.length - 1)];
        list.push(<li>{data.move.name}</li>);
      }

      return list;
    }
  }, [Pokemon.data]);

  useEffect(() => {
    if (trigger) {
      Pokemon.getPokemon();
    }
  }, [trigger]);

  return (
    <>
      {Pokemon.error ? (
        <h1>ERROR</h1>
      ) : (
        <PokemonKachel
          data={Pokemon.data}
          isLoading={Pokemon.loading}
          moves={Pokemon.data && !Pokemon.loading && moves}
        />
      )}
    </>
  );
};

const PokemonKachel = (props) => {
  const { data, isLoading, moves } = props;
  const [getFront, setGetFront] = useState(true);

  const shinyRate = useMemo(() => {
    return Math.random();
  }, [data]);

  const isShiny = () => {
    //return shinyRate < 0.017;
    //return shinyRate > 0.8;
    return shinyRate < 1 / 8192;
  };

  return (
    <div className={isShiny() ? "kachel shiny" : "kachel"}>
      {!isLoading && data ? (
        <>
          <div>
            <div className="tags text-left">
              <h5>#{data.id}</h5>
            </div>
            <h3 className="name">{data.name}</h3>
            <div className="tags">
              <ul>
                {data.types.map((element, index) => (
                  <li
                    className={`type-icon type-${element.type.name}`}
                    key={index}
                  >
                    {element.type.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {getFront ? (
              <>
                <img
                  key={getFront}
                  className="pointer sprite"
                  src={
                    isShiny()
                      ? data.sprites.front_shiny
                      : data.sprites.front_default
                  }
                  onClick={() => setGetFront((old) => !old)}
                />
              </>
            ) : (
              <>
                <img
                  key={getFront}
                  className="pointer sprite"
                  src={
                    isShiny()
                      ? data.sprites.back_shiny
                      : data.sprites.back_default
                  }
                  onClick={() => setGetFront((old) => !old)}
                />
              </>
            )}

            <ul>{moves}</ul>
          </div>
        </>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

PokemonKachel.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  moves: PropTypes.array,
};

Pokemon.propTypes = {
  trigger: PropTypes.number,
};

export default Pokemon;
