import React from 'react';
import Tbase from './Tbase';

class tMember extends React.Component{
	constructor() {
		super();
		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this.renderOrder = this.renderOrder.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.filter = this.filter.bind(this);

		this.state = {
			rushes: {},
			search: ''
		}
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

	renderOrder(key) {
		const rush = this.state.rushes[key];
		return (
			<li key={key}> 
				<span>{rush.name}</span>
			</li>
			)

	}

	updateSearch(event) {
		this.setState({search: event.target.value});
	}

	filter(dictionary) {
		var mainOutput = {};
		var outputUncut = {};
		var outputCut = {}
		for (var key in dictionary) {
			if(dictionary.hasOwnProperty(key)) {
				if (key.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
					if (this.state.rushes[key].cut === "CUT") {
						outputCut[key] = dictionary[key];
					} else {
						outputUncut[key] = dictionary[key];
					}
				}
			}
		}
		mainOutput["outputCut"] = outputCut;
		mainOutput["outputUncut"] = outputUncut;

		return mainOutput;
	}

	render() {
			if (this.state.rushes) {
				const filteredRushes = this.filter(this.state.rushes);
				const filteredCutRushes = filteredRushes["outputCut"];
				const filteredUncutRushes = filteredRushes["outputUncut"];
				return (
					<div>
						<button className="facebook" 
						onClick={() => this.context.router.transitionTo(`/`)}>Home</button>
						<form className="event-selector">
							<h2>Search</h2>
							<input type="text" required placeholder="Name"
							onChange={this.updateSearch}/>
							{
								Object.keys(filteredUncutRushes).map((key, index) => (
								<button key={index}
								onClick={() => this.context.router.transitionTo(`/profile/${this.props.params.uId}/${key}`)}>
								 {filteredUncutRushes[key].name} {filteredUncutRushes[key].lastName}</button>))
							}
							{
								Object.keys(filteredCutRushes).map((key, index) => (
								<button className="cut" key={index}
								onClick={() => this.context.router.transitionTo(`/profile/${this.props.params.uId}/${key}`)}>
								 {filteredCutRushes[key].name} {filteredCutRushes[key].lastName}</button>))
							}
						</form>
					</div>
				)
			} else {
				return  (
					<p>No rushes yet</p>
				)
			}
		}
}

tMember.contextTypes = {
	router: React.PropTypes.object
}

export default tMember;
