/**
 * Parse the path into an array of parts (object keys)
 *
 * @param {string} path The path to parse
 *
 * @returns {string[]} An array of parts
 */
function getPathParts(path) {
  // split the path specified into an array on `.`
  const pathParts = path.split('.');

  // create an empty array which will be the result
  const parts = [];

  // create an index variable so we can skip indexes if
  // need be when parsing the paths
  let index = 0;

  // while the index is smaller then the parts array length
  while (index < pathParts.length) {
    // get the part from the parts array
    let parsedPart = pathParts[index];

    // while (if) the part starts with `\` remove it and
    // append `.` and then next part from the array to it
    // this should result in `test\\.test` being parsed
    // into `test.test`. This is done so users can escape
    // dots from the dot notation
    while (parsedPart[parsedPart.length - 1] === '\\'
    && pathParts[index + 1] !== undefined
    && pathParts[index + 1] !== null) {
      // remove `\` and append the `.`
      parsedPart = `${parsedPart.slice(0, -1)}.`;
      // increase the index so next iteration it will skip
      // the next path which is about to be added to this path
      index += 1;
      // add the next path to the current one because they are
      // apart of the same object key
      parsedPart += pathParts[index];
    }

    // increase the index so we can continue to the next path
    // in the array
    index += 1;

    // append the parsed path to the results array
    parts.push(parsedPart);
  }

  // return all the parsed paths
  return parts;
}

export default getPathParts;
