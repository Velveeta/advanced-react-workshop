import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';
import NavigationFooter from '../../components/navigation/footer';

import Exercise from './exercise';
import Tips from './tips';

const RenderCallbacksLesson = () => {
  useRegisterNavLink('', '');

  return (
    <Lesson tips={<Tips />}>
      <h1>Render Callbacks</h1>
      <div className="mt-4 text-justify">
        Render callbacks can sometimes elicit both positive and negative responses from people. Some React purists may feel like one should only be passing React component instances, arrays of component instances, or text down as the <Highlight>children</Highlight> prop, and that passing a functional <Highlight>children</Highlight> prop is somehow exploiting a feature of React that was never intended to be used that way. When used wisely, though, render callbacks can be powerful tools that allow you to decouple the intent of a component from the actual UI representation of a component.
      </div>
      <div className="mt-4 text-justify">
        Look at this example of a typical <Highlight>DataGrid</Highlight> type of component. It takes an array of <Highlight>data</Highlight> as a prop, along with an array of <Highlight>columns</Highlight>, and renders a standard table of data as its output. Internally, it may also track such things as pagination, current column sort name and direction, and who knows what else:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

const DataGrid = ({ columns, data }) => (
  <table>
    <thead>
      {columns.map(column => (
        <th key={column.name}>{column.name}</th>
      ))}
    </thead>
    <tbody>
      {data.map(row => (
        <tr key={row.id}>
          {columns.map(column => (
            <td key={column.name}>{row.data[columns.name]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataGrid;

/**
 * Example Usage:
 * <DataGrid columns={ordersColumns} data={orders} />
 **/`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        This is all well and good until your designer wants to put even the most basic of design constraints on the way your DataGrid should look, at which point the idea of using this component will most likely go out the window, as its appearance is completely owned internally. We can get around this somewhat by accepting props for Components to be used when rendering various portions of the <Highlight>DataGrid</Highlight> component itself, like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

const DataGrid = ({ CellComponent, columns, data, HeaderComponent }) => (
  <table>
    <thead>
      {columns.map(column => (
        <HeaderComponent key={column.name}>
          {column.name}
        </HeaderComponent>
      ))}
    </thead>
    <tbody>
      {data.map(row => (
        <tr key={row.id}>
          {columns.map(column => (
            <CellComponent key={column.name}>
              {row.data[columns.name]}
            </CellComponent>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

DataGrid.defaultProps = {
  CellComponent: 'td',
  HeaderComponent: 'th',
};

export default DataGrid;

/**
 * Example Usage:
 * <DataGrid
 *   CellComponent={CustomCellComponent}
 *   columns={ordersColumns}
 *   data={orders}
 *   HeaderComponent={CustomHeaderComponent}
 * />
 **/`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        This gets us closer to a really robust and flexible component that can be styled basically however our designers might want, but we can do even more. Using render callbacks, and some internal restructuring, we can help separate the various behavioral aspects (e.g. tracking column sort information, current page of records, etc) of this component from the presentational details of how it's actually rendered.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

const DataGrid = class extends React.Component {
  state = {
    numPerPage: 10,
    columnSortDirection: 'asc',
    columnSortName: null,
    pageNum: 0,
  };

  _getPageData() {
    const { numPerPage, pageNum } = this.state;
    const startIndex = pageNum * numPerPage;

    return this._getSortedData().slice(startIndex, startIndex + numPerPage);
  }

  _getSortedData() {
    const { columnSortDirection, columnSortName } = this.props;
    const sortedData = [...this.props.data].sort((a, b) => {
      const { [columnSortName]: aVal } = a.data;
      const { [columnSortName]: bVal } = b.data;

      if (aVal === bVal) {
        return 0;
      }

      return (aVal > bVal ? 1 : -1);
    });

    if (columnSortDirection === 'desc') {
      sortedData.reverse();
    }

    return sortedData;
  }

  _handleSort = (e) => {
    const { column } = e.target.dataset;
    let sortDirection = 'asc';

    if (column === this.state.columnSortName) {
      sortDirection = (this.state.columnSortDirection === 'asc' ? 'desc' : 'asc');
    }

    this.setState({
      columnSortDirection: sortDirection,
      columnSortName: column,
    });
  };

  render() {
    const { children } = this.props;
    const handleSort = this._handleSort;
    const pageData = this._getPageData();

    return children({ handleSort, pageData });
  }
}

export default DataGrid;

/**
 * Example Usage:
 *
 * <DataGrid data={orders}>
 *   {({ handleSort, pageData }) => (
 *     <div>
 *       <div className="header">
 *         {columns.map(column => (
 *           <div
 *             className="column"
 *             data-column={column.name}
 *             key={column.name}
 *             onClick={handleSort}
 *           >
 *             {column.name}
 *           </div>
 *         ))}
 *       </div>
 *       <div className="body">
 *         {pageData.map(row => (
 *           <div className="row" key={row.id}>
 *             {columns.map(column => (
 *               <div className="cell" key={column.name}>
 *                 {row.data[column.name]}
 *               </div>
 *             ))}
 *           </div>
 *         ))}
 *       </div>
 *     </div>
 *   )}
 * </DataGrid>
 **/`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Now we've managed to encapsulate the business logic of what behavior constitutes our <Highlight>DataGrid</Highlight> component itself (e.g. pagination, column sorting, etc), and allow the presentation of the underlying data to be entirely left up to the consumer. In this specific case, we're using an <Highlight>onClick</Highlight> handler to trigger the <Highlight>handleSort</Highlight> function we're being passed by the parent Component, but maybe in some other circumstance, we'd trigger that behavior using <Highlight>onDoubleClick</Highlight>, or <Highlight>onMouseEnter</Highlight>, or something else entirely. Maybe in some situations, we want to stripe every other row to make it easier to tell them apart, or use <Highlight>dd</Highlight> elements for the header, and <Highlight>dt</Highlight> elements for the cells. Maybe we want an optional footer in some cases and not others. By allowing our consumer to specify exactly how they want their data rendered, and leaving managed aspects up to the parent component, we can make for a powerful combination of centralized maintenance of business logic, while allowing for extreme visual flexibility.
      </div>
      <div className="mt-4 text-justify">
        Some people don't like using the implicit <Highlight>children</Highlight> prop for this sort of thing, and would prefer to relegate this kind of behavior to some custom prop created for it, like a literal <Highlight>render</Highlight> prop, and that's fine, too. React really doesn't care how it's handled, it's just up to you to establish that contract as part of your component's interface. Doing something similar with an literal <Highlight>render</Highlight> prop would look almost exactly the same as the previous example:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

const MyRenderCallbackComponent = class extends React.Component {
  state = {
    someOtherProp: false,
    someProp: true,
  };

  render() {
    const { render } = this.props;
    const { someOtherProp, someProp } = this.state;

    return render({ someOtherProp, someProp });
  }
};

export default MyRenderCallbackComponent;

/**
 * Example Usage:
 *
 * <MyRenderCallbackComponent
 *   render={({ someOtherProp, someProp }) => (
 *     <div>
 *       <div>someOtherProp: {someOtherProp}</div>
 *       <div>someProp: {someProp}</div>
 *     </div>
 *   )}
 * />
 **/`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        The 2 methods are nearly identical, but in the latter case, you simply don't bother using the <Highlight>children</Highlight> prop at all, and instead, use the <Highlight>render</Highlight> prop, which again, is expected to be a function. It will receive some injected parameters that give it handles into the parent component's behaviors, and decide how to render itself. There's not really anything special about the <Highlight>children</Highlight> prop that sets it apart from using any other prop name for this purpose, except that React automatically assigns anything passed between opening and closing component tags as the <Highlight>children</Highlight> prop. You can write your components however you want, as long as your consumers know how to use them.
      </div>
      <div className="mt-4 text-justify">
        Now that you've seen just how useful and how powerful render callbacks can be in the right situations, it's time to write your own. In this exercise, you'll be given a component that renders a page of data at a time, and you'll be writing a <Highlight>PaginatedList</Highlight> component that will supply parameters for the current page of data, along with callback functions to jump to the first, previous, last, and next pages in the data set. You can make the pagination controls look however you want, whether it's by using anchor tags around <Highlight>&lt;</Highlight>, <Highlight>&lt;&lt;</Highlight>, <Highlight>&gt;&gt;</Highlight>, and <Highlight>&gt;</Highlight> characters, or buttons that read <Highlight>First</Highlight>, <Highlight>Previous</Highlight>, <Highlight>Next</Highlight>, <Highlight>Last</Highlight>, or anything else you can think of. When you're ready to give it a shot, open the project's <FilePath>src/lessons/render-callbacks/exercise.js</FilePath> file and start seeing what you can do to implement your own customizeable pagination controls via a render callback.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="render-callbacks" />
    </Lesson>
  );
};

export default RenderCallbacksLesson;
