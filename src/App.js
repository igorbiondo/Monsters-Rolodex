import { Component } from 'react';

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
		fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
			res.json().then((data) =>
				this.setState(() => {
					return { monsters: data };
				})
			)
		);
	}

	render() {
		const filteredMonsters = this.state.monsters.filter((monster) =>
			monster.name.toLocaleLowerCase().includes(this.state.searchField)
		);
		return (
			<div className="App">
				<h1>Rolodex</h1>
				<input
					className="search-box"
					type="search"
					placeholder="search monsters"
					onChange={(event) => {
						const searchField = event.target.value.toLocaleLowerCase();
						console.log(searchField);
						this.setState(() => {
							return { searchField };
						});
					}}
				/>
				{filteredMonsters.map((monster, i) => (
					<div key={monster.id}>
						<h1>{monster.name}</h1>
					</div>
				))}
			</div>
		);
	}
}

export default App;
