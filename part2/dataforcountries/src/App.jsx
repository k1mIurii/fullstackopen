import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState(null);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countries = response.data.map((e) => ({
          name: e.name.common,
          id: e.cca2,
        }));
        setCountries(countries);
      });
  }, []);

  useEffect(() => {
    setMessage(null);
    setMatches([]);
    setMatch(null);

    if (search) {
      const result = countries.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
      if (result.length === 0) {
        return;
      }
      if (result.length > 10) {
        setMessage("Too many matches, specify another filter");
      } else if (result.length <= 10 && result.length > 1) {
        setMatches(result);
      } else {
        axios
          .get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${result[0].name}`
          )
          .then((response) => {
            const countryDetails = {
              name: response.data.name.common,
              capital: response.data.capital[0],
              area: response.data.area,
              languages: Object.values(response.data.languages),
              flag: response.data.flags.svg,
              weather: {
                temperature: 0,
                wind: 7.6,
              },
            };
            setMatch(countryDetails);
          });
      }
    }
  }, [search]);

  const show = (toShow) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${toShow}`)
      .then((response) => {
        const countryDetails = {
          name: response.data.name.common,
          capital: response.data.capital[0],
          area: response.data.area,
          languages: Object.values(response.data.languages),
          flag: response.data.flags.svg,
          weather: {
            temperature: 0,
            wind: 7.6,
          },
        };
        setMatch(countryDetails);
        setMessage(null);
        setMatches([]);
      });
  };

  return (
    <div>
      find countries <input value={search} onChange={handleChange} />
      {message && <p>{message}</p>}
      {matches.length > 0 && (
        <div>
          {matches.map((m) => (
            <p key={m.id}>
              {m.name} <button onClick={() => show(m.name)}>show</button>
            </p>
          ))}
        </div>
      )}
      {match && (
        <div>
          <h1>{match.name}</h1>
          <p>Capital {match.capital}</p>
          <p>Area {match.area}</p>
          <h2>Languages</h2>
          <ul>
            {match.languages.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
          <div>
            <img src={match.flag} height="150" width="300" />
          </div>
          <h3>Weather in {match.capital}</h3>
          <p>Temperature {match.weather.temperature}</p>
          <p>Wind {match.weather.wind}</p>
        </div>
      )}
    </div>
  );
};

export default App;
