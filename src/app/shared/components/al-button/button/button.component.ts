// tslint:disable-next-line:max-line-length
import { Component, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, Input, ContentChildren, Output, EventEmitter, QueryList, TemplateRef, Directive, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';

@Directive({
  selector: '[alButton]'
})
export class ButtonDirective implements AfterViewInit, OnDestroy {

  @Input() iconPos: 'left' | 'right' | 'top' | 'bottom' = 'left';

  // tslint:disable-next-line:variable-name
  public _label: string;

  // tslint:disable-next-line:variable-name
  public _icon: string;

  public initialized: boolean;

  // tslint:disable-next-line:variable-name
  public _initialStyleClass: string;

  constructor(public el: ElementRef) { }

  ngAfterViewInit(): void {
    this._initialStyleClass = this.el.nativeElement.className;
    DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());

    if (this.icon) {
      const iconElement = document.createElement('span');
      iconElement.className = 'p-button-icon';
      iconElement.setAttribute('aria-hidden', 'true');
      const iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
      if (iconPosClass) {
        DomHandler.addClass(iconElement, iconPosClass);
      }
      DomHandler.addMultipleClasses(iconElement, this.icon);
      this.el.nativeElement.appendChild(iconElement);
    }

    const labelElement = document.createElement('span');
    if (this.icon && !this.label) {
      labelElement.setAttribute('aria-hidden', 'true');
    }
    labelElement.className = 'p-button-label';
    labelElement.appendChild(document.createTextNode(this.label || '&nbsp;'));
    this.el.nativeElement.appendChild(labelElement);
    this.initialized = true;
  }

  getStyleClass(): string {
    let styleClass = 'p-button p-component';
    if (this.icon && !this.label) {
      styleClass = styleClass + ' p-button-icon-only';
    }

    return styleClass;
  }

  setStyleClass(): void {
    const styleClass = this.getStyleClass();
    this.el.nativeElement.className = styleClass + ' ' + this._initialStyleClass;
  }

  @Input() get label(): string {
    return this._label;
  }

  set label(val: string) {
    this._label = val;

    if (this.initialized) {
      DomHandler.findSingle(this.el.nativeElement, '.p-button-label').textContent = this._label || '&nbsp;';
      this.setStyleClass();
    }
  }

  @Input() get icon(): string {
    return this._icon;
  }

  set icon(val: string) {
    this._icon = val;

    if (this.initialized) {
      if (this.iconPos) {
        // tslint:disable-next-line:max-line-length
        DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon p-button-icon-' + this.iconPos + ' ' + this._icon;
      } else {
        DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon ' + this._icon;
      }
      this.setStyleClass();
    }
  }

  ngOnDestroy(): void {
    while (this.el.nativeElement.hasChildNodes()) {
      this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
    }

    this.initialized = false;
  }
}

@Component({
  selector: 'al-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements AfterContentInit {

  @Input() type = 'button';

  @Input() iconPos = 'left';

  @Input() icon: string;

  @Input() badge: string;

  @Input() label: string;

  @Input() disabled: boolean;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() badgeClass: string;

  contentTemplate: TemplateRef<any>;

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template;
          break;
        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }
}
