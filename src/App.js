import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data.js';

function App() {
const [countries, setCountries] = useState(data);
const [search, setSearch] = useState('');



  const resetCountries = () => {
    setCountries(data);
  };
  return (
    <div>
        <Container>
          <h1 className='text-center mt-4'>Countries</h1>
          <Form>
            <InputGroup className='my-3'>
              <Form.Control 
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search countries' />
            </InputGroup>
          </Form>
          <div>
            <button className='btn btn-primary me-2' onClick={() => sortByName(true)}>Sort A-Z</button>
            <button className='btn btn-primary me-2' onClick={() => sortByName(false)}>Sort Z-A</button>
            <button className='btn btn-primary me-2' onClick={resetCountries}>Reset</button>
          </div>
          <Table>
            <thead>
              <th>Country Name</th>
              <th>Region</th>
              <th>Area</th>
            </thead>
            <tbody>
              {countries
                .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.name.toLowerCase().includes(search);
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.region}</td>
                    <td>{item.area}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
    </div>
  );
}

export default App;
