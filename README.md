
# Standalone Admin Dashboard

Follow the steps below to set up and run the standalone admin dashboard:

## Steps to Run

1. **Clone the Repository**  
    Clone the repository from GitHub:
    ```bash
    git clone https://github.com/th-kaif/medusajs
    ```

2. **Navigate to the Admin Panel Directory**  
    Change to the `explore-admin-panel` directory:
    ```bash
    cd explore-admin-panel
    ```

3. **Install Dependencies**  
    Install the required dependencies using Yarn:
    ```bash
    yarn install
    ```

4. **Create a `.env` File**  
    Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs
    STORE_CORS=http://localhost:8000,https://docs.medusajs.com
    ADMIN_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
    AUTH_CORS=http://localhost:5173,http://localhost:9000,http://localhost:8000,https://docs.medusajs.com
    REDIS_URL=redis://localhost:6379
    JWT_SECRET=supersecret
    COOKIE_SECRET=supersecret
    DATABASE_URL=postgres://postgres:db_pass@localhost/medusa-explore-admin-panel
    MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=explore-admin-panel-storefrontv
    ```

5. **Add Your Database User**  
    Ensure the database user specified in the `DATABASE_URL` has the necessary permissions.

6. **Create the Database**  
    Create a database with the name specified at the end of the `DATABASE_URL` (after the `/`).

7. **Run Database Migrations**  
    Generate and apply the database migrations using the following commands:
    ```bash
    npx medusa db:generate brand
    npx medusa db:migrate
    ```

8. **Start the Server**  
    Start the development server:
    ```bash
    npm run dev
    ```

---

You are now ready to use the standalone admin dashboard!
