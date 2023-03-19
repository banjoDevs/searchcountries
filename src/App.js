import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data.js';

function App() {



  return (
    <div>
        <Container>
          <h1>Countries</h1>
          <Form>
            <Input>
              <Form.Control 
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search countries' />
            </Input>
          </Form>
        </Container>
    </div>
  );
}

export default App;
