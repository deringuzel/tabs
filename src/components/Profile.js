import React from 'react';
import Tbase from './Tbase';
import ID from './ID';
//TODO: handle log in information, in the render function

class Profile extends React.Component{
	constructor() {
		super();
		this.handleComment = this.handleComment.bind(this);
		this.updateComments = this.updateComments.bind(this);

		this.handleVote = this.handleVote.bind(this);
		this.updateVotes = this.updateVotes.bind(this);

		this.handleOpinion = this.handleOpinion.bind(this);
		this.updateOpinion = this.updateOpinion.bind(this);

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

	handleComment() {
		const today = new Date();
    	const key = today + ", " +  this.props.params.membername;
    	const comments = this.state.rush.comments;
		const updatedComments = {...comments,
			[key] : this.comment.value
		}
		this.updateComments(updatedComments);
	}

	updateComments(updatedComments) {
		const rush = {...this.state.rush};
		rush.comments = updatedComments;
		this.setState({rush});
	}

	handleVote() {
		//TODO: change to rush chairs
		if (this.props.params.membername === 'deringüzel') {
			const today = new Date();
	    	const key = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

	    	var inFavor = parseInt(this.inFavor.value, 10);
	    	var against = parseInt(this.against.value, 10);

	    	var value = 'For: ' + inFavor + ' Against: ' + against;

	    	if(against > inFavor) {
	    		value += " CUT";
	    	}

	    	const votes = this.state.rush.votes;
	    	const updatedVotes = {...votes,
	    		[key] : value
	    	}
	    	this.updateVotes(updatedVotes, "CUT", inFavor, against);
    	}
	}

	updateVotes(updatedVotes, s, inFavor, against) {
		const rush = {...this.state.rush};
		rush.votes = updatedVotes;
		if(against > inFavor) {
			rush.cut = s;
		}
		this.setState({rush});
	}

	handleOpinion() {
		const rating = this.state.rush.rating;
		const key = this.refs.option.value;
		const value = rating[key];
		const updatedValue = value + 1; 
		const updatedOpinion = {...rating,
			[key] : updatedValue
		}
		this.updateOpinion(updatedOpinion);
	}

	updateOpinion(updatedOpinion) {
		const rush = {...this.state.rush};
		rush.rating = updatedOpinion;
		this.setState({rush});
	}

	render() {
		const rush = this.state.rush;
		//TODO: change to rush comittee
		if (this.props.params.membername === 'deringüzel') {
			this.auth = "Submit Vote";
		} else {
			this.auth = "WARNING: ONLY RUSH CHAIRS CAN SUBMIT!"
		}

		if (rush) {
			return (
				<div className="catch-of-the-day">
					<div className="order-wrap">
						<div>
							<header className="top">
								<h1><span className="ofThe"></span></h1>
							 	<h3 className="tagline"><span>2017</span></h3>
							</header>
						</div>
						<div>
							<form className="fish-edit" onSubmit={() => this.handleOpinion()}>
								<select ref="option">
										<option value="love">Love!</option>
										<option value="hate">Hate!</option>
										<option value="NA">Don't know</option>
								</select>
								<button type="submit">Submit Rating</button>
							</form>
							<form className="fish-edit" onSubmit={() => this.handleComment()}>
								<textarea ref={(input) => this.comment = input} placeholder="Comment"></textarea>
								<button type="submit">Submit Comment</button>
							</form>
							<form className="fish-edit" onSubmit={() => this.handleVote()}>
								<input ref={(input) => this.inFavor = input} type="number" placeholder="In favor"/>								
								<input ref={(input) => this.against = input} type="number" placeholder="Against"/>
								<button type="submit">{this.auth}</button>
							</form>
							<button className="facebook" 
							onClick={() => this.context.router.transitionTo(`/tmember/${this.props.params.membername}/search`)}>Search</button>
						</div>
					</div>
					<div className="menu"><ID rush={rush} tagline="ID"/></div>		
				</div>
			)		
	} else {
		return (
			<div>
				<h1>Trash 2017</h1>	
			</div>
			)
	}

	}
}

Profile.contextTypes = {
	router: React.PropTypes.object
}

export default Profile;
