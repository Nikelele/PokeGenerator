import { useState, useEffect } from "react";
import { getRandomInt } from "../helper/helper";
import axios from "axios";

export default function useRandomPokemon() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPokemon = async function () {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + getRandomInt(1, 251)
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    getPokemon();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, error, loading, getPokemon };
}
