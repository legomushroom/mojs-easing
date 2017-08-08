import pow from 'mojs-pow-easing';
import { path } from './path.babel.js';

const CONSOLE_NAME = ':mojs :';
const DEFAULT_EASING = ['sin', 'out'];
const DEFAULT_EASING_STRING = DEFAULT_EASING.join('.');

/**
 * `easing` - object that holds all easing avaliable in `mojs`.
 */
const easing = {
  /**
   * `Linear` easing, also `null` or `id` easing - simply returns whatever
   * passed to the function.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  linear: { none: k => k },

  /**
   * `Sin` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  sin: {
    in: (k) => { return 1 - Math.cos((k * Math.PI) / 2); },
    out: (k) => { return Math.sin((k * Math.PI) / 2); },
    inout: (k) => { return 0.5 * (1 - Math.cos(Math.PI * k)); },
  },

  pow,
  path,
  
  /**
   * parseEasing - function to parse all easing values to a function.
   *
   * @param  {String, Function, Array} Easing representation.
   * @return {Function} Parsed Easing.
   */
  parseEasing(ease = DEFAULT_EASING_STRING) {
    const type = typeof ease;

    switch (type) {
      case 'function': {
        return ease;
      }
      case 'string': {
        // path easing
        if (ease[0].toLowerCase() === 'm') {
          return path(ease);
        }

        ease = ease.toLowerCase().split('.');
        const easeParent = easing[ease[0]];

        if (!easeParent) {
          console.error(`${CONSOLE_NAME} Easing with name "${ease[0]}" wasn't found, fallback to "${DEFAULT_EASING_STRING}" instead.`, easing); // eslint-disable-line no-console

          return easing[DEFAULT_EASING[0]][DEFAULT_EASING[1]];
        }
        return easeParent[ease[1]];
      }
      default:
        console.error(`${CONSOLE_NAME} Only strings and function supported atm.`, ease); // eslint-disable-line no-console
    }
  }
};

export default easing;
