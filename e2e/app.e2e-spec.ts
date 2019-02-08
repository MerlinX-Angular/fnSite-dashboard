import { BgsPage } from './app.po';

describe('site App', () => {
  let page: BgsPage;

  beforeEach(() => {
    page = new BgsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
