import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<{ [key: string]: any }>({});
  filters$: Observable<{ [key: string]: any }> =
    this.filtersSubject.asObservable();

  updateFilter(key: string, value: any): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({ ...currentFilters, [key]: value });
  }

  removeFilter(key: string): void {
    const currentFilters = this.filtersSubject.value;
    delete currentFilters[key];
    this.filtersSubject.next({ ...currentFilters });
  }

  clearFilters(): void {
    this.filtersSubject.next({});
  }

  applyFilters(
    items: any[],
    filterFunctions: { [key: string]: (item: any, filterValue: any) => boolean }
  ): any[] {
    const currentFilters = this.filtersSubject.value;
    return items.filter((item) =>
      Object.keys(currentFilters).every((key) =>
        filterFunctions[key]
          ? filterFunctions[key](item, currentFilters[key])
          : true
      )
    );
  }
}
