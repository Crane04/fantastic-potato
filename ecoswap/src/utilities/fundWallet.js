import postRequest from "../api/postRequest";

export const fundWallet = async (amount, jwt) => {
  console.log(jwt);
  try {
    const response = await postRequest(
      "/wallet/fund",
      {
        amount: parseInt(amount, 10),
      },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error funding wallet:", error);
    return error;
  }
};
