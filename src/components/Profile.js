import React from 'react';
import Tbase from './Tbase';
import ID from './ID';

class Profile extends React.Component{
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this.state = {
			rush: null,
		}
	}

	componentWillMount() {
		const reference = 'rushes/' + this.props.params.rushName;
		this.ref = Tbase.syncState(reference, 
			{
				context: this,
				state: 'rush',
			});
	}

	componentWillUnmount() {
		Tbase.removeBinding(this.ref);
	}

	handleChange(e) {
	}

	render() {
		if (this.state.rush) {
			return (
				<div className="catch-of-the-day">
					<div className="order-wrap">
						<div>
							<header className="top">
								<h1>
									<span className="ofThe"></span>
							 	</h1>
							 	<h3 className="tagline"><span>2017</span></h3>
							</header>
						</div>
						<div>
							<form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.handleChange(e)}>
								<textarea ref={(input) => this.desc = input} placeholder="Comment"></textarea>
								<button type="submit">Submit Comment</button>
							</form>

							<form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.handleChange(e)}>
								<select ref={(input) => this.status = input}>
										<option value="available">Fresh!</option>
										<option value="Unavailable">Sold out!</option>
								</select>
								<button type="submit">Submit Rating</button>
							</form>

							<form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.handleChange(e)}>
								<input ref={(input) => this.lastName = input} type="text" placeholder="Against"/>
								<input ref={(input) => this.name = input} type="text" placeholder="In favor"/>
								<input ref={(input) => this.name = input} type="text" placeholder="In favor"/>
								<button type="submit">Submit Clementine Result</button>
							</form>
						</div>
					</div>

					<div className="menu">
						<ID rush={this.state.rush} tagline="ID"/>
					</div>		
				</div>
			)		
	} else {
		return (
			<h1>Trash 2017</h1>	
			)
	}


	}
}

export default Profile;
