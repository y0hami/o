// npm
import circleAssign from 'circle-assign';


/**
 * Merge all sources into the target with the most right source
 * having the most priority
 *
 * Uses circle-assign
 * @see https://www.npmjs.com/package/circle-assign
 *
 * @param {object} target The target object
 * @param {...object} sources The sources
 *
 * @returns {object} The merged object
 */
function merge(target, ...sources) {
  return circleAssign.apply(null, [target, ...sources]);
}

export default merge;
