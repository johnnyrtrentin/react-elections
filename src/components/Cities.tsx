import { useEffect, useState } from 'react';
import { formatNumber } from '../helpers';
import { City } from '../interfaces';

const Cities = ({ cities, citySelected, fnSelectedCity }: any) => {
  //*States
  const [city, selectCity] = useState<City>({
    id: '',
    absence: 0,
    name: '',
    presence: 0,
    votingPopulation: 0,
  });

  //* Functions
  const selectCityHandler = (e: any) => fnSelectedCity(e.target.value);

  const filterCityHandler = (): void => {
    if (citySelected) {
      const city = cities.find((city: City) => city.id === citySelected);

      selectCity(city);
    }
  };

  useEffect(() => filterCityHandler());

  return (
    <div className='city'>
      <select value={citySelected} onChange={selectCityHandler}>
        {cities.map((city: any, cityIndex: number) => (
          <option key={cityIndex} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <div className='city__select'>
        <span>
          <strong>Total de eleitores: </strong>
          {formatNumber(city.votingPopulation)}
        </span>
        <span>
          <strong>Abstenção: </strong>
          {formatNumber(city.absence)}
        </span>
        <span>
          <strong>Comparecimento: </strong>
          {formatNumber(city.presence)}
        </span>
      </div>
    </div>
  );
};

export default Cities;
