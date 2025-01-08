import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialUserDetailsState = {
  selectedUser: null,
  userTodos: [],
  userPosts: [],
  userAlbums: [],
  loading: false,
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (userId) => {
    const [userResponse, todosResponse, postsResponse, albumsResponse] =
      await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`),
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`),
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`),
      ]);

    if (
      !userResponse.ok ||
      !todosResponse.ok ||
      !postsResponse.ok ||
      !albumsResponse.ok
    ) {
      throw new Error("Failed to fetch user details");
    }

    const [user, todos, posts, albums] = await Promise.all([
      userResponse.json(),
      todosResponse.json(),
      postsResponse.json(),
      albumsResponse.json(),
    ]);

    return { user, todos, posts, albums };
  }
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: initialUserDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload.user;
        state.userTodos = action.payload.todos;
        state.userPosts = action.payload.posts;
        state.userAlbums = action.payload.albums;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userDetailsSlice.reducer;
