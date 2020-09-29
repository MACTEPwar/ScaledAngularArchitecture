import { Component, OnInit } from '@angular/core';
import { CudItableService } from '../../../services/interfaces/cud-itable.service';

@Component({
  selector: 'al-delete-default-container',
  templateUrl: './delete-default-container.component.html',
  styleUrls: ['./delete-default-container.component.scss']
})
export class DeleteDefaultContainerComponent implements OnInit {

  service: CudItableService;
  containerRef: any;
  // TODO: может быть массив, когда бэк сделает
  keys: string;
  onDeleted: () => void;

  constructor() { }

  ngOnInit(): void {
    console.log('delete keys -------->', this.keys);
  }

  close(): void {
    this.containerRef.clear();
  }

  delete(): void {
    this.service.deleteItem(this.keys).pipe().subscribe(res => {
      this.containerRef.clear();
      this.onDeleted.call(null);
    });
  }

}
