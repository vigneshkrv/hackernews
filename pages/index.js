import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Table from "../Components/table";

const options = [
  { label: "Top", value: "topstories" },
  { label: "Ask", value: "askstories" },
  { label: "Show", value: "showstories" },
  { label: "Job", value: "jobstories" },
];
export default function Home() {
  const [type, setType] = useState({ label: "Top", value: "topstories" });
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    axios
      .get(`/api/hello/`, {
        params: {
          type: type.value,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setIsFetching(false);
      });
  }, [type]);

  const onChangeOption = (option) => {
    setType(option);
  };
  return (
    <div className="m-5 container-fluid">
      <Container>
        <Row>
          <Table
            tableName="HackerNews"
            tableData={data}
            type={type}
            isFetching={isFetching}
            color="#1DA1F2"
            onChangeOption={onChangeOption}
          />
        </Row>
      </Container>
    </div>
  );
}
