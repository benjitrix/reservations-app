import React from 'react';
import Login from './Components/Login'
import renderer from 'react-test-renderer';

// snapshot test of Login component
test('renders correctly', () => {
const tree = renderer
.create(<Login />)
.toJSON();
expect(tree).toMatchSnapshot();
});
