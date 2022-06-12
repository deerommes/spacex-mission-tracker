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

const Missions = () => {
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
          <TextField label="Filter by name" variant="outlined" />
        </Toolbar>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell>Twitter</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Wikipedia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                mission
              </TableCell>
              <TableCell>twitter</TableCell>
              <TableCell>website</TableCell>
              <TableCell>wikipedia</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Missions;
