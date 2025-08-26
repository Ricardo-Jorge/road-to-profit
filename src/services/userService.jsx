import { api, requestConfig } from "../utils/config";

// Get user profile
const profile = async (token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/users/profile", config);
  if (res.ok) {
    return await res.json();
  }
  const errorData = await res.json();
  throw errorData;
};

// Update user profile
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/users/update", config);
  if (res.ok) {
    return await res.json();
  }
  const errorData = await res.json();
  throw errorData;
};

// Get user details by ID
const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  const res = await fetch(api + "/users/" + id, config);
  if (res.ok) {
    return await res.json();
  }
  const errorData = await res.json();
  throw errorData;
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
