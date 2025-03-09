# GitHub API Integration

This project provides a Node.js Express API that integrates with the GitHub API to fetch user data, repositories, and manage issues.

## Features

- Fetch GitHub user profile information
- Retrieve user repositories
- Get detailed information about a specific repository
- Create issues for repositories through a web form

## API Routes

### User and Repository Data

#### `GET /github`
Fetches the GitHub profile information for user "sakshammishra5" along with all repositories.

**Response:** JSON object containing user profile data with an additional `repoData` field containing repository information.

#### `GET /github/:repoName`
Fetches detailed information about a specific repository owned by "sakshammishra5".

**Parameters:**
- `repoName`: The name of the repository to fetch

**Response:** JSON object containing repository details.

### Issue Management

#### `GET /github/:repoName/issues`
Renders an HTML form for creating a new issue for the specified repository.

**Parameters:**
- `repoName`: The name of the repository for which to create an issue

**Response:** HTML page with an issue creation form.

#### `POST /github/issues`
Creates a new issue for the specified repository.

**Request Body:**
- `title`: The title of the issue (required)
- `description`: The body/description of the issue (optional)
- `repoName`: The name of the repository to create the issue in (required)

**Response:** JSON object containing the created issue's URL and data.

## Installation

### Prerequisites
- Node.js and npm installed
- GitHub Personal Access Token with appropriate permissions

### Clone the Repository
```bash
git clone https://github.com/sakshammishra5/cactro_backend_test
cd github-api-integration
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file in the project root with the following variables:
```
GITHUB_TOKEN=your_github_personal_access_token
PORT=3000
```

### Start the Server
```bash
npm run serve
```

## Usage Examples

### Fetch User Data
```bash
 http://localhost:3000/github
```

### Fetch Repository Data
```bash
 http://localhost:3000/github/repo-name
```

### Create an Issue
```bash
  GET request on http://localhost:3000/github/repo-name/issues 
   "it will give the html form to raise issue and after clicking on submit button your issue will be submitted" 
```

## Live Demo
[https://cactro-backend-test-k9ch.onrender.com](https://cactro-backend-test-k9ch.onrender.com)

## Security Notes
- This application uses environment variables to secure GitHub tokens
- Make sure to set proper permissions for your GitHub token, limiting it to only the needed scopes
- Never commit your `.env` file to version control

## License
MIT