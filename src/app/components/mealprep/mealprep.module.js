import {MealPrepService} from './mealprep.service';
import { mealprepNew } from './mealprep-new/mealprep-new.module';

export const mealprep = angular
  .module('components.mealprep', [
    mealprepNew,
  ])
  .service('MealPrepService', MealPrepService)
  .name;