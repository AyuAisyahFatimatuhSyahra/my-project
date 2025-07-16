export async function getIdeas({ page = 1, perPage = 10, sort = "-published_at" }) {
    const res = await fetch(
      `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  }