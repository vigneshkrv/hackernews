import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "../Components/table";
const tableHeaders = [
  { colRef: "title", colLabel: "Title" },
  { colRef: "by", colLabel: "Author" },
  { colRef: "url", colLabel: "URL" },
  { colRef: "score", colLabel: "Score" },
  { colRef: "time", colLabel: "Created Time" },
  { colRef: "type", colLabel: "Type" },
];
const secondTableHeaders = [
  { colRef: "title", colLabel: "Title" },
  { colRef: "by", colLabel: "Author" },
  { colRef: "text", colLabel: "Text" },
  { colRef: "score", colLabel: "Score" },
  { colRef: "time", colLabel: "Created Time" },
  { colRef: "type", colLabel: "Type" },
];
export default function Home() {
  const [type, setType] = useState({ label: "Top", value: "topstories" });
  const [data, setData] = useState([]);
  const [header, setHeader] = useState(tableHeaders);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    setIsFetching(true);
    axios
      .get(`/api/hackerApi/`, {
        params: {
          type: type.value,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [type]);

  const onChangeOption = (option) => {
    if (option.label === "Ask") {
      setHeader(secondTableHeaders);
    } else {
      setHeader(tableHeaders);
    }
    setType(option);
  };
  return (
    <div className="m-5 container-fluid">
      <Container>
        <Row>
          <Table
            tableName="HackerNews"
            tableData={data}
            tableHeaders={header}
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
