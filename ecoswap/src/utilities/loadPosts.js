import getRequest from "../api/getRequest";

const loadPosts = async (jwt) => {
  try {
    const response = await getRequest("/swapPosts/country-swap", {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {}
};

export default loadPosts;
