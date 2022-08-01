import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import { Badge, Tab } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
function createData(organizer, event, eventType, revenue, ticketSold, status) {
  return { organizer, event, eventType, revenue, ticketSold, status };
}
//Main function
export default function Events() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const rows = [
    createData(
      "Tesla",
      "Hard Summer Music Festival",
      "Venue",
      "$15,325",
      "200 / 500",
      " Published"
    ),
    createData(
      "Apple",
      "When we were you",
      "Online Event",
      "$15,325",
      "200 / 500",
      " Published"
    ),
    createData(
      "Samsung",
      "Buku 2022",
      "Venue",
      "$15,325",
      "200 / 500",
      " Published"
    ),
    createData(
      "Tesla",
      "Hard Summer Music Festival",
      "Venue",
      "$15,325",
      "200 / 500",
      " Published"
    ),
    createData(
      "Tesla",
      "Hard Summer Music Festival",
      "Venue",
      "$15,325",
      "200 / 500",
      " Published"
    ),
  ];
  return (
    <>
      <div className="bg-darkGrey-25 font-OpenSansRegular text-ft8 p-12.5 min-h-screen ml-250">
        Events
        <div className=" w-250 mt-7.5">
          <Tabs className="mb-32 table-tabs ">
            <Tab
              eventKey="Top Tokens"
              title="Published"
              className="text-grey-50"
            >
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Organizer</TableCell>
                      <TableCell>Event</TableCell>
                      <TableCell>Event Type</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Ticket Sold</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.organizer}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.event}
                        </TableCell>
                        <TableCell>{row.eventType}</TableCell>
                        <TableCell>{row.revenue}</TableCell>
                        <TableCell>{row.ticketSold}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Tab>
            <Tab eventKey="Upcoming" title={<>Upcoming</>}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Organizer</TableCell>
                      <TableCell>Event</TableCell>
                      <TableCell>Event Type</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Ticket Sold</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.organizer}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.event}
                        </TableCell>
                        <TableCell>{row.eventType}</TableCell>
                        <TableCell>{row.revenue}</TableCell>
                        <TableCell>{row.ticketSold}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Tab>
            <Tab eventKey="Past" title={<>Past</>}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Organizer</TableCell>
                      <TableCell>Event</TableCell>
                      <TableCell>Event Type</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Ticket Sold</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.organizer}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.event}
                        </TableCell>
                        <TableCell>{row.eventType}</TableCell>
                        <TableCell>{row.revenue}</TableCell>
                        <TableCell>{row.ticketSold}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
