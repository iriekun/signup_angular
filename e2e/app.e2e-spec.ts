import { SignupPage } from './app.po';

describe('signup App', () => {
  let page: SignupPage;

  beforeEach(() => {
    page = new SignupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
