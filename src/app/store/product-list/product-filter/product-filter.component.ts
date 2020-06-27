import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoggingService } from 'src/app/shared/services/logging.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  @Output() searchSubmit = new EventEmitter<string>();

  searchValue = '';
  constructor(private logService: LoggingService) { }

  ngOnInit(): void {
  }

  search() {
    this.searchSubmit.emit(this.searchValue);
  }
}
