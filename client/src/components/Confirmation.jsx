import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Confirmation(props) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "relative",
        minHeight: "100px",
      }}
    >
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => props.setShow({ item: "", status: false })}
            show={props.show.status}
            delay={3000}
            autohide
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{props.show.item}</strong>
            </Toast.Header>
          </Toast>
        </Col>
      </Row>
    </div>
  );
}
