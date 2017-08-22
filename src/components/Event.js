import React from 'react';
import Header from './Header';
import Register from './Register'
import Tbase from'./Tbase';

class Event extends React.Component{
	constructor() {
		super();
		this.addRush = this.addRush.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
	
		this.state = {
			rushes: {}
		};
	}

	componentWillMount() {
		this.ref = Tbase.syncState(`/rushes`, 
			{
				context: this,
				state: 'rushes',
			});
	}

	componentWillUnmount() {
		Tbase.removeBinding(this.ref);
	}

	addRush(rush, name) {
		const rushes = {...this.state.rushes};
		if (name in rushes) {
			rush = rushes[name];
			rush.event.push(this.props.params.eventId);
		} else {
			rushes[name] = rush;
		}
		this.setState({rushes: rushes})
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="The Tabard Society"/>
				</div>
				<div>
					<Register className="Babies"
					addRush={this.addRush}
					event={this.props.params.eventId}/>
				</div>	
			</div>
			)
	}
}
export default Event;