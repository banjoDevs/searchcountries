import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

import { data } from './data.js';

function App() {
const [countries, setCountries] = useState(data);
const [search, setSearch] = useState('');
const [page, setPage] = useState(1);


const sortByName = (ascending = true) => {
  setCountries(prevCountries => {
    const sortedCountries = [...prevCountries].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return ascending ? -1 : 1;
      }
      if (nameA > nameB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
    return sortedCountries;
  });
};

const filterByArea = () => {
  setCountries(prevCountries => {
    const lithuaniaArea = data.find(country => country.name === 'Lithuania').area;
    const filteredCountries = prevCountries
      .sort((a, b) => a.area - b.area)
      .filter(country => country.area < lithuaniaArea);
    return filteredCountries;
  });
};

const filterByRegion = () => {
  setCountries(prevCountries => {
    const filteredCountries = prevCountries.filter(country => country.region === 'Oceania');
    return filteredCountries;
  });
};


const resetCountries = () => {
  setCountries(data);
};

const selectPageHandler = (selectPage) => {
   setPage(selectPage);
};


return (
  <div>
    <Container>
      <h1 className='text-center mt-4'>Countries</h1>
      <Form>
        <InputGroup className='my-3'>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search countries'
          />
        </InputGroup>
      </Form>
      <div className='mb-3'>
        <button className='btn btn-primary me-2' onClick={() => sortByName(true)}>Sort A-Z</button>
        <button className='btn btn-primary me-2' onClick={() => sortByName(false)}>Sort Z-A</button>
        <button className='btn btn-primary me-2' onClick={filterByArea}>Filter by Area</button>
        <button className='btn btn-primary me-2' onClick={filterByRegion}>Filter by Region</button>
        <button className='btn btn-primary me-2' onClick={resetCountries}>Reset</button>
      </div>
      <Table striped bordered hover>
        <thead> 
          <tr>
            <th>Country Name</th>
            <th>Region</th> 
            <th>Area</th>
          </tr>
        </thead>
        <tbody>
          {countries
            .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .slice(page * 25 - 25, page * 25).map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.region}</td>
                <td>{item.area}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
    {countries.length> 0 && <div className="pagination">
        <span>↩</span>
        {[...Array(Math.ceil(countries.length / 25))].map((_, i) => {
          return <span onClick={()=>selectPageHandler(i + 1)} key={i}>{i + 1}</span>;
        })}

        <span>↪</span>
      </div>}
  </div>
);
}

export default App;
