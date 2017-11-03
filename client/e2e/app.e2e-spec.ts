import { TasklistPage } from './app.po';

describe('tasklist App', () => {
  let page: TasklistPage;

  beforeEach(() => {
    page = new TasklistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
