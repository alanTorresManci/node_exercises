
# Exercise API

This API allows users to create and retrieve exercises.

## Endpoints

### POST /exercises

Creates a new exercise.

Request Body
~~~
{
  "user_id": "0e33cc42-7507-48f9-9c37-36f2bbd684d2",
  "content": "Run 5 miles"
}

~~~

Response Body
~~~
{
  "id": "0e33cc42-7507-48f9-9c37-36f2bbd684d2",
  "user_id": "0e33cc42-7507-25f6-9c37-36f2bbd684d2",
  "content": "Run 5 miles",
  "user": {
    "name": "John Doe"
  }
}

~~~

### GET /exercises
Retrieves all exercises.

Response Body
~~~
[
    {
        "id": "0e33cc42-7507-48f9-9c37-36f2bbd684d2",
        "user_id": "0e33cc42-7507-48f9-9c37-36f2bbd684d2",
        "content": "Run 5 miles",
        "user": {
            "name": "John Doe"
        }
    },
]

~~~
### Running Tests
To run the tests for this project:

In a new terminal window, run the tests with the following command (it will create the dependencies, build the project and run the tests):

```
npm run test
```

### Note
Due to time constraints, the implementation of CQRS (Command Query Responsibility Segregation) was not included. This would involve separating the command and query responsibilities into different classes or layers. The command would be responsible for creating, updating or deleting data, while the query would be responsible for reading data. This separation can improve the scalability and maintainability of the codebase.

Additionally, it is possible to fully automate the deployment of this API using Docker. The Docker image would include the necessary seeders and migrations to create the database and tables required for the API to function. The used migrations and seeders are included in the db folder in the project.
