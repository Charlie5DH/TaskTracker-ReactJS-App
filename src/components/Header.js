import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

// to create this boilerplate for a component use rfce. To import react-types we can use ES7 typing impt
// Creating first component, in this case a header notice the name in uppercase. The component returns
// an h1 object with a text inside, that's it then we go to App.js and import Header.js
// You can also use styled components to use CSS inside the JS code, for example <h1 style={{color: 'red}}

const Header = ({ title, onAdd, showAdd }) => {
  // this is the Header component
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

// defining default props
Header.defaultProps = {
  title: "Task Tracker",
};

//defining propTypes. This is way to make the code more robust setting the expected props
Header.propTypes = {
  title: PropTypes.string,
};

// CSS in JS
//const headingStyle = {
//    color: 'red',
//    background: 'black'
//}

export default Header;
