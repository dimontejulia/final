import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default function ClubList(props) {
  const { listName, list, setCurrClub } = props;

  const parsedList =
    list &&
    list.map((club) => (
      <tr className="clubs__list-item" key={club.id}>
        <td className="club__lists-button">
          <Link onClick={() => setCurrClub(club.id)} to={`/clubs/${club.id}`}>
            <span className="text-dark">{club.book_club_name}</span>
            <Button>
              <i className="fas fa-arrow-circle-right"></i>
            </Button>
          </Link>
        </td>
      </tr>
    ));

  return (
    <section>
      <h1 className="sidebar__subheading">{listName}</h1>
      <Table hover size="sm">
        <tbody>{parsedList}</tbody>
      </Table>
    </section>
  );
}
