import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY;

export const fetchWeather = createAsyncThunk("apiFetchWeather", async () => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        q: "Cairo",
        appid: api_key,
        units: "metric",
      },
    },
  );
  const number = response.data.main.temp;
  const min = response.data.main.temp_min;
  const description = response.data.weather[0].description;
  const max = response.data.main.temp_max;

  return { number, min, description, max };
});

const weatherApiSlice = createSlice({
  name: "weatherApi",

  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changedResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { changedResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
