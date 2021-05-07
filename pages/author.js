import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import moment from "moment";

export default function Author() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const name = router.query.name;
  useEffect(() => {
    console.log(name);
    axios.post(`/api/hackerApi?name=${name}`).then((res) => {
      setData(res.data.data);
    });
  }, []);
  return (
    <div className="m-5 container-fluid align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title>{router.query.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Created: {moment.unix(data.created).format("MMMM Do YYYY")}
              </Card.Subtitle>
              <Card.Text>
                <strong>About:</strong> {data.about || "N/A"}.
              </Card.Text>
              <Card.Text>
                <div className="d-flex justify-content-between">
                  <span>
                    <strong>Karma:</strong> {data.karma || "N/A"}.
                  </span>
                  <span>
                    <strong>Submitted:</strong> {data.submitted?.length || 0}.
                  </span>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
