import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMainMenu } from '../../../core/main-menu/types/interfaces/i-main-menu';
import { TreeNode } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'al-menu-tile',
  templateUrl: './menu-tile.component.html',
  styleUrls: ['./menu-tile.component.scss']
})
export class MenuTileComponent implements OnInit {

  /** Эл-нт меню */
  @Input() item: IMainMenu;
  /** Количество детей в троке */
  // tslint:disable-next-line:no-inferrable-types
  @Input() itemsPreRow: number = 3;
  /** Подменю */
  childs: TreeNode[];
  /** Индекс показываемой строки детей */
  // tslint:disable-next-line:no-inferrable-types
  rowIndexDisplayedChildren?: number = -1;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClick = new EventEmitter<any>();
  @Input() incomingSelect: any;

  selectedItem: any;

  constructor(private router: Router) { }

  ngOnInit(): void { }
  /** Создает фейковый массив */
  // tslint:disable-next-line:variable-name
  createRange(number: number): number[] {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
  /** Отдает индекс эл-нта по его строке и столбцу */
  ind(i: number, j: number): number {
    return (i - 1) * this.itemsPreRow + (j - 1);
  }

  /** Получает количество строк */
  getRowCount(): number {
    return Math.ceil((this.item.children.length || 0) / this.itemsPreRow);
  }

  /** При нажатии на самый верхний элемент */
  onFirstParentClick(i: number, j: number, rowIndex: number): void {
    // console.log(i, j, rowIndex);
    this.childs = [];
    this.rowIndexDisplayedChildren = rowIndex;
    const ind = this.ind(i, j);
    if (
      !this.item.children[ind].children ||
      this.item.children[ind].children.length === 0
    ) {
      this.router.navigate([this.item.children[ind].url]);
    } else {
      this.childs = this.menuItem2TreeNodePipe(
        this.item.children[ind].children
      );
    }
    this.selectedItem = this.item.children[ind];

    if (this.incomingSelect?.id === this.selectedItem?.id) {
      this.selectedItem = null;
      this.hideTreeNode();
    }

    this.onClick.emit(this.selectedItem);
  }

  /**
   * Прячет детей
   */
  hideTreeNode(): void {
    this.childs = [];
  }

  /** При нажатии на любую ноду (от 2 уровня и выше) */
  onNodeSelect(event): void {
    if (event.node.children && event.node.children.length > 0) {
      event.node.expanded = !event.node.expanded;
    } else {
      // console.log('url -- > ', event.node.data);
      this.router.navigate(event.node.data);
    }
  }

  /** Превращает меню в дерево */
  menuItem2TreeNodePipe(value: IMainMenu[]): TreeNode[] {
    if (value) {
      const result: TreeNode[] = value.map((m) => {
        const tn: TreeNode = {
          label: m.name,
          data: m.url.split('/'),
        };

        if (m.children && m.children.length > 0) {
          tn.expandedIcon = 'pi pi-folder-open';
          tn.collapsedIcon = 'pi pi-folder';
          tn.children = this.menuItem2TreeNodePipe(m.children);
        } else {
          tn.type = 'picture';
        }

        return tn;
      });
      return result;
    } else {
      return null;
    }
  }

}
