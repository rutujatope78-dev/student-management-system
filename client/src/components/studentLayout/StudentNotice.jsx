import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";

const StudentNotice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const savedNotices = localStorage.getItem("notices");

    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    }
  }, []);

  return (
    <Container className="mt-4">
      <h2>Notice Board</h2>

      {notices.length === 0 ? (
        <p>No Notices Available</p>
      ) : (
        notices.map((notice) => (
          <Card key={notice.id} className="mb-3 shadow">
            <Card.Body>
              <Card.Title>{notice.title}</Card.Title>
              <Card.Text>{notice.description}</Card.Text>
              <small className="text-muted">{notice.date}</small>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default StudentNotice;