import instanceAxios from "./axios.js";

export const getUsers = async () => {
    const response = await instanceAxios.get("/users");
    return response.data;
};

export const deleteUsers = async (ids) => {
    await instanceAxios.delete("/users", {
        data: { ids: ids }
    });
};

export const updateUsersStatus = async (ids, status) => {
    await instanceAxios.patch("/users/status", { ids: ids, status: status });
};
