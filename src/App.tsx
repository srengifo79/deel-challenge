import React from 'react';
import './App.css';
import AutoComplete from './components/autoComplete/autoComplete';

function App() {
  async function source(search: string) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${search}`);
      const data = await res.json();

      // Due to the api not only searching by country names but other properties, sometimes we can get some additional values where the search
      // can return non matching names so I am filtering here but the api should handle it in a ideal case
      const additionalFilter = data.filter((country: any) =>
        new RegExp(`^${search}`, 'i').test(country.name.common)
      );

      return additionalFilter.map((country: any) => ({
        value: country.name.common,
        label: country.name.common,
      }));
    } catch (e) {
      return [];
    }
  }

  return (
    <div className="App">
      <AutoComplete source={source} />
    </div>
  );
}

export default App;
