import postRequest from "../api/postRequest";

const transferMoney = async (email, amount, jwt) => {
  const response = await postRequest(
    "/wallet/transfer-funds",
    {
      email,
      amount: parseInt(amount, 10),
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  if (response.status == "200") {
    return { success: true };
  } else {
    return { success: false };
  }
};

export default transferMoney;
