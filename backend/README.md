# Backend
## Installation

```bash
$ npm install
```

## Environment Config
below is the .env file configuration
```
# specify the location to the Firebase Admin SDK private key json file.
# found in Project settings > Service accounts > Generate new private key
SA_KEY=

# port for running the backend server.
PORT=
```

## API References
### Member Endpoints

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/members`                           | Retrieve all members.                    |
| `GET`    | `/api/members/${id}`                     | Retrieve a specific member with id ${id} |
| `POST`   | `/api/members/${id}`                     | Populate member with all attendnaces date 
status  |
| `PATCH`  | `/api/members/${id}`                     | Update member.                           |
| `DELETE` | `/api/members/${id}`                     | Delete member.                           |

**NOTE: The POST request is only for populating a member, not creating it. The main backend server for
registering members SHOULD and MUST be used.**

### Attendances Endpoints
| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/attendances`                       | Retrieve all attendances date.           |
| `POST`   | `/api/attendances/${id}`                 | Create Attendances date.                 |
| `PATCH`  | `/api/attendances/${id}`                 | Update an attendance date.               |
| `DELETE` | `/api/attendances/${id}`                 | Delete an attendance date.               |


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
