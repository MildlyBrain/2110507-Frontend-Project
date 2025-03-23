import { CoWorkingSpace } from "@/types/CoWorkingSpace";

export async function getCoWorkingSpaces(token: string, page?: string) {
  let response;

  if (page) {
    response = await fetch(
      `http://localhost:5000/api/coworkingSpace?page=${page}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = await fetch(`http://localhost:5000/api/coworkingSpace`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  if (!response.ok)
    throw new Error(`Failed to fetch co-working spaces of page: ${page}`);

  return response.json();
}

export async function getCoWorkingSpace(token: string, id: string) {
  const response = await fetch(
    `http://localhost:5000/api/coworkingSpace/${id}}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok)
    throw new Error(`Failed to fetch co-working space of id: ${id}`);

  return response.json();
}

export async function createCoWorkingSpace(
  token: string,
  content: CoWorkingSpace
) {
  const response = await fetch(`http://localhost:5000/api/coworkingSpace`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  if (!response.ok) throw new Error("Failed to create new co-working space");

  return response.json();
}

export async function updateCoWorkingSpace(
  token: string,
  id: string,
  content: CoWorkingSpace
) {
  const response = await fetch(
    `http://localhost:5000/api/coworkingSpace/${id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }
  );

  if (!response.ok)
    throw new Error(`Failed to update co-working space of id: ${id}`);

  return response.json();
}

export async function deleteCoWorkingSpace(token: string, id: string) {
  const response = await fetch(
    `http://localhost:5000/api/coworkingSpace/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok)
    throw new Error(`Failed to update co-working space of id: ${id}`);

  return response.json();
}
