# AuthGate

AuthGate is a third-party provider for authentication processes. It allows users to register on our website and use that account to log in to all tenant websites registered with us. It utilizes the OAuth flow, where we generate a code for users that can be exchanged for a token later.

## Features

- **Profile Page:** Users can view and edit their information, update their password, and upload a profile photo.
- **Admin Dashboard:** Admins can see all users, tenants, and projects. They can search by name, filter deleted or undeleted members, and paginate results. Data modification is done through two pipes.
- **Developers Page:** Provides instructions and code for developers on how to use our service.
- **Projects Page:** Tenants can add, delete, or update their projects.
- **Authentication Pages:** Includes sign-up and login pages with validation using Angular reactive forms, Google and GitHub sign-in buttons, a callback URL page, and a reset password functionality.
- **Client Login Redirect Page:** Receives clients redirected from tenant websites to log in and then go back to their website.
- **Error Page:** Handles unexpected errors and redirects users to the home page.
- **Not Found Page:** Handles wrong paths.
- **Loader:** Displays when fetching data from the server.
- **Custom Validation:** A service for custom validation in reactive forms, usable anywhere in the application.
- **Interfaces:** Handles data types.
- **Interceptors:** Modifies requests, adds JWT tokens to every request, and controls the loader component.
- **Guards:** Protects routes based on login status and role status.

## Installation

To install and run this project locally:

```bash
# Clone the repository
git clone https://github.com/David8-0/AuthGate-Angular.git

# Navigate to the project directory
cd AuthGate-Angular

# Install the dependencies
npm install

# Run the application
ng serve
