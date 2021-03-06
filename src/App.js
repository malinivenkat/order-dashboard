import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar'
import Row from './components/Row'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Tabs, Nav, Content} from 'react-tiny-tabs';
import './css/index.css';
import Search from './components/Search'




function App() {
	const [ rows, setRows ] = useState([]);
	const [ listening, setListening ] = useState(false);
		
	
	useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:8081/stream-sse');
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setRows((rows) => rows.concat(parsedData));
      };
      setListening(true);
    }
	}, [listening, rows]);



  return (
  
  <div>
	<NavigationBar />
	<br/>
	<Tabs className="theme-folder">
		<Nav>
			<div>Dashboard</div>
			<div>Search</div>
		</Nav>
		<Content>
			<div>
				<TableContainer component={Paper}>
				  <Table aria-label="collapsible table">
					<TableHead>
					  <TableRow width="100%">
						<TableCell />			
						<TableCell align="center">Order#</TableCell>
						<TableCell align="center">Created Time</TableCell>
					  </TableRow>
					</TableHead>
					<TableBody>
					  {rows.map((row) => (
						<Row key={row.name} row={row} />
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
			</div>
			<div>
				<Search />
			</div>
		</Content>
	</Tabs>
	</div>
  );

}
export default App;