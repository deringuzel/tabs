import React from 'react';

const Header = (props) => {

	//const date = Date.now();
	const today = new Date(),
    date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

	return (
			<div>
				<header className="top">
					<h1>
					<span className="ofThe">
						<span className="of">{date}</span>
					</span>
					 </h1>
					 <h3 className="tagline"><span>{props.tagline}</span></h3>
				</header>
			</div>

		)

	}

export default Header;
