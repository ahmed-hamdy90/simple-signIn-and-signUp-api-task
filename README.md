# Simple User SignIn/SignUp Plus Fetch Data Task

Simple NestJS API for User SignIn/SignUp Plus Fetch Users Details Task

**Important NOTE:** This First time for work on NestJS application and just quick learn it through PluralSight NestJs Path Cources and use Gemini AI help, Maybe there are in-correct naming files or Modules

### Full Task Details

This backend server is built with **NestJS** and uses **MongoDB** as its database. It provides the necessary API endpoints for user authentication, handling both **sign-up** and **sign-in** requests.

The sign-up endpoint enforces the following validation rules for creating a new user:
* **Name**: Must be a minimum of 3 characters long.
* **Email**: Must be in a valid email format.
* **Password**: Must adhere to the following complexity requirements:
    * Minimum length of 8 characters.
    * At least one letter.
    * At least one number.
    * At least one special character.

The server also features at least one **protected endpoint** to demonstrate that a user must be authenticated to access certain resources.

-----

### Project Structure

The project follows a modular and clean architecture to separate concerns, making it scalable and easy to maintain.

There simple applying Domain Driven Design (DDD) concepts and Repository Desgin Pattern for Database Layer

Use DTO Separation conception and depends on `class-validation` for validate HTTP Body Imputs

```
.
├── README.md
├── .dockerignore                     # Docker ignore file
├── .gitignore                        # GIT ignore file
├── docker-compose.yml                # Docker compose file for run project 
├── Dockerfile                        # Instructions for building the Docker image of Nest API
└── api/                              # All Full API source code
    ├── .env.example                  # Example for Used Enviroment variables To Run API - See Down
    ├── .eslintrc.js
    ├── .prettierrc
    ├── nest-cli.json
    ├── package.json
    ├── tsconfig.build.json
    ├── tsconfig.json
    ├── src/                          # All Srouce Code project for API
    │   ├── api.module.ts             # Main API Basic Module
    │   ├── main.ts                   # Main Entry point for Running Database Seeds
    │   ├── auth/                     # Auth Module for all Authentication process
    │   │   ├── auth.module.ts        # Entry Auth Module class
    │   │   ├── auth.controller.ts    # Authentication Controller class
    │   │   ├── gurad/                # Custom Authentication Gurad files
    │   │   ├── dto/                  # Custom Authentication DTO files
    │   │   └── auth.service.ts       # Authentication Service class
    │   ├── database/                 # Database Module for all Database processes or integration
    │   │   ├── database.module.ts    # Entry Database Module class
    │   │   └── mongodb/              # MongoDb Module for all Database process using MongoDB
    │   │       ├── mongodb.module.ts # Entry MongoDB Module class
    │   │       ├── document/         # Custom MongoDB Document files represent MongoDB Collections
    │   │       └── schema/           # Custom MongoDB Schema files represent MongoDB Collections
    │   ├── shared/                   # Shared Module include Common, Shared and Basic files
    │   │   ├── shared.module.ts      # Entry Shared Module class
    │   │   ├── erorrs/               # Custom shared Error files
    │   │   ├── decorator/            # Custom shared Decorators files
    │   │   ├── domain/               # Custom User Domain files include Anemic Entities
    │   │   ├── dto/                  # Custom Shared DTO files
    │   │   └── services/             # Custom Shared Services files
    │   └── user/                     # User Module for all Users Details process
    │        ├── user.module.ts       # Entry User Module class
    │        ├── user.controller.ts   # User Controller class
    │        ├── domain/              # Custom User Domain files include Anemic Entities
    │        ├── dto/                 # Custom User DTO files
    │        └── user.service.ts      # User Service class
    └── test/                         # All Test Source code for project
        ├── app.e2e-spec.ts
        └── jest-e2e.json
```

-----

### Available HTTP Routes

The following API endpoints are available for Simple Task.

**Note:** Make sure about Authorization Token for Users Route

| Method | Route | Description |
| :--- | :--- | :--- |
| **POST** | `/auth/login` | Perform authication action, Take JSON Body with `email` and `password` |
| **POST** | `/auth/register` | Perform Reginster new User, Take JSON Body with `email`, `password` and `name` |
| **GET** | `/users` | List all available Users list |
| **GET** | `/users/:userId` | Browse Request User Details |

-----

### How to Run with Docker And Docker Compose

To run this project in a containerized environment, follow these steps:

1.  **Build the Docker image for Nest API:**

    ```bash
    docker compose build
    ```

2.  **Run the containers after built image**

    ```bash
    docker compose run
    ```
    This command maps port `3000` (Default) from your local machine to port `3000` inside the container. You can now access the API at `http://localhost:3000`.

3.  **Clean Containers After close Run (if needed)**

    ```bash
    docker compose down
    ```

-----

### Environment Variables

This project uses **environment variables** to manage sensitive information and configuration settings. You'll find an example of the required variables in the **`.env.example`** file.

#### How to set up

Follow these steps to configure your environment variables:

1.  **Duplicate the example file**: Make a copy of the **`.env.example`** file and rename it to **`.env`** in the `api` folder at the same place for **`.env.example`**.

    ```bash
    cp .env.example .env
    ```

2.  **Fill in your values**: Open the new **`.env`** file and replace the placeholder values with your actual credentials or settings.

      * **`MongoDB_Server`**: Your mongoDB database server host IP
      * **`MongoDB_PORT`**: Your mongoDB database port
      * **`MongoDB_Name`**: Your mongoDB database name
      * **`PORT`**: The port on which the API will run.
      * **`HOST`**: The hostname on which the API will run.
      * **`Auth_Secert`**: The Authentication Secert (Depends on JWT)
      * **`Auth_Expires_Time`**: The Authentication Expiration time, ex: 1h, 30m or 30s (Depends on JWT)

-----

### Versions & TODOs

#### Versions

  - [v1.0.0](https://github.com/ahmed-hamdy90/simple-signIn-and-signUp-api-task/releases/tag/v1.0.0): Initial release with basic functionality for all Given Tasks **Current Version**

#### Future Enhancements (TODOs)

  - [ ] Make Database Seeds for Current User Documents Can be used on Testing API Manually or within Unit/Scenrio Testing
  - [ ] Make Custom Looger to be logging on file
  - [ ] Create Cutsom Configuration files to Read Enviroment Varaiables based on Development for Separated .env files
  - [ ] Make Swagger Implementation for easy and testable API documentation
  - [ ] Make new Error Handling to Hide Validation and Error display on Production and Custom/Unified API Reponse
  - [ ] Make Testing Implementation for All Unit And Scenario Cases
  - [ ] Make Github Action CI/CD workflow