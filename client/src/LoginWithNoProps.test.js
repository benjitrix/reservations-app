import React from 'react';
import Login from './Components/Login'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// Testing Login component ui and props (no props passed) with snapshot and find selector
describe('<Login /> with no props', () => {
  const container = shallow(<Login />);
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have a username field', () => {
    expect(container.find('input[type="text"]').length).toEqual(1);
  });

  it('should have proper props for username field', () => {
    expect(container.find('input[type="text"]').props()).toEqual({
      className: "form-control",
      name: "username",
      onChange: expect.any(Function),
      placeholder: "Enter username",
      type: "text",
    });
  });

  it('should have a password field', () => {
    expect(container.find('input[type="password"]').length).toEqual(1);
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
