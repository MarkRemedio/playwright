###
There are many different actors in these use cases. Users refer to a user that is any actor. Admins have admin permissions, Others will be referred by the permissions hey hold.

## Login

## reset password

## Organization UI Checks
- [] As an Organization user, on every page, I can see the top admin navbar
- [] As an Organization user, on every page, I can open the sidenav menu 
- [] As an Organization user, on every page, I can see the Home, Document Library links, and Logout button
- [] As an Organization user with People Permission, on every page, I can see the People Nav Item
- [] As an Organization Admin, on every page, I can see the settings Nav Item

## Organization administration stories
- [] As an Organization admin, I can update my organization information
- [] As an Organization admin, I can set the organization icon
- [] As an Organization admin, I can create security profiles
- [-] As an Organization admin, I can create user Roles
- [-] As an Organization admin, I can create user Notification schemas
... SO MANY TO BE DONE HERE

## Organization user stories
- [] As an organization admin, I can add user to my organization
- [] As an Organization admin, I can update a org users information
- [] As an Organization admin, I can set an org users supervisor
- [] As an Organization admin, I can remove an org users supervisor
- [] As an Organization admin, I can deactivate an org user
- [] As an Organization admin, I can set an org user to ba an admin
- [] As an Organization admin, I can set an org user to be have Read permissions at the organization level
- [] As an Organization admin, I can set an org user to be have People Management Permissions
- [] As an Organization admin, I can set an org user to be have a specific role
- [] As an Organization admin, I can see a persons permissions
- [] As an Organization people management permission, I cannot see the persons permissions
- [] As an Organization admin / people management permission, I can search though the people at the organization level
- [] As an Organization admin / people management permission, I can paginate though all of the users
- [] As an Organization admin / people management permission, I filter down to active users
- [] As an Organization admin / people management permission, I filter down to users within a specific city
- [] As an Organization admin / people management permission, I drill down and see a persons details
- [] As an Organization admin / people management permission

## Organization Client Management stories
- [] As an Organization admin, I can create a tenant
- [] As an Organization admin, I can edit a tenant within the organization view
- [] As an Organization admin, I can upload a tenant Icon

## Client User Stories
- [] As a Client User, on every page, I can navigate to the document Library
- [] As a Client User, on every page, I can navigate to my user page (dropdown from user icon top right)
- [] As a Client User, on every page, I can navigate to the Home page
- [] As a Client User, on every page, I can navigate to the Forms library
- [] As a Client User, I can see the Home screen
- [] As a Client User, I can see the side nav and toggle it open and closed
- [] As a Client User, create a task from the header (if there is any configured)
- [] As a Client Admin or a User with #PERMISSION#, I can navigate to the todo list (side nav)

### Client user Home screen
- [] As a Client User, on the home screen i can see my forms
- [] As a Client User, on the home screen i can navigate to the forms library
- [] As a Client User, on the home screen i can see my corrective actions
- [] As a Client User, on the home screen i can see my training records (all that need to be completed)
- [] As a Client User, on the home screen i can navigate to my training records page
- [] As a Client User, on the home screen i can navigate to document library
- [] As a Client User, on the home screen i can navigate to my form / training history (todo list with filter)
- [-] As an Client User, on the hame screen i can see my document sign-offs 
- [] As an Client User with subordinates, I can see the Home screen, and their subordinates active todo's
- [] As an Client User with query_user permission, I can see the Home screen, and select people to add to their home screen

### Client user To-Do screen
- [] As a Client Admin or a User with Query_People permission, I can navigate to the todo list (side nav)
- [] As a Client Admin or a User with Query_People permission, I can filter to training, form, or task
- [] As a Client Admin or a User with Query_People permission, I can filter to people view
- [] As a Client User with Subordinates, I can filter to to only my subordinates
- [] As a Client Admin or a User with Query_People permission, I can click and view form
- [] As a Client Admin or a User with Query_People permission, I can click and view trainings
- [] As a Client Admin or a User with Query_People permission, I can click and view tasks
- [] As a Client Admin or a User with Query_People permission, can search with text ***
- [] As a Client Admin or a User with Query_People permission, can view historical items

### Client form library screens
- [] As a Client User, I can view published forms
- [] As a Client User, I search for form libraries
- [] As a Client Admin or a User with Manage_Forms permission, I can view unpublished forms
- [] As a Client Admin or a User with Manage_Forms permission, I can navigate to the edit form page
- [] As a Client Admin or a User with Manage_Forms permission, I can create a form
- [] As a Client Admin or a User with Manage_Forms permission, I can view active Forms tab
- [] As a Client Admin or a User with Manage_Forms permission, I can view form submissions tab
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form submissions
- [] As a Client Admin or a User with Manage_Forms permission, I can filter down to forms of a specific version and the columns should update (see form data)
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form date data
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form number data
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form user data
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form string data
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form select options data
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form Inspection questions data
- [] As a Client Admin or a User with Manage_Forms permission, I can filter form by state
- [] As a Client Admin or a User with Manage_Forms, *** SEE EDIT DOCUMENT ***

