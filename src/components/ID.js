import React from 'react';
import Information from './Information';

class ID extends React.Component {
	render() {
		const rush = this.props.rush;

		const comments = this.props.rush.comments;
		const commentsLen = Object.keys(comments).length;

		const votes = this.props.rush.votes;
		const votesLen = Object.keys(votes).length;

		if(commentsLen === 1 && votesLen > 1) {
			delete votes["NA"];
			return (
					<div>
						<div><Information rush={rush} tagline="Information"/></div>
						<div className="boxed">
							<div className="commentHeader">Votes</div>
							{
								Object.keys(votes).map((key, index) => (
								<div className="warningMessage" key={key}>
									<ul>{key + ": "} {votes[key]}</ul>
								</div>
								 ))
							}
						</div>
						<div className="boxed">
								<div className="commentHeader">Comments</div>
								<div className="warningMessage"> No comments yet </div>
						</div>
					</div>
			)
		} else if (commentsLen > 1 && votesLen === 1) {
			delete comments["NA"];
			return (
					<div>
						<div><Information rush={rush} tagline="Information"/></div>
						<div className="boxed">
								<div className="commentHeader">Votes</div>
								<div className="warningMessage"> No votes yet </div>
						</div>
						<div className="boxed">
							<div className="commentHeader">Comments</div>
								{Object.keys(comments).map((key, index) => (
									<div className="container" key={key}>
									  <div className="dialogbox">
									    <div className="body">
									      <span className="tip tip-left"></span>
									      <div className="message">	
											<span>{key + ": "} {comments[key]}</span>
									      </div>
									    </div>
									  </div>
									</div>))}
							</div>
					</div>
				)
		} else if (commentsLen === 1 && votesLen === 1){
			return (
					<div>
						<div><Information rush={rush} tagline="Information"/></div>
						<div className="boxed">
								<div className="commentHeader">Votes</div>
								<div className="warningMessage"> No votes yet </div>
						</div>
						<div className="boxed">
								<div className="commentHeader">Comments</div>
								<div className="warningMessage"> No comments yet </div>
						</div>
					</div>
				)
		} else {
			delete votes["NA"];
			delete comments["NA"];
			return (
					<div className="order-wrap">
						<div><Information rush={rush} tagline="Information"/></div>	
						<div className="boxed">
							<div className="commentHeader">Votes</div>
							{
								Object.keys(votes).map((key, index) => (
								<div className="warningMessage" key={key}>
									<ul>{key + ": "} {votes[key]}</ul>
								</div>
								 ))
							}
						</div>
						<div className="boxed">
							<div className="commentHeader">Comments</div>
							{Object.keys(comments).map((key, index) => (
								<div className="container" key={key}>
									 <div className="dialogbox">
									    <div className="body">
									      <span className="tip tip-left"></span>
									      <div className="message">	
											<span>{key + ": "} {comments[key]}</span>
									      </div>	
								    	</div>
									</div>
								</div>))}
						</div>
					</div>			
			)
		}
	}
}
export default ID;
