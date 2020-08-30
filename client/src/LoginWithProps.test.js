import React from 'react';
import Login from './Components/Login'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// Testing Login component props with initial props passed and find selector
describe('<Login /> with other props', () => {
  const initialProps = {
    email: 'acesmndr@gmail.com',
    password: 'notapassword',
  };

  const container = shallow( <Login {...initialProps} /> )

  it('should have proper props for username field', () => {
    expect(container.find('input[type="text"]').props()).toEqual({
      className: "form-control",
      name: "username",
      onChange: expect.any(Function),
      placeholder: "Enter username",
      type: "text",
    });
  });

  it('should have proper props for password field', () => {
    expect(container.find('input[type="password"]').props()).toEqual({
      className: "form-control",
      name: "password",
      onChange: expect.any(Function),
      placeholder: "Enter password",
      type: "password",
    });
  });

});
