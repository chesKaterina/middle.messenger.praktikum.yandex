import Router from './Router'
import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';
import template from '../components/button/Button.hbs'

describe('Router', () => {

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  }

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as any;

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });
  it('should render a page on start', () => {
    Router.use('/', BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });
  describe('add', () => {
    it('should add route', () => {
      Router.use('/', BlockMock).use('/home', BlockMock).start;

      expect(Router.routes.length).eq(4);
    });
  });
  describe('go', () => {
    it('should change history and content on go', () => {
      Router.use('/', BlockMock).use('/home', BlockMock).go('/home');

      expect(window.history.length).to.equal(2);
    });
  });
  describe('back', () => {
    it('should render a page on history back action', () => {
      const spy = sinon.spy(window.history, 'back');

      Router.use('/', BlockMock).start;
      Router.back();

      expect(spy.calledOnce).true;
    });
  });
  describe('forward', () => {
    it('should render a page on history forward action', () => {
      const spy = sinon.spy(window.history, 'forward');

      Router.use('/', BlockMock).start;
      Router.forward();

      expect(spy.calledOnce).true;
    });
  });


});
