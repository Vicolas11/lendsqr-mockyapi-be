﻿# Lendsqr MockyAPI Backend

This project is an example of an Express server built with TypeScript that fetches data from an external API (Mocky.io) and returns it in a paginated format. The server handles requests for paginated data, allowing clients to specify the page number and the number of items per page.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

### Steps

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-repo/paginated-data-server.git
    cd paginated-data-server
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Install TypeScript and ts-node globally (if not already installed):**

    ```sh
    npm install -g typescript ts-node
    ```

## Usage

### Running the Server

To run the server in development mode using `ts-node`, use the following command:

```sh
npx ts-node server.ts
```
The server will start on port 3000 (or a port specified in the PORT environment variable).

## API Endpoints
GET /data
Fetches paginated data from the server.

Query Parameters
- page (optional, default: 1): The page number to fetch.
- pageSize (optional, default: 10): The number of items per page.
Example Request
```sh
curl "http://localhost:3000/data?page=1&pageSize=10"
```
