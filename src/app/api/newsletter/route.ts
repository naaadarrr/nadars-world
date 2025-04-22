// File: app/api/newsletter/route.ts

import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Get publication ID from environment variables
    const publicationId = process.env.HASHNODE_PUBLICATION_ID;

    if (!publicationId) {
      console.error("Missing HASHNODE_PUBLICATION_ID environment variable");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // GraphQL query to subscribe to newsletter
    const requestBody = {
      query: `
        mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
          subscribeToNewsletter(input: $input) {
            status
          }
        }
      `,
      variables: {
        input: {
          publicationId: publicationId,
          email: email,
        },
      },
    };

    // Make request to Hashnode GraphQL API
    const response = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Check for GraphQL errors
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return NextResponse.json(
        { message: data.errors[0]?.message || "Subscription failed" },
        { status: 400 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "An error occurred while subscribing" },
      { status: 500 }
    );
  }
}
