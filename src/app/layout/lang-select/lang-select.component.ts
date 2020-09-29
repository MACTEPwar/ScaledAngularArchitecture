import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'al-lang-select',
  templateUrl: './lang-select.component.html',
  styleUrls: ['./lang-select.component.scss']
})
export class LangSelectComponent implements OnInit {

  checked: boolean;
  lang: SelectItem[];

  selectedLang: string;

  constructor(private translate: TranslateService) {
    this.lang = [
      { label: 'RU', value: 'ru' },
      { label: 'UA', value: 'uk' },
    ];
    this.selectedLang = environment.defaultLocale;
  }
  ngOnInit(): void {}

  checkLang(): void {
    this.translate.use(
      (environment.defaultLocale = this.selectedLang.toLowerCase())
    );
  }
}
