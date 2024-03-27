import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data.js";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function App() {
  const [search, setSearch] = useState("");
  const [selectDates, setSelectDates] = useState([]);
  console.log(selectDates);

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4 ">Patient Details</h1>
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Patient Details"
            />
            <RangePicker
              onChange={(dates) => {
                // Format the selected dates and store them as strings in the state
                setSelectDates(dates.map((date) => date.format("YYYY-MM-DD")));
              }}
            />
          </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Patient Id</th>
              <th>Patient Name</th>
              <th>Phone Number</th>
              <th>Join Date</th>
              <th>Patient Type</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                if (selectDates.length === 2) {
                  const startDate = moment(selectDates[0], "YYYY-MM-DD");
                  const endDate = moment(selectDates[1], "YYYY-MM-DD");
                  const joinDate = moment(item.Join_date, "YYYY-MM-DD");
                  return joinDate.isBetween(startDate, endDate, null, "[]");
                }
                return true;
              })
              .filter((items) => {
                return search.toLowerCase() === ""
                  ? items
                  : items.Patient_id.includes(search) ||
                      items.Patient_Name.toLowerCase().includes(
                        search.toLowerCase()
                      ) ||
                      items.Patient_PhoneNumber.includes(search) ||
                      items.Patient_type.toLowerCase().includes(
                        search.toLowerCase()
                      );
              })
              .map((item) => (
                <tr key={item.Patient_id}>
                  <td>{item.Patient_id}</td>
                  <td>{item.Patient_Name}</td>
                  <td>{item.Patient_PhoneNumber}</td>
                  <td>{item.Join_date}</td>
                  <td>{item.Patient_type}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
