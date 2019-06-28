import templateUrl from './mealprep-container.html';

export const mealprepContentComponent = {
  bindings: {
    contact: '<',
    onSave: '&',
    onUpdate: '&',
    onDelete: '&',
  },
  templateUrl,
  controller: class MealPrepContainerComponent {
    constructor() {
      'ngInject';
    }
    $onInit() {
      this.isNewContact = !this.contact.$id;
    }
    saveContact() {
      this.onSave({
        $event: {
          contact: this.contact,
        },
      });
    }
    updateContact() {
      this.onUpdate({
        $event: {
          contact: this.contact,
        },
      });
    }
    deleteContact() {
      this.onDelete({
        $event: {
          contact: this.contact,
        },
      });
    }
    tagChange(event) {
      this.contact.tag = event.tag;
      this.updateContact();
    }
  },
};