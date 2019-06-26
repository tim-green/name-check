/**
 * Vendor imports.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Custom imports.
 */
import classes from './Footer.css';

/**
 * A stateless component representing a footer.
 */
const Footer = ({ children }) => {
  return (
    <footer className={classes.footer}>
      {children}
    </footer>
  );
};

/**
 * Component props.
 */
Footer.propTypes = {
  /** The children elements to be rendered inside the footer */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

/**
 * Module exports.
 */
export default Footer;
