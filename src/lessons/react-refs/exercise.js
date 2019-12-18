import React from 'react';

import './exercise.css';

/**
 * Use this module to practice using and forwarding refs from external consumers to
 * the inner parts of your component. These refs can be passed as deeply as you need
 * in order to get them to their target host elements, or can be used within the same
 * component they're initially received.
 *
 * Since part of the criteria of this exercise include a show/hide kind of stateful
 * bit, and a 3-second timeout to auto-hide the Tooltip, you'll need to use a class-
 * based component for at least part of it, while also allowing for any external
 * consumers to be able to pass a simple 'ref' prop, as opposed to some custom prop
 * name, to get a handle to the Tooltip's target children, so that they know when
 * they've been interacted with, and what to use as a target for positioning the
 * Tooltip's 'content' prop.
 *
 * The only code you should need to change in this exercise is the definition of the
 * Tooltip component itself. You can comprise your Tooltip of any number of other
 * components you feel the need to use, but the final definition of the Tooltip
 * component itself should provide the expected behavior using the existing code
 * provided in the Exercise component.
 **/

const Layer = ({ children, x, y, z }) => {
  const styles = {
    left: `${x}px`,
    top: `${y}px`,
    zIndex: z,
  };

  return (
    <div className="layer" style={styles}>
      {children}
    </div>
  );
};

Layer.defaultProps = {
  x: 0,
  y: 0,
  z: 0,
};

const TestContent = () => <span>I am some test content, congratulations!</span>;
const Tooltip = ({ children }) => children;

const tooltipTargetRef = React.createRef();

const Exercise = () => (
  <div>
    Mouse over --&gt;<Tooltip content={<TestContent />} ref={tooltipTargetRef}>me!</Tooltip>&lt;--
  </div>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * const TooltipClassComponent = class extends React.Component {
 *   state = {
 *     show: false,
 *   };
 *
 *   componentWillUnmount() {
 *     // Don't forget to clean up your timeout in case this component unmounts early!
 *     if (this._tId) {
 *       clearTimeout(this._tId);
 *     }
 *   }
 *
 *   _onMouseEnter = () => {
 *     const rect = this.props.innerRef.current.getBoundingClientRect();
 *
 *     this.setState({
 *       show: true,
 *       x: rect.left,
 *       y: global.document.documentElement.scrollTop + rect.top - rect.height - 20,
 *       z: 1,
 *     }, () => {
 *       this._tId = setTimeout(() => {
 *         this._tId = null;
 *         this.setState({ show: false });
 *       }, 3000);
 *     });
 *   };
 *
 *   render() {
 *     const { x, y, z } = this.state;
 *
 *     return (
 *       <React.Fragment>
 *         <span
 *           className="my-tooltip"
 *           onMouseEnter={this._onMouseEnter}
 *           ref={this.props.innerRef}
 *         >
 *           {this.props.children}
 *         </span>
 *         {this.state.show && (
 *           <Layer
 *             x={x}
 *             y={y}
 *             z={z}
 *           >
 *             {this.props.content}
 *           </Layer>
 *         )}
 *       </React.Fragment>
 *     );
 *   }
 * };
 *
 * const Tooltip = React.forwardRef((props, ref) => (
 *   <TooltipClassComponent {...props} innerRef={ref} />
 * ));
 **/
