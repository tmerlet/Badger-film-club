import React from 'react';
import { render } from 'react-dom';

import H1 from './components/H1';

const node = document.getElementById('mount');

render(<H1>Hello</H1>, node);
