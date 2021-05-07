import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "../Components/table";

export default function Home() {
  const [type, setType] = useState({ label: "Top", value: "topstories" });
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
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
    console.log(option);
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
