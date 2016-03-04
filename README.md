Replace jQuery with Angular
Your clientside will be refactored to use Angular. This means all your DOM manipulation will be changed to use Angular data binding and ng-repeats for display. Event listeners will have to change to ng-click or other Angular ngEvents.

Use a controller for this.

AJAX Factory
Move all of your AJAX calls to go through an Angular Factory. This will be great practice!

Replace POSTGRES with MongoDB
Move your data storage to MongoDB and use Mongoose to interact with your database. Use a Schema and Model to define your Task object.