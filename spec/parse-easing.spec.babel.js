import easing from '../src/easing.babel.js';

describe('parse-easing ->', function() {
  it('should parse function easing', function() {
    var fun;
    fun = function() {};
    expect(easing.parseEasing(fun)).toBe(fun);
    expect(typeof easing.parseEasing(fun)).toBe('function');
  });
  it('should parse null/undefined to liner.none', function() {
    var fun;
    fun = easing.parseEasing();
    expect(fun).toBe(easing.sin.out);
  });
  describe('easing name option ->', function() {
    it('should parse string easing', function() {
      expect(easing.parseEasing('sin.in')).toBe(easing.sin.in);
    });
    it('should error if easing was not found and fallback to linear one', function() {
      var fun;
      spyOn(console, 'error');
      fun = easing.parseEasing('sinusoidal.in');
      expect(console.error).toHaveBeenCalled();
      expect(typeof console.error.calls.mostRecent().args[0]).toBe('string');
      expect(console.error.calls.mostRecent().args[1]).toBe(easing);
      expect(fun).toBe(easing.sin.out);
    });

    describe('SVG path option ->', function() {
      it('should parse SVG path easing', function() {
        expect(typeof easing.parseEasing('M0,100 L100,0')).toBe('function');
      });
    });
  });
});
