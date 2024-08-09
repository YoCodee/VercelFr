import { defer } from "react-router-dom";

export const singlePageLoader = async ({ params }) => {
  try {
    const response = await fetch(`https://vercelhs.vercel.app/api/post/${params.id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch item data:', error);
    return {}; // Kembalikan objek kosong jika ada kesalahan
  }
};


// listPageLoader.js


export const listPageLoader = async ({ request, params }) => {
  const res = await fetch("https://vercelhs.vercel.app/api/post");
  console.log(res)
  const data = await res.json();
  return defer({
    postResponse: data,
  });
};



export const packageLoader = async () => {
  try {
    const response = await fetch("https://vercelhs.vercel.app/api/package");
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    const data = await response.json();
    return defer({ packages: data });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return defer({ packages: [] }); // Mengembalikan array kosong jika terjadi kesalahan
  }
};

export const getMeLoader = async () => {
  try {
    const response = await fetch("https://vercelhs.vercel.app/api/me");

    const data = await response.json();
    return defer({ user: data }); // Mengembalikan data pengguna

  } catch (error) {
    console.error('Error fetching user data:', error);
    return defer({ user: null }); // Mengembalikan null jika terjadi kesalahan
  }
};

