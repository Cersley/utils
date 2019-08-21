import Registry from './registry';

describe('Registry module', () => {
  it('should initialized with correct data', () => {
    const config = {
      key: 'value',
      key1: {
        key2: 'value2',
      },
    };

    const registry = new Registry(config);

    expect(registry.get()).toBe(config);
    expect(registry.get('key')).toBe('value');
    expect(registry.get('k.i.l.l')).toBe(undefined);
    expect(registry.get('key1.key2')).toBe('value2');
    expect(registry.get('key1.key2', null)).toBe('value2');
    expect(registry.get('key1.key3', null)).toBe(null);
    expect(registry.get('key1.key3.key5')).toBe(undefined);
  });

  it('should correct set data to registry', () => {
    const registry = new Registry({
      testKey: 1,
    });

    registry.set('key', 'value');
    registry.set('key1.subKey1.subKey2', 'value');

    expect(registry.get()).toEqual({
      testKey: 1,
      key: 'value',
      key1: {
        subKey1: {
          subKey2: 'value',
        },
      },
    });
  });
});
