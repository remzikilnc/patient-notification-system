# Patient Notification System

## Introduction

The Patient Notification System is designed to manage patient registrations and sending notifications. It consists of two main microservices: the Patient Service and the Notification Service. The system facilitates the management of patient demographics, notification preferences, and sending notifications based on predefined criteria, with the ability to create templates.

## Table of Contents

- [Introduction](#introduction)
- [Backend and Frontend Overview](#backend-and-frontend-overview)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Patient Service](#patient-service)
  - [Features](#features)
  - [Database Structure](#database-structure)
  - [Frontend](#frontend)
  - [Endpoints](#endpoints)
- [Notification Service](#notification-service)
  - [Features](#features-1)
  - [Database Structure](#database-structure-1)
  - [Frontend](#frontend-1)
  - [Endpoints](#endpoints-1)
- [Dependencies](#dependencies)


### Backend and Frontend Overview:

- **Backend**:
  - Built using Java Spring Boot and utilizes Netflix Eureka for service discovery.
  - Inter-service communication is managed via RabbitMQ, which listens to messages and processes them accordingly.
  - When a patient is created in the Patient Service, RabbitMQ dispatches the message to the Notification Service, which listens to the queue and assigns the patient to criteria that match predefined criterias.
  - The system comprises four services: two main services (Patient Service and Notification Service) and two additional services (API Gateway and Discovery Service).
  - The API Gateway currently provides a common endpoint for APIs.
  - The Notification Service is built using the Strategy Pattern, dynamically creating and using the necessary notification service based on the template.
  - Currently, only email notifications are supported.

- **Frontend**:
  - Built using Next.js and styled with TailwindCSS.
  - Modals are implemented using Headless UI.
  - Caching and data fetching are managed using the SWR library.

- - **Dashboard**:
    ![Patiend List Table](https://i.hizliresim.com/opsm2gu.png)

## Tech Stack
- **Backend**: Java Spring Boot - Netflix Eureka - RabbitMQ - Spring Cloud - Spring Data JPA - Lombok
- **Frontend**: Nextjs - TailwindCSS - SWR - Headless UI

## Installation
- Needs Docker, Maven, Node.js, and npm installed on your machine.
- Ports 3000, 5672, 8763, 8762, 8761, 8889, 5432, 3306 should be available.
```bash
# Open Terminal
# Clone the repository
git clone https://github.com/remzikilnc/patient-notification-system.git
# Change directory to patient-service/back-end
cd back-end
# Build the project
mvn clean install
# Run the project via Docker
docker-compose up
# Open New Terminal to run the front-end
# change directory to notification-service/front-end
cd ../notification-service/front-end
# Install dependencies
npm i
# Run the project
npm run dev
# Open http://localhost:3000 to view it in the browser.
```



## Patient Service
The Patient Service is responsible for managing patient information, including registration, demographic details, and notification preferences. It includes the following main features:

#### Features
- Patient Registration: Allows new patients to register with their personal and contact details.
- Contact Registration: Allows adding a new contact to a patient with their personal and contact details.
- Patient Management: Manage and update patient information, including notification preferences.
- Dispatch Queue: Dispatches a queue message when a patient is created using RabbitMQ.
- Search Patients: Search for patients with pagination and filtering by name, surname, age range, gender, sort (e.g., sort=name,desc), page number, and page limit (default 10). Optionally include or exclude contacts in the search results.
- Update Patient: Update existing patient details.
- Delete Patient: Delete a patient by ID with their contacts,
- Retrieve Patient: Retrieve patient details by ID.
- Update Contact: Update existing contact details for a patient.
- Delete Contact: Delete a contact by ID for a patient.

### Database Structure
![Database Patient](https://i.hizliresim.com/cpcf4p8.png)
- **With Revision Tables**

![Patiend List Table](https://i.hizliresim.com/mgq1va8.png)

### Frontend

#### Patiend Listing
- #### Cacheble


![Patiend List Table](https://i.hizliresim.com/26o98yc.png)

#### Patiend Create & Update Form
![Patiend Create & Update Form](https://i.hizliresim.com/b5fzbru.png)



### Endpoints (For more information, check PostgreSQL Collection)

``
API Prefix: api/v1
``

| Endpoint                    | Type     | Description                             |
| :-------------------------- | :------- | :-------------------------------------- |
| `patients/ok`               | `GET`    | Check patient service is ok             |
| `patients`                  | `GET`    | Retrieve a list of patients             |
| `patients/:id`              | `GET`    | Retrieve details of a specific patient  |
| `patients/:id`              | `PUT`    | Update details of a specific patient    |
| `patients/:id`              | `DELETE` | Delete a specific patient               |
| `patients/:id/contacts`     | `GET`    | Retrieve a list of contacts for a patient |
| `patients/:id/contacts/:cid`| `PUT`    | Update details of a specific contact    |
| `patients/:id/contacts/:cid`| `DELETE` | Delete a specific contact               |



### Notification Service
The Notification Service is designed to handle various notification-related functionalities such as managing notification templates, handling new patients via RabbitMQ, and saving them to the target_patients table with their notification preferences coming from the Patient Service. It also sends notifications based on criteria via templates.

#### Features
- Send Notification: Sends notifications to patients based on their preferences and criteria via SMS or Email (Only Email working now).
- Template Management: Create, update, retrieve, and delete notification templates. Templates can have multiple criteria, making notifications dynamic and customizable.
- Criteria Management: Define, update, retrieve, and delete criteria used to determine the conditions under which notifications are sent.
- Patient Handling: Processes new patient data via RabbitMQ and saves new patients to the target_patients table with their notification preferences.
- Dynamic Notification Dispatching: Uses predefined templates and criteria to determine the appropriate notifications to send based on specific events or patient details.
- Targeted Notifications: Retrieves target patients and ensures notifications are sent based on specified criteria.

### Database Structure

![Database Notification](https://i.hizliresim.com/57n29md.png)

### Frontend

#### Notification List, Send
![Notification List](https://i.hizliresim.com/4mfelq3.png)

#### Notification Edit, Create / Edit Delete Criteria
![Notification Edit - Create](https://i.hizliresim.com/aj9w1aj.png)

### Endpoints (For more information, check PostgreSQL Collection)

``
API Prefix: api/v1
``

| Endpoint                                      | Type    | Description                                            |
|-----------------------------------------------|---------|--------------------------------------------------------|
| `notifications/ok`                            | `GET`   | Check if the notification service is operational       |
| `notifications/send/:id`                      | `GET`   | Send notification using the specified template ID      |
| `notifications/templates`                     | `GET`   | Retrieve a list of all notification templates          |
| `notifications/templates/:id?criterias=true`  | `GET`   | Retrieve details of a specific template with criteria  |
| `notifications/templates`                     | `POST`  | Create a new notification template                     |
| `notifications/templates/:id`                 | `PUT`   | Update an existing template                            |
| `notifications/templates/:id`                 | `DELETE`| Delete a specific template                             |
| `notifications/criterias`                     | `GET`   | Retrieve a list of all criteria                        |
| `notifications/criterias/:id?targets=true`    | `GET`   | Retrieve a specific criteria with targets              |
| `notifications/criterias`                     | `POST`  | Create new criteria: expects template id               |
| `notifications/criterias/:id`                 | `PUT`   | Update a specific criteria                             |
| `notifications/criterias/:id`                 | `DELETE`| Delete a specific criteria                             |





## Dependencies

- Java Spring Boot, Maven, RabbitMQ, Netflix Eureka, Spring Cloud, Spring Data JPA, Lombok
- Nextjs, TailwindCSS, SWR, Headless UI
- RDBMS (e.g., PostgreSQL for Patient Service, MySQL for Notification Service, Or Both MySQL)



