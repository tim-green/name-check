/**
 * Vendor imports.
 */
import React from 'react';

/**
 * Custom imports.
 */
import classes from './Reference.css';

/**
 * A stateless component representing a block with reference information.
 */
const Reference = () => (
  <div className={classes.reference}>
    <div className={[classes.item, classes.unavailable].join(' ')}>
      <p className={classes.text}>
        Unavailable
      </p>
    </div>
    <div className={[classes.item, classes.available].join(' ')}>
      <p className={classes.text}>
        Available
      </p>
    </div>
    <div className={[classes.item, classes.checking].join(' ')}>
      <p className={classes.text}>
        Checking
      </p>
    </div>
  </div>
);

/**
 * Module exports.
 */
export default Reference;
