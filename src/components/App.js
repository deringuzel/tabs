import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from'../Base';

class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this); 
		this.removeFish = this.removeFish.bind(this);
		this.removeFishFromOrder = this.removeFishFromOrder.bind(this);

		this.addRush = this.addRush.bind(this);
		this.updateRush = this.updateRush.bind(this);
		this.removeRush = this.removeRush.bind(this)


		//initial state
		this.state = {
			rushes: {},
			order: {}
		};
	}

	componentWillMount() {
		//this runs right before the app is rendered
		this.ref = base.syncState(`${this.props.params.eventId}/fishes`, 
			{
				context: this,
				state: 'fishes',
			});
		
		//check if there is any order in local storage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.eventId}`);

		if (localStorageRef) {
			//update our app components order state
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.eventId}`, 
			JSON.stringify(nextState.order));
	}

	addFish(fish) {
		//update state
		const fishes = {...this.state.fishes};

		//add in our new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		
		//set state
		this.setState({fishes: fishes});
	}

	addRush(rush) {
		const rushes = {...this.state.rushes};

		//add in new rush
		const timestamp = Data.now();
		rushes[`rush-${timestamp}`] = rush;

		//set state
		this.setState({rushes: rushes})
	}

	updateRush(rush) {
		const rushes = {...this.state.rushes};
		rushes[key] = updatedRush;
		this.setState({fishes});
	}

	removeRush(key) {
		const rushes = {...this.state.rushes};
		rushes[key] = null;
		this.setState({rushes});
	}

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({fishes});
	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		fishes[key] = null
		this.setState({fishes});
	}

	removeFishFromOrder(key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({order})
	}
	loadSamples(){
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key) {
		//take a copy of state
		const order = {...this.state.order};
		//update or add the new number of fish ordered
		order[key] =  order[key] + 1 || 1;
		//update state
		this.setState({order: order});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh SeaFood Market"/>
					<ul className="list-of-fishes">
						{
							Object
							.keys(this.state.fishes)
							.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}

					</ul>
				</div>
				<Order fishes={this.state.fishes}
				 order={this.state.order}
				 removeFishFromOrder={this.removeFishFromOrder}
				 params={this.props.params}/>
				<Inventory addFish={this.addFish}
				eventId={this.props.params.eventId}
				removeFish={this.removeFish}
				loadSamples={this.loadSamples} 
				fishes={this.state.fishes}
				updateFish={this.updateFish}
				/>
			</div>
			)
	}
}

export default App;