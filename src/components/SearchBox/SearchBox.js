/**
 * Vendor imports.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Custom imports.
 */
import classes from './SearchBox.css';
import * as actions from '../../store/actions/index';

/**
 * A stateful component representing the search box.
 * @extends Component
 */
class SearchBox extends Component {

  /**
   * Component props.
   */
  static propTypes = {
    /**
     * 'true' if there is a check in progress or 'false' otherwise.
     * This is loaded from the store.
     */
    checkInProgress:  PropTypes.bool.isRequired,
    /**
     * A callback to be called when the search buttin is clicked.
     * It dispatches an action to the store.
     * This is loaded from the store.
     * */
    onClick:          PropTypes.func.isRequired
  };

  /**
   * Component state.
   */
  state = {
    /** The current username */
    username: '',
    /** The last username that was checked */
    lastUsername: ''
  }

  /**
   * Update current username.
   *
   * @param {string} newUsername - The new username.
   */
  updateUsername (newUsername) {
    this.setState({ username: newUsername });
  }

  /**
   * Change username: save current username on state and
   * dispatch a 'changeUsername' action to the store.
   */
  changeUsername () {
    const username = this.state.username.replace(/\s/g, '').toLowerCase();

    if (username !== this.state.lastUsername) {
      this.setState({ lastUsername: username});
      this.props.onClick(username);
    }
  }

  /**
   * Event handler for 'kew down' event.
   *
   * @param {object} event - The event.
   */
  onKeyDown = (event) => {
    const { checkInProgress } = this.props;

    // Check if the user pressed the 'ENTER' key.
    if (event.keyCode === 13) {
      // Check current username unless there is another checking in progress.
      if (!checkInProgress) {
        this.changeUsername();
      }
    }

    // Check if the user pressed the 'ESC' key.
    if (event.keyCode === 27) {
      // If there is no checking in progress then set username as empty.
      if (!checkInProgress) {
        this.updateUsername('');
        this.changeUsername();
      }
    }
  }

  /**
   * Event handler for input 'change' event.
   *
   * @param {object} event - The event.
   */
  onChange = (event) => {
    this.updateUsername(event.target.value);
  }

  /**
   * Event handler for 'click' events.
   */
  onClick = () => {
    this.changeUsername();
  }

  /**
   * Implementation of React Component's 'componentDidMount' method.
   */
  componentDidMount () {
    // Start listening for 'key down' events.
    document.addEventListener("keydown", this.onKeyDown);
  }

  /**
   * Implementation of React Component's 'render' method.
   */
  render () {

    // If there is a check in progress then both input and button should
    // be disabled.
    let disabled = this.props.checkInProgress ? 'disabled' : '';

    return (
      <div className={classes.searchBox}>
        <input className={[classes.input, classes[disabled]].join(' ')}
          name="input"
          placeholder="Enter a username."
          type="search"
          onChange={this.onChange}
          value={this.state.username}
          disabled={disabled}/>

        <button className={[classes.button, classes[disabled]].join(' ')}
          type="submit"
          disabled={disabled}
          onClick={this.onClick}>
          CHECK!
        </button>
      </div>
    );
  }
}

/**
 * Props mappings to store's state.
 * @constant {object} mapStateToProps
 */
const mapStateToProps = (store) => ({
  checkInProgress: store.checking
});

/**
 * * Props mappings to store's actions.
 * @constant {object} mapDispatchToProps
 */
const mapDispatchToProps = (dispatch)  => ({
  onClick: (username) => dispatch(actions.changeUsername(username)),
});

/**
 * Module exports.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
