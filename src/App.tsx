/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';

//* Interfaces
import { Candidate, City, Election } from './interfaces';

//* Componentes
import Cities from './components/Cities';
import Candidates from './components/Candidates';

function App() {
  //* States
  const [cities, setCities] = useState<City[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [cityPresence, setCityPresence] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<string>('');

  //* Constants
  const BASE_REF = 'http://localhost:3001';
  const HTTP_GET = { method: 'GET' };

  //* Hooks
  // TODO: verificar duplicação de chamadas...
  useEffect(() => {
    getCities().then((cities) => setCities(cities));
    getCandidates().then((candidates) => setCandidates(candidates));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setCityPresence(getCityPresence());
    }
  }, [selectedCity]);

  //* Functions
  const getCities = async (): Promise<City[]> => {
    const citiesAPI = `${BASE_REF}/cities`;

    return (await fetch(citiesAPI, HTTP_GET)).json();
  };
  
  const getCandidates = async (): Promise<Candidate[]> => {
    const candidatesAPI = `${BASE_REF}/candidates`;

    return (await fetch(candidatesAPI, HTTP_GET)).json();
  };

  const getElection = async (): Promise<Election[]> => {
    const electionAPI = `${BASE_REF}/election`;
    const cityQueryParam = `cityId=${selectedCity}`;

    return (await fetch(`${electionAPI}?${cityQueryParam}`, HTTP_GET)).json();
  };

  const getCityPresence = (): number =>
    cities.find((city) => city.id === selectedCity)!.presence;

  return (
    <div>
      <header>
        <h3>Escolha o município</h3>
      </header>

      <Cities
        cities={cities}
        citySelected={selectedCity}
        fnSelectedCity={setSelectedCity}
      />

      <Candidates
        cityPresence={cityPresence}
        citySelected={selectedCity}
        candidates={candidates}
        fnElection={getElection}
      />
    </div>
  );
}

export default App;
