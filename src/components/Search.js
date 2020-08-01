import React, {useState} from 'react'
import Row from './Row'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const classes = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
	  
    },
	'& .MuiTextField-root': {
      margin: theme.spacing(1),      
	},
	table: {
		minWidth: 650,
	},
}}));

const Search = () => {
	const [ order, setOrder] = useState({});
	const apiURL = "http://localhost:8082/get/";
	const [query, setQuery] = useState('')

	const fetchData = async (event) => {
        const response = await axios.get(apiURL+query)
        setOrder(response.data) 
    }
	
    return(
        <div className={classes.root} align="center"> 		
				<Paper component="form" className={classes.root}>
				  <InputBase
					className={classes.input}
					onChange={event => setQuery(event.target.value)}
					placeholder="Search orders"
					inputProps={{ 'aria-label': 'search orders' }}
				  />
				  <IconButton onClick={fetchData} className={classes.iconButton} aria-label="search">
					<SearchIcon />
				  </IconButton>      
				</Paper>				
				<div className="order">		
				{order && order.products && 
					<Row key={order.name} row={order} />												 
				}
				</div>
			</div>
    )
}
export default Search;