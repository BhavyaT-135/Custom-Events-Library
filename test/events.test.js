const Events = require('../src/lib/Events.js');

test('on and trigger', () => {
  const events = new Events();

  const callback1 = jest.fn();
  const callback2 = jest.fn();

  events.on('event1', callback1);
  events.on('event2', callback2);

  events.trigger('event1');
  expect(callback1).toHaveBeenCalled();
  expect(callback2).not.toHaveBeenCalled();

  events.trigger('event2');
  expect(callback1).toHaveBeenCalled();
  expect(callback2).toHaveBeenCalled();
});

test('off', () => {
  const events = new Events();

  const callback1 = jest.fn();
  const callback2 = jest.fn();

  events.on('event', callback1);
  events.on('event', callback2);

  events.off('event');

  events.trigger('event');
  expect(callback1).not.toHaveBeenCalled();
  expect(callback2).not.toHaveBeenCalled();
});