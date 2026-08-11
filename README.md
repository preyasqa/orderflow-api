# OrderFlow API

REST API that manages order creation, payment processing, and fulfillment
status for the retail platform. Used by the storefront web app and the
warehouse fulfillment service.

## Tech Stack
- Node.js 20 / Express
- MongoDB (via Mongoose)
- Stripe for payment processing

## Architecture

This service sits between the storefront frontend and the warehouse
fulfillment system:

- **Upstream dependencies:** calls the Inventory Service (`inventory-api`)
  to check stock before confirming an order.
- **Downstream consumers:** the Storefront Web App and the Fulfillment
  Worker both call this API to create and track orders.
- **External APIs:** Stripe (payment processing).

## Environment Variables

The following environment variables are required (see `.env.example`):

- `MONGODB_URI`
- `STRIPE_SECRET_KEY`
- `PORT`

## Running Locally

```bash
npm install
npm start
```

## Testing

```bash
npm test
```

Runs the Jest test suite with coverage reporting enabled.

## Deployment

Deployments run automatically via the GitHub Actions workflow in
`.github/workflows/deploy.yml` on every push to `main`.

## Infrastructure

Containerized with Docker (see `Dockerfile`) and deployed as a container
image.
