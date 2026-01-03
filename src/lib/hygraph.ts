// Hygraph GraphQL client using graphql-request
import { GraphQLClient, gql } from "graphql-request";

export const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT as string;
export const HYGRAPH_TOKEN = import.meta.env.VITE_HYGRAPH_TOKEN as string | undefined;

if (!HYGRAPH_ENDPOINT) {
  // eslint-disable-next-line no-console
  console.warn("VITE_HYGRAPH_ENDPOINT is not set. Create a .env file with your Hygraph endpoint.");
}

function getHygraphClient() {
  if (!HYGRAPH_ENDPOINT) throw new Error("Hygraph endpoint is missing");
  return new GraphQLClient(HYGRAPH_ENDPOINT, {
    headers: {
      ...(HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : {}),
    },
  });
}

export async function hygraphFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const client = getHygraphClient();
  try {
    // client.request returns data object typed as T when query matches
    return await client.request<T>(query, variables);
  } catch (err: any) {
    // graphql-request throws rich errors; normalize to previous format
    const message = err?.response?.errors
      ? JSON.stringify({ errors: err.response.errors })
      : err?.message || String(err);
    throw new Error(`Hygraph request failed: ${message}`);
  }
}

// Types aligned to provided schema
export interface PackageItem {
  id: string;
  packageName: string;
  description?: { html?: string; json?: unknown } | null;
  locations?: string[] | null;
  dayCount?: number | null;
  nightCount?: number | null;
  bestTime?: string | null;
  price?: number | null;
  image?: { url: string }[] | null;
  active?: boolean | null;
}

export interface TestimonialItem {
  id: string;
  travelerName?: string | null;
  description?: { html?: string; json?: unknown } | null;
  travelerLocation?: string | null;
  video?: { url: string }[] | null;
  active?: boolean | null;
}

export async function fetchPackages(limit?: number) {
  const query = gql`
    query Packages($limit: Int) {
      packages(first: $limit, where: { active: true }) {
        id
        packageName
        description { html }
        locations
        dayCount
        nightCount
        bestTime
        price
        image { url }
        active
      }
    }
  `;
  return hygraphFetch<{ packages: PackageItem[] }>(query, { limit });
}

export async function fetchInternationalPackages(limit?: number) {
  const query = gql`
    query GetInternationalPackages($limit: Int) {
      internationalPackages(first: $limit, where: { active: true }) {
        id
        packageName
        description { html }
        locations
        dayCount
        nightCount
        bestTime
        price
        image { url }
        active
      }
    }
  `;
  return hygraphFetch<{ internationalPackages: PackageItem[] }>(query, { limit });
}

export async function fetchTestimonials(limit?: number) {
  const query = gql`
    query Testimonials($limit: Int) {
      testimonials(first: $limit, where: { active: true }) {
        id
        travelerName
        travelerLocation
        description { html }
        video { url }
        active
      }
    }
  `;
  return hygraphFetch<{ testimonials: TestimonialItem[] }>(query, { limit });
}
