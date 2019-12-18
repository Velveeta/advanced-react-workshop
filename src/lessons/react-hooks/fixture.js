const getItemNumber = (outerIndex, innerIndex) => ((outerIndex * 3) + innerIndex) + 1;
const isActive = (outerIndex, innerIndex) => getItemNumber(outerIndex, innerIndex) % 2 === 0;

export default (new Array(3)).fill(true).map((_, outerIndex) => (
  (new Array(3)).fill(true).map((_, innerIndex) => ({
    className: `fixture-cell${(isActive(outerIndex, innerIndex) ? ' mouse-over-me' : '')}`,
    content: `This is the box for item ${getItemNumber(outerIndex, innerIndex)}.`,
    isActive: isActive(outerIndex, innerIndex),
  }))
));
