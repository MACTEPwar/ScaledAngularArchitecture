import { Component, OnInit, QueryList, ViewContainerRef, ViewChildren } from '@angular/core';
import { IMainMenu } from '@core/main-menu/types/interfaces/i-main-menu';
import { MainMenuService } from '@core/main-menu/services/concrete/main-menu.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'al-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: IMainMenu[];
  currentDraggableItem: IMainMenu = null;

  selectedItem: any;
  @ViewChildren('plitka')
  plitkaArray: QueryList<ViewContainerRef>;

  onPlitkaCkick(event: any): void {
    this.plitkaArray.forEach(f => {
      if ((f as any)?.selectedItem?.id !== event?.id){
        (f as any)?.hideTreeNode();
      }
    });
    this.selectedItem = event;
  }

  constructor(
    private helpers: MainMenuService,
    private translateService: TranslateService
  ) {}

  // TODO локализация фейкового меню
  xxx(arr): any {
    arr.forEach((item) => {
      if (item.children && item.children.length > 0) {
        this.xxx(item.children);
      }
      return this.trans(item);
    });
  }
  async trans(item): Promise<any> {
    const s = await this.getProducts(item);
    item.name = s;
    return item;
  }
  async getProducts(item): Promise<any> {
    return this.translateService.get('MENU.id' + item.id).toPromise();
  }

  ngOnInit(): void {
    const onLangChange: Observable<any> = this.translateService.onLangChange;
    onLangChange.subscribe((event: { LangChangeEvent }) => {
      this.getMenu();
    });

    this.getMenu();
  }

  getMenu(): void {
    this.helpers
      .getMenu()
      // TODO локализация фейкового меню
      .pipe(
        map((menu) => {
          this.xxx(menu);
          return menu;
        })
      )
      // -------
      .subscribe((menu) => {
        this.items = menu;
        console.log('MENU ----->', this.items);
      });
  }

  onDrop(event): void {
    let target = event.target.closest('al-plitka');
    if (!event.target.closest('al-plitka')) {
      target = event.target.querySelectorAll('al-plitka')[0];
    }
    this.array_move(
      this.currentDraggableItem.id,
      parseInt(target.getAttribute('data-id'), 10)
    );
    this.currentDraggableItem = null;
  }

  onDragStart(event, item): void {
    // console.log(event.target, item);
    this.currentDraggableItem = item;
  }

  array_move(idOne: number, idTwo: number): void {
    const oldIndex = this.items.findIndex((f) => f.id === idOne);
    const newIndex = this.items.findIndex((f) => f.id === idTwo);
    if (newIndex >= this.items.length) {
      let k = newIndex - this.items.length + 1;
      while (k--) {
        this.items.push(undefined);
      }
    }
    this.items.splice(newIndex, 0, this.items.splice(oldIndex, 1)[0]);
  }
}

