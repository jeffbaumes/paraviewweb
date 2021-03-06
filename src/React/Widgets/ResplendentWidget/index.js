import React from 'react';

export default React.createClass({
  displayName: 'ResplendentWidget',

  propTypes: {
    args: React.PropTypes.array,
    component: React.PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      args: [],
    };
  },

  componentDidMount() {
    const Class = this.props.component;
    if(Class) {
        // Instantiate the resplendent component with the specified args.
        this.resp = new Class(this._elt, ...this.props.args);
        this.resp.render();
    }
  },

  componentWillUnmount() {
    if(this.resp && this.resp.destroy) {
        this.resp.destroy();
    }
    this.resp = null;
  },

  render() {
    return <div ref={ elt => this._elt = elt }></div>;
  },

});
