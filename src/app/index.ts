import { PageHolder } from './abstract.classes';
import { CartConfigurePage } from './pages/cart_configure/CartConfigurePage';
import { CartReviewPage } from './pages/cart_review/CartReviewPage';
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/store/StorePage';

export class Application extends PageHolder {
  public readonly homePage = new HomePage(this.page);

  public readonly storePage = new StorePage(this.page);

  public readonly cartConfigurePage = new CartConfigurePage(this.page);

  public readonly cartReviewPage = new CartReviewPage(this.page);
}
