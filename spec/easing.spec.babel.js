import easing from '../src/easing.babel.js';

describe('easing ->', function() {
  describe('Linear ->', function() {
    it('should have None', function() {
      expect(easing.linear.none(.5)).toBe(.5);
    });
  });
  describe('sin ->', function() {
    it('should have In', function() {
      expect(easing.sin["in"](.5)).toBe(1 - Math.cos(.5 * Math.PI / 2));
    });
    it('should have Out', function() {
      expect(easing.sin.out(.5)).toBe(Math.sin(.5 * Math.PI / 2));
    });
    it('should have InOut', function() {
      var result = 0.5 * (1 - Math.cos(Math.PI * .5));
      expect(easing.sin.inout(.5)).toBe(result);
    });
  });

  describe('pow ->', function() {
    it('should create easing functions', function() {
      const newEasing = easing.pow(3);
      expect(typeof newEasing.in).toBe('function');
      expect(typeof newEasing.out).toBe('function');
      expect(typeof newEasing.inout).toBe('function');
    });
  });

  describe('path ->', function() {
    it('should create easing functions', function() {
      const newEasing = easing.path('M0,100 L100, 0');

      expect(newEasing(.5)).toBeCloseTo(.5);
    });
  });
});
