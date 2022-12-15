import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
	const [searchField, setSearchField] = useState(''); //[valor, setValor]
	const [monsters, setMonsters] = useState([]); //[valor, setValor]
	const [filteredMonsters, setFilteredMonsters] =
		useState(monsters);

	console.log('render');
	useEffect(() => {
		fetch(
			'https://jsonplaceholder.typicode.com/users'
		).then((res) =>
			res.json().then((data) => setMonsters(data))
		);
	}, []); //Como so desejamos que rode uma vez o array fica vazio

	useEffect(() => {
		setFilteredMonsters(
			monsters.filter((monster) =>
				monster.name
					.toLocaleLowerCase()
					.includes(searchField)
			)
		);
	}, [searchField, monsters]);
	const onSearchChange = (event) => {
		const searchFieldString =
			event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">Monsters Rolodex</h1>
			<SearchBox
				className="search-box"
				onChangeHandler={onSearchChange}
				placeholder="search monsters"
			/>

			{/* <SearchBox
				className="search-box"
				onChangeHandler={onSearchChange}
				placeholder="search monsters"
			/> */}
			<CardList monsters={filteredMonsters} />
		</div>
	);
};

// class App extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			monsters: [],
// 			searchField: '',
// 		};
// 	}

// 	componentDidMount() {
// 		fetch(
// 			'https://jsonplaceholder.typicode.com/users'
// 		).then((res) =>
// 			res.json().then((data) =>
// 				this.setState(() => {
// 					return { monsters: data };
// 				})
// 			)
// 		);
// 	}

// 	onSearchChange = (event) => {
// 		const searchField =
// 			event.target.value.toLocaleLowerCase();
// 		console.log(searchField);
// 		this.setState(() => {
// 			return { searchField };
// 		});
// 	};

// 	render() {
// 		const { monsters, searchField } = this.state;
// 		const { onSearchChange } = this;

// 		const filteredMonsters = monsters.filter((monster) =>
// 			monster.name.toLocaleLowerCase().includes(searchField)
// 		);
// 		return (
// 			<div className="App">
// 				<h1 className="app-title">Monsters Rolodex</h1>
// 				<SearchBox
// 					className="search-box"
// 					onChangeHandler={onSearchChange}
// 					placeholder="search monsters"
// 				/>
// 				<CardList monsters={filteredMonsters} />
// 			</div>
// 		);
// 	}
// }

export default App;
