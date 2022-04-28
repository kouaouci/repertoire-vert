import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByRegion",
})
export class filterByRegion implements PipeTransform {
  transform(items: any, select?: any): any {
    if (select !== "All") {
      return select
        ? items.filter(
            (item: { productSeller: any }) => item.productSeller === select
          )
        : items;
    } else {
      return items;
    }
  }
}
