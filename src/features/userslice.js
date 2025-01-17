import { createSlice } from "@reduxjs/toolkit";
import supabase from "../config/supabaseclient";

export const addingdataintosupabase = async (email) => {
  // Check if the email already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // Handle fetch error except "No rows found" (code: PGRST116)
    console.error("Error checking existing user:", fetchError);
    alert("An error occurred while verifying the user.");
    return;
  }

  if (existingUser) {
    console.log("User already exists:", existingUser);
    return; // Exit without inserting a new record
  }

  // Insert a new user if no existing record is found
  const { data, error } = await supabase
    .from("users")
    .insert([{ email }])
    .select();

  if (error) {
    console.log("Error inserting user:", error);
    alert("Please fill in all the fields correctly.");
    return;
  }

  if (data) {
    console.log("User successfully added to Supabase:", data);
  }
};

const moneydatainsupabase = async (email, money) => {
  const { data, error } = await supabase
    .from("users")
    .update({ money })
    .eq("email", email)
    .select();
  if (error) {
    console.log(error);
    alert("please fill in all the fields correctly");
  }

  if (data) {
    console.log(data, "money updated in supabase");
  }
};

const currentholdingsinsupabase = async (email, currentholdings) => {
  const { data, error } = await supabase
    .from("users")
    .update({ currentholdings })
    .eq("email", email)
    .select();
  if (error) {
    console.log(error);
    alert("please fill in all the fields correctly");
  }

  if (data) {
    console.log(data, "current holdings updated in supabase");
  }
};

const fetchUserDataFromSupabase = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("money, currentholdings")
    .eq("email", email)
    .single(); // Fetch a single record

  if (error) {
    console.error("Error fetching user data:", error);
    return null; // Handle error gracefully
  }
  return data;
};

const initialState = {
  data: JSON.parse(sessionStorage.getItem("userdetails")) || null, // Parse user details from sessionStorage
  money: null, // Placeholder for money
  currentholdings: [], // Placeholder for current holdings
  loading: true, // Loading state to handle asynchronous fetching
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user data
    setUserData: (state, action) => {
      state.data = action.payload;
      sessionStorage.setItem("userdetails", JSON.stringify(action.payload));
    },

    // Action to clear user data
    clearUserData: (state) => {
      state.data = null;
      sessionStorage.removeItem("userdetails");
    },

    // Action to increase money
    increasemoney: (state, action) => {
      state.money += action.payload;
      moneydatainsupabase(state.data.user.email, state.money);
    },

    // Action to decrease money
    decreasemoney: (state, action) => {
      state.money -= action.payload;
      moneydatainsupabase(state.data.user.email, state.money);
    },

    // Action to add item in current holdings
    additeminholdings: (state, action) => {
      state.currentholdings = [...state.currentholdings, action.payload];
      currentholdingsinsupabase(state.data.user.email, state.currentholdings);
    },
     // Action to delete item from current holdings
     deleteiteminholdings: (state, action) => {
      state.currentholdings = state.currentholdings.filter(
        (item) => item.id !== action.payload.id
      );
      currentholdingsinsupabase(state.data.user.email, state.currentholdings);
    },

    // Action to set user data from Supabase
    setUserSupabaseData: (state, action) => {
      state.money = action.payload.money;
      state.currentholdings = action.payload.currentholdings;
    },
  },
});

// Thunk to fetch user data from Supabase
export const fetchUserData = (email) => async (dispatch) => {
  const userData = await fetchUserDataFromSupabase(email);
  if (userData) {
    dispatch(
      userSlice.actions.setUserSupabaseData({
        money: userData.money,
        currentholdings: userData.currentholdings || [],
      })
    );
  }
};

// Exporting actions to be dispatched
export const {
  setUserData,
  clearUserData,
  increasemoney,
  decreasemoney,
  additeminholdings,
  setUserSupabaseData,
  deleteiteminholdings
} = userSlice.actions;

// Exporting the reducer to configure the store
export default userSlice.reducer;