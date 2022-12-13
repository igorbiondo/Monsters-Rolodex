import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			monsters: [],
			searchField: '',
		};
	}

	componentDidMount() {
		fetch(
			'https://jsonplaceholder.typicode.com/users'
		).then((res) =>
			res.json().then((data) =>
				this.setState(() => {
					return { monsters: data };
				})
			)
		);
	}

	onSearchChange = (event) => {
		const searchField =
			event.target.value.toLocaleLowerCase();
		console.log(searchField);
		this.setState(() => {
			return { searchField };
		});
	};

	render() {
		const { monsters, searchField } = this.state;
		const { onSearchChange } = this;

		const filteredMonsters = monsters.filter((monster) =>
			monster.name.toLocaleLowerCase().includes(searchField)
		);
		return (
			<div className="App">
				<h1 className="app-title">Monsters Rolodex</h1>
				<SearchBox
					className="search-box"
					onChangeHandler={onSearchChange}
					placeholder="search monsters"
				/>
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
