import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Miss} from 'react-router';

import EventPicker from './components/EventPicker';
import NotFound from './components/NotFound';
import tMember from './components/tMember';
import Event from './components/Event';
import Profile from './components/Profile';
import './css/style.css';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
			<Match exactly pattern="/" component={EventPicker} />
			<Match pattern="/event/:eventId" component={Event} />
			<Match pattern="/tmember/:uId" component={tMember} />
			<Match pattern="/profile/:membername/:rushName" component={Profile} />
			<Miss component={NotFound} />
			</div>
		</BrowserRouter>	
		)
}

render(<Root/>, document.querySelector('#main'));

