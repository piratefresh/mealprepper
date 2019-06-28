import templateUrl from './mealprep-new.html';

export const mealprepNewComponent = {
  templateUrl,
  controller: class ContactNewComponent {
    constructor(MealPrepService, $state) {
      'ngInject';

      this.mealprepService = MealPrepService;
      this.$state = $state;
    }
    $onInit() {
      this.mealprep = {
        name: '',
        email: '',
        job: '',
        location: '',
        social: {
          facebook: '',
          github: '',
          twitter: '',
          linkedin: '',
        },
        tag: 'none',
      };
    }
    createNewMealPrep(event) {
      return this.mealprepService
        .createNewMealPrep(event.mealprep)
        .then((mealprep) => {
          this.$state.go('mealprep', {
            id: mealprep.key,
          });
        });
    }
  },
};