### Client document library screen
- [] As a Client User, I can view documents and folders that are published
- [] As a Client Admin or a User with Manage_Documents permission, I can view unpubished documents
- [] As a Client Admin or a User with Manage_Documents permission, I can un publish a document (hide)
- [] As a Client Admin or a User with Manage_Documents permission, I can create a document
- [] As a Client Admin or a User with Manage_Documents permission, I can create a folder (deprecated)
- [] As a Client Admin or a User with Manage_Documents permission, I can duplicate a document
- [] As a Client Admin or a User with Manage_Documents permission, I can edit a document
- [] As a Client Admin or a User with Manage_Documents permission, I can delete a document
- [] As a Client Admin or a User with Manage_Documents permission, I can delete a folder
- [] As a Client Admin or a User with Manage_Documents permission, I can rename folder or document
- [] As a Client Admin or a User with Manage_Documents permission, *** SEE EDIT DOCUMENT ***

### Client people management screen
- [] As a Client Admin or a User with Manage_People permissions, I can view people query page (tab)
- [] As a Client Admin or a User with Manage_People permissions, I can view the training matrix page (tab)
- [] As a Client Admin or a User with Manage_People permissions, I can view the current training page (tab)
- [] As a Client Admin, I can view the current certs history page (tab)
- [] As a Client Admin, I can view the audit user (tab)

- [] As a Client Admin or a User with Manage_People permissions, on the people page, I can filter by active / inactive users 
- [] As a Client Admin or a User with Manage_People permissions, on the people page, I can filter by city, role, and removed roles 
- [] As a Client Admin or a User with Manage_People permissions, on the people page, I can filter by search text 
- [] As a Client Admin or a User with Manage_People permissions, on the people page, I can add a new user 
- [] As a Client Admin or a User with Manage_People permissions, on the training matrix page (tab), I can see the roles and training types
- [] As a Client Admin or a User with Manage_People permissions, on the training matrix page (tab), I can add a training type
- [] As a Client Admin or a User with Manage_People permissions, on the training matrix page (tab), I can add a role
- [] As a Client Admin or a User with Manage_People permissions, on the training matrix page (tab), I can change role => training requirement from unchecked, to required, to mandatory

- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), I should be able to see all users (paginated)
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), Mandatory trainings (expried, or missing) should be red
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), recomened trainings (expride or missing) should be yellow
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), training items coming due, that are mandatory, should have a red badge with experation time in it
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), training items coming due, that are recommened, should have a yellow badge with experation time in it
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), I would be able to hide columns
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), I should be able to view training by clicking on pill
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), I should be able to edit training by clicking on pill
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), I should be able to replace (add new) training by clicking on pill
- [] As a Client Admin or a User with Manage_People permissions, on the current training page (tab), I should be able to sort columns (training)

### Client Admin screen
- [] As a Client Admin, I can navigate to view the administrators page
- [] As a Client Admin, I should be able to edit my company information

- [] As a Client Admin, I can navigate to the system settings page
- [] As a Client Admin, on the system settings page, I should be able to enable / disable system notifications

- [] As a Client Admin, I can navigate to the security profiles page
- [] As a Client Admin, on the security profiles page, I can add a new security profile

- [] As a Client Admin, I can navigate to the permissions page
- [] As a Client Admin, I can navigate to the users page
- [] As a Client Admin, on the users page, I can see removed users
- [] As a Client Admin, on the users page, I can permanently delete a user
- [] As a Client Admin, on the users page, I can restore a removed user

- [] As a Client Admin, I can navigate to the roles page
- [] As a Client Admin, on the roles page, I can see all of the roles of the client
- [] As a Client Admin, on the roles page, I can add a new role
- [] As a Client Admin, on the roles page, I can edit a role
- [] As a Client Admin, on the roles page, I can remove a role

- [] As a Client Admin, I can navigate to the training types page
- [] As a Client Admin, on the trainings types page, I can see all of the configured training types
- [] As a Client Admin, on the trainings types page, I can navigate to the edit training type page
- [] As a Client Admin, on the trainings types page, I can build / publish a training type
- [] As a Client Admin, on the trainings types page, I can see training types that have updated dependencies
- [] As a Client Admin, on the trainings types page, I can remove training types

- [] As a Client Admin, I can navigate to the tasks type page
- [] As a Client Admin, on the tasks types page, I can see all of the configured task types
- [] As a Client Admin, on the tasks types page, I can navigate to the edit task type page
- [] As a Client Admin, on the tasks types page, I can build / publish a task type
- [] As a Client Admin, on the tasks types page, I can see task types that have updated dependencies
- [] As a Client Admin, on the tasks types page, I can remove task types

- [] As a Client Admin, I can navigate to the custom fields page
- [] As a Client Admin, on custom fields page, I can create  a new custom field
- [] As a Client Admin, on custom fields page, I can edit a custom field
- [] As a Client Admin, on custom fields page, I can remove a custom field
- [] As a Client Admin, on custom fields page, I cannot remove a system field

- [] As a Client Admin, I can navigate to the field groups page
- [] As a Client Admin, on custom field groups page, I can create a new field group
- [] As a Client Admin, on custom field groups page, I navigate to the edit field group page
- [] As a Client Admin, on custom field groups page, I can remove a field group (if its unused)
- [] As a Client Admin, on custom field groups page, I can build a field group

- [] As a Client Admin, I can navigate to the notifications config page
- [] As a Client Admin, on notification page, I can create a new notification config
- [] As a Client Admin, on notification page, I can edit a notification config
- [] As a Client Admin, on notification page, I can remove a notification config

## Form Viewer

## Document Editor

## Fill Form

## Fill Training

## Fill Task


## Workflow

## Form Builder
