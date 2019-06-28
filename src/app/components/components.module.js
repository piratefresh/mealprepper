import { auth } from './auth/auth.module';
import { mealprep } from './mealprep/mealprep.module';

export const components = angular
  .module('components', [
    auth,
    mealprep
  ])
  .name;