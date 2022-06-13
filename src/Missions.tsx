import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

type Mission = {
  id: string;
  name: string;
  twitter: string;
  website: string;
  wikipedia: string;
};

const GET_MISSIONS = gql`
  query GetMissions {
    missions {
      id
      name
      twitter
      website
      wikipedia
    }
  }
`;

const COLUMNS = ['Name', 'Twitter', 'Website', 'Wikipedia'];

const Missions = () => {
  const { loading, error, data } = useQuery(GET_MISSIONS);
  const [rows, setRows] = useState<Mission[] | null>([]);
  const [ascRows, setAscRows] = useState<Mission[] | null>([]);
  const [descRows, setDescRows] = useState<Mission[] | null>([]);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc' | undefined>('asc');

  useEffect(() => {
    if (data?.missions) {
      const missions = [...data.missions];

      const asc = [
        ...missions.sort((a: Mission, b: Mission) =>
          a.name > b.name ? 1 : -1
        ),
      ];
      console.log('asc', asc);

      const desc = [
        ...missions.sort((a: Mission, b: Mission) =>
          a.name < b.name ? 1 : -1
        ),
      ];
      console.log('desc', desc);

      setRows(missions);
      setAscRows(asc);
      setDescRows(desc);
    }
  }, [data]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredRows = data?.missions.filter((mission: Mission) =>
      mission.name.includes(value)
    );
    setRows(filteredRows);
  };

  const handleSort = (orderBy: 'asc' | 'desc' | undefined) => {
    if (orderBy === 'asc') {
      setOrderBy('desc');
      setRows(descRows);
    } else if (orderBy === 'desc') {
      setOrderBy('asc');
      setRows(ascRows);
    }
  };

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Paper sx={{ m: 2 }}>
      <TableContainer>
        <Toolbar sx={{ p: 2 }}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            data-testid="missions"
            component="div"
          >
            Missions
          </Typography>
          <TextField
            label="Filter by name"
            variant="outlined"
            onChange={handleFilter}
          />
        </Toolbar>
        <Table aria-label="missions table">
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell key={column}>
                  {column}
                  {column === COLUMNS[0] && (
                    <TableSortLabel
                      active={true}
                      direction={orderBy}
                      onClick={() => handleSort(orderBy)}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.twitter || 'NA'}</TableCell>
                <TableCell>{row.website}</TableCell>
                <TableCell>{row.wikipedia}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Missions;
