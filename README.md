## Overview

[Progress Report](#progress-report)

[Design and Requirement](#design-and-requirement)

[Stack used in this project](#stack-used-in-this-project)

[Importing Database](#importing-database)

[Running the Server](#running-the-server)

[Running the Client](#running-the-client)


Submission for Hilal Arsa Himawan (hilalarsa@gmail.com)

Repository available on github.com/hilalarsa/paypay

Total time elapsed : 8 hr

# Progress Report

## Admin view
- Add/remove/update/view employees (Done)
- Add/update/view performance reviews (Done)
- Assign employees to participate in another employee's performance review (In Progress)

## Employee view
- List of performance reviews requiring feedback (In Progress)
- Submit feedback (In Progress, Done via Admin)

# Design and Requirement

Initially I designed the database to include 3 table, which is Employee, Employee-Feedback, and Feedback, and decided to revert it because later found it unecessary for review to have more than 1 user,
So instead, I decided to create an id for employee who send the review as "Feedback From" and employee who receive the review as "Feedback To", this way, I can keep track with each review sender and receiver, without additional table.

ERD screenshot I ended up with is included within the submitted file.

Then I created low-fidelity design for guide on component placement and navigation. 

The ideas is to split the task into 2 role :
- Admin
    - Create page for CRUD Employee and Performance review
    - Fully integrate them with API
    - Make sure navigation between page is OK
    - Hide employee feedback from admin

- Employee
    - List and Add review / feedback

I had no intention of making login page, because of the limited time, so I created simple Menu on the AppBar to switch between roles.

# Stack used in this project

Backend
- Mysql
- Node.js
- Express Generator
- Had a plan to use ORM but decided not to because of project scope

Frontend
- NextJS 11
- SWR (Data fetching & caching)
- Material UI (Layout)
- Material Icons

# Importing Database

Database can be found as ```paypayserver.sql```

Import can be done using Import from phpmyadmin, or directly running sql script using mysql-cli

# Running the Server

Open folder paypay-server, and run :

```bash
npm install
```

Wait for the installation to finish, then run the server using :

```bash
npm start
```

Server running on PORT 3001

# Running the Client

Open folder paypay-server, and run :

```bash
npm install
```

Wait for the installation to finish, then run the server using :

```bash
npm run dev
```

Client running on PORT 3000

# Accessing the page

Once up and running, client can be accessed through ```http://localhost:3000```, and access other page through given navigation in the page.

Available Backend endpoint as follow : 

- http://localhost:3001/employee (CRUD)
- http://localhost:3001/feedback (CRUD)

# Closing

Though I didn't finish it in time, even after requesting time extension, I had a really great time on doing this project. I managed to utilize my limited time as good as possible. I also met few bugs, mainly on integration. My main challenge on this project is deciding to pivot from usual fetch flow and using SWR as my data fetching/caching helper instead. This turns out great, and not that hard to pull off. Other than that, I felt I could do more with the time I have left, but decided to leave by it is. The work-week rush on my current position has left me with only 1 day to start and finish the project. This is went on okay in the end, and I hope the submission suffices.

Thank you for the opportunity given, and I hope the submission suffices the requirement. Thank you.
