const JSON_SERVER_URL =
  process.env.NEXT_PUBLIC_JSON_SERVER_URL || "http://localhost:5000";

export async function getTiles() {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/tiles`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch tiles");
    return res.json();
  } catch (error) {
    console.error("getTiles error:", error);
    return [];
  }
}

export async function getTileById(id) {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/tiles/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch tile");
    return res.json();
  } catch (error) {
    console.error("getTileById error:", error);
    return null;
  }
}

export async function getFeaturedTiles() {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/tiles`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured tiles");
    }

    const data = await res.json();

    // Shuffle array randomly
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // Return random 4 items
    return shuffled.slice(0, 4);
  } catch (error) {
    console.error("getFeaturedTiles error:", error);
    return [];
  }
}