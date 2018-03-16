import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { Pagination, Icon, Table } from "semantic-ui-react";
const TableComponent = ({ tBody, tHead, pages, onPageChange }) => {
  return (
    <Table id="table" unstackable>
      <Table.Header>
        <Table.Row>{renderTableHeadRow(tHead)}</Table.Row>
      </Table.Header>
      <Table.Body>{renderTableBodyRows(tBody)}</Table.Body>
      {Math.ceil(pages) > 1 ? (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="100%" className="text-right">
              <Pagination
                size="mini"
                onPageChange={onPageChange}
                defaultActivePage={1}
                ellipsisItem={{
                  content: <Icon name="ellipsis horizontal" />,
                  icon: true
                }}
                firstItem={{
                  content: <Icon name="angle double left" />,
                  icon: true
                }}
                lastItem={{
                  content: <Icon name="angle double right" />,
                  icon: true
                }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={Math.ceil(pages)}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      ) : null}
    </Table>
  );
};
const renderCells = cells => {
  return _.map(cells, (cell, i) => {
    if (cell === undefined) return;
    return (
      <Table.Cell
        key={`table-body-row-cell-${i}`}
        textAlign={i === 0 ? null : "center"}
        collapsing={i != 0}
      >
        {cell}
      </Table.Cell>
    );
  });
};
const renderTableBodyRows = rows => {
  if (!rows || rows.length === 0) {
    return (
      <Table.Row>
        <Table.Cell colSpan="100%" className="text-center">
          No games...Go to <Link to="/create">Create</Link>!
        </Table.Cell>
      </Table.Row>
    );
  }
  return _.map(rows, (row, i) => {
    return (
      <Table.Row key={`table-body-row-${i}`}>{renderCells(row)}</Table.Row>
    );
  });
};
const renderTableHeadRow = heads => {
  return _.map(heads, (head, i) => {
    return (
      <Table.HeaderCell
        key={`table-head-${head}`}
        textAlign={i === 0 ? null : "center"}
        collapsing={i != 0}
      >
        <strong>{head}</strong>
      </Table.HeaderCell>
    );
  });
};
export default TableComponent;
