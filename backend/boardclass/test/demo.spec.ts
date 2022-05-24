import test from 'japa'

test.group('Demo Tests', () => {
  test('sum 2+2', (assert) => {
    assert.deepEqual(2 + 2, 4)
  })
})
