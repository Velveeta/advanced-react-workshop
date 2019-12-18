import React from 'react';

import fixture from './fixture';

/**
 * Use this module to practice writing a Component that will encapsulate its own
 * behavior with the flexibility of allowing its consumers to specify how they want
 * their pagination control to look and behave. A basic PaginatedList component has
 * been provided for you as a starting point, but will need to be modified to first
 * add pagination in general, and then to provide some form of callback handlers to
 * update the page in the rendered data set.
 *
 * The PaginatedList component should receive its 'data' parameter, and then track
 * the current page number internally, and render its own list of data. The rendered
 * page should be passed to the component's render callback function as a 'pageData'
 * parameter, along with some function handlers for 'handleFirst', 'handlePrevious',
 * 'handleNext', and 'handleLast' callbacks to update the current rendered page.
 *
 * Once you have those pieces written, make sure to implement the render callback
 * function itself at the point of consuming PaginatedList, and draw your own form
 * of pagination controls, as well as outputting the rendered list of 'pageData'.
 **/

const ListItem = ({ children }) => <div>{children}</div>;

const PaginatedList = ({ data }) => (
  data.map(record => (
    <ListItem key={record.guid}>{record.content}</ListItem>
  ))
);

const Exercise = () => (
  <PaginatedList data={fixture} />
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * import { Button } from 'react-bootstrap';
 *
 * const PaginatedList = class extends React.Component {
 *   state = {
 *     pageNum: 0,
 *   };
 *
 *   _getLastPageNumber() {
 *     return Math.ceil(this.props.data.length / 10) - 1;
 *   }
 *
 *   _getPageData() {
 *     const startIndex = this.state.pageNum * 10;
 *
 *     return this.props.data.slice(startIndex, startIndex + 10).map(record => (
 *       <ListItem key={record.guid}>{record.content}</ListItem>
 *     ));
 *   }
 *
 *   _handleFirst = () => {
 *     this.setState({ pageNum: 0 });
 *   };
 *
 *   _handleLast = () => {
 *     this.setState({ pageNum: this._getLastPageNumber() });
 *   };
 *
 *   _handleNext = () => {
 *     this.setState({ pageNum: Math.min(this.state.pageNum + 1, this._getLastPageNumber()) });
 *   };
 *
 *   _handlePrevious = () => {
 *     this.setState({ pageNum: Math.max(this.state.pageNum - 1, 0) });
 *   };
 *
 *   render() {
 *     const { children } = this.props;
 *     const pageData = this._getPageData();
 *     const handleFirst = this._handleFirst;
 *     const handleLast = this._handleLast;
 *     const handleNext = this._handleNext;
 *     const handlePrevious = this._handlePrevious;
 *
 *     return children({ handleFirst, handleLast, handleNext, handlePrevious, pageData });
 *   }
 * };
 *
 * const Exercise = () => (
 *   <PaginatedList data={fixture}>
 *     {({ handleFirst, handleLast, handleNext, handlePrevious, pageData }) => (
 *       <React.Fragment>
 *         <div>{pageData}</div>
 *         <div>
 *           <Button onClick={handleFirst} variant="primary">First</Button>
 *           <Button onClick={handlePrevious} variant="primary">Previous</Button>
 *           <Button onClick={handleNext} variant="primary">Next</Button>
 *           <Button onClick={handleLast} variant="primary">Last</Button>
 *         </div>
 *       </React.Fragment>
 *     )}
 *   </PaginatedList>
 * );
 **/
