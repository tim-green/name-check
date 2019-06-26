/**
 * Vendor imports.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Custom imports.
 */
import classes from './Header.css';

/**
 * A stateless component representing a header.
 */
const Header = ({ children }) => {
  return (
    <header className={classes.header}>
      {children}
    </header>
  );
};

/**
 * Component props.
 */
Header.propTypes = {
  /** The children elements to be rendered inside the header */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

/**
 * Module exports.
 */
export default Header;
