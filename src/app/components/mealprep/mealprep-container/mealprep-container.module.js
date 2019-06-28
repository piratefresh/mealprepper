import { mealprepContentComponent } from './mealprep-container.component';
import './contact-detail.scss';

export const mealprepContainer = angular
  .module('components.mealprep.mealprep-container', [])
  .component('contactDetail', mealprepContentComponent)
  .name;