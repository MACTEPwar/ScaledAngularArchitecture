import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { faTh, faThList } from '@fortawesome/pro-duotone-svg-icons';
import { faTimes, faChevronLeft, faChevronRight, faSignOutAlt } from '@fortawesome/pro-light-svg-icons';
import { TreeNode as TNode } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { ITab } from '@features/tab/types/interface/i-tab';
import { ITabService } from '@features/tab/service/intefaces/i-tab.service';
// import { TopTab } from '../../../shared/top-tab/models/top-tab';
// import { tabService } from '../../../shared/top-tab/top-tab.service';
import { MainMenuService } from '@core/main-menu/services/concrete/main-menu.service';
import { IMainMenu } from '@core/main-menu/types/interfaces/i-main-menu';
import { BehaviorSubject } from 'rxjs';
// import { AuthenticationService } from '@core/authentication/services/concrete/authentication.service';

@Component({
  selector: 'al-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public menu: IMainMenu[] = [];
  // public tabs: BehaviorSubject<Array<ITab>>;
  public tabs: Array<ITab> = new Array<ITab>();
  public myMenu: TNode[] = [];
  public displaySidebar = false;

  imagePath = environment.imagePath;

  @ViewChild('scrollPanel', { read: ElementRef })
  scrollPanel: ElementRef;
  @ViewChild('scrollTabItems')
  scrollTabItems: ElementRef;

  scrollPanelMoveStep = 300;

  constructor(
    private mainmenuService: MainMenuService,
    @Inject('ITabService') private tabService: ITabService,
    private router: Router,
  ) {
    // this.tabs = new BehaviorSubject<Array<ITab>>(this.tabService.tabList);
    // this.tabs.subscribe(
    //   s => this.tabService.tabList = s
    // );
    this.tabService.tabList.subscribe(tabs => {
      this.tabs = tabs;
    });
  }

  nodeSelect(e: any): void {
    if (
      !((e.node as TNode).children && (e.node as TNode).children.length > 0)
    ) {
      this.router.navigate([(e.node as TNode).data]);
      this.displaySidebar = false;
    }
  }

  menu2TNode(menu: IMainMenu, parent: TNode): TNode {
    const res: TNode = {};
    res.label = menu.name;
    res.data = menu.url;
    res.parent = parent;
    const level = menu.level;
    const last = !(menu.children && menu.children.length > 0);
    if (!last && level === 1) {
      res.styleClass = 'menuTreeCatTitle';
      res.children = menu.children.map((m) => this.menu2TNode(m, menu));
    } else if (level === 2) {
      res.icon = menu.image;
      res.type = 'picture';
      res.children = menu.children.map((m) => this.menu2TNode(m, menu));
    } else if (level === 3) {
      res.styleClass = 'lastMenuLevel';
    } else {
      res.icon = menu.image;
      res.type = 'picture';
    }
    // console.log('----->', menu);
    return res;
  }

  ngOnInit(): void {
    this.loadMenu();
    // this.loadTabs();
  }

  private loadMenu(): void {
    this.mainmenuService
      .getMenu()
      .pipe()
      .subscribe((menu: IMainMenu[]) => {
        this.myMenu = menu.map((m) => this.menu2TNode(m, null));
      });
  }

  // private loadTabs(): void {
  //   this.topTabs = this.tabService.getTabs();
  // }

  closeTab(event: Event, index: number): void {
    if (this.tabs[index].active) {
      if (this.tabs.length > 1) {
        this.clickTab(this.tabs[index - 1] || this.tabs[1]);
      } else {
        this.clickDashboard();
      }
    }
    this.tabService.dropTab(index);
    // this.refreshTabs();
    event.stopPropagation();
  }

  // refreshTabs(): void{
  //   this.tabs = this.tabService.tabList;
  // }

  clickTab(tab: ITab): void {
    console.log('CLICK TAB -->', tab);
    this.tabService.activateTab(tab);
    this.router.navigate([tab.url]);
  }

  clickDashboard(): void {
    this.tabService.disactivateAllTabs();
    this.router.navigate(['dashboard']);
  }

  logout(): void {
    // this.authService.logout();
  }

  onScrollTabsUp(event = null): void {
    this.moveScrollPanel(true);
  }

  onScrollTabsDown(event = null): void {
    this.moveScrollPanel(false);
  }

  moveScrollPanel(mode: boolean): void {
    const element = this.scrollPanel.nativeElement.querySelectorAll('.ui-scrollpanel-content')[0];
    if (element) {
      if (mode) {
        element.scrollLeft = element.scrollLeft < this.scrollPanelMoveStep ? 0 : element.scrollLeft - this.scrollPanelMoveStep;
      } else {
        element.scrollLeft += this.scrollPanelMoveStep;
      }
    }
  }
}
