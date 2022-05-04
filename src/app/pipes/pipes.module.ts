import { filterByRegion } from './sort/filterbyRegion';
import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';


@NgModule({
	declarations: [SearchPipe,
		filterByRegion,
		],
	imports: [],
	exports: [SearchPipe,
		filterByRegion]
})
export class PipesModule {}