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

  useEffect(() => {
    if (data?.missions) {
      const missions = [...data.missions];
      console.log(missions);
      setRows(missions);
    }
  }, [data]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredRows = data?.missions.filter((mission: Mission) =>
      mission.name.includes(value)
    );
    setRows(filteredRows);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Paper sx={{ m: 2 }}>
      <TableContainer>
        <Toolbar sx={{ p: 2 }}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
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
                <TableCell key={column}>{column}</TableCell>
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
