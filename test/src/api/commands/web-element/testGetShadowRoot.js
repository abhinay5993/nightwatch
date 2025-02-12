const assert = require('assert');
const {WebElement} = require('selenium-webdriver');
const {ShadowRoot} = require('selenium-webdriver/lib/webdriver');
const MockServer  = require('../../../../lib/mockserver.js');
const CommandGlobals = require('../../../../lib/globals/commands-w3c.js');
const common = require('../../../../common.js');
const Element = common.require('element/index.js');

describe('element().getShadowRoot() command', function () {
  before(function (done) {
    CommandGlobals.beforeEach.call(this, done);
  });

  after(function (done) {
    CommandGlobals.afterEach.call(this, done);
  });

  it('test .element().getShadowRoot()', async function() {
    MockServer.addMock({
      url: '/session/13521-10219-202/execute/sync',
      method: 'POST',
      response: JSON.stringify({
        value: {
          'shadow-6066-11e4-a52e-4f735466cecf': '9'
        }
      })
    }, true);

    const resultPromise = this.client.api.element('#signupSection').getShadowRoot();
    assert.strictEqual(resultPromise instanceof Element, false);
    assert.strictEqual(resultPromise instanceof Promise, true);
    assert.strictEqual(typeof resultPromise.find, 'function');
    assert.strictEqual(typeof resultPromise.getValue, 'function');

    const result = await resultPromise;
    assert.ok(result instanceof ShadowRoot);
    assert.strictEqual(result.getId(), '9');
  });

  it('test .element().find().getShadowRoot()', async function() {
    MockServer.addMock({
      url: '/session/13521-10219-202/execute/sync',
      method: 'POST',
      response: JSON.stringify({
        value: {
          'shadow-6066-11e4-a52e-4f735466cecf': '10'
        }
      })
    }, true);

    const resultPromise = this.client.api.element('#signupSection').find('#helpBtn').getShadowRoot('type');
    assert.strictEqual(resultPromise instanceof Element, false);
    assert.strictEqual(resultPromise instanceof Promise, true);
    assert.strictEqual(typeof resultPromise.find, 'function');
    assert.strictEqual(typeof resultPromise.getValue, 'function');

    const result = await resultPromise;
    assert.ok(result instanceof ShadowRoot);
    assert.strictEqual(result.getId(), '10');
  });

  it('test .element.find().getShadowRoot()', async function() {
    MockServer.addMock({
      url: '/session/13521-10219-202/execute/sync',
      method: 'POST',
      response: JSON.stringify({
        value: {
          'shadow-6066-11e4-a52e-4f735466cecf': '9'
        }
      })
    }, true);

    const resultPromise = this.client.api.element.find('#signupSection').getShadowRoot('type');
    assert.strictEqual(resultPromise instanceof Element, false);
    assert.strictEqual(resultPromise instanceof Promise, true);
    assert.strictEqual(typeof resultPromise.find, 'function');
    assert.strictEqual(typeof resultPromise.getValue, 'function');

    const result = await resultPromise;
    assert.ok(result instanceof ShadowRoot);
    assert.strictEqual(result.getId(), '9');
  });
});
