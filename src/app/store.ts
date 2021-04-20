import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
// reducerを識別するために、名前をつける。このcounterと言う名前は、counterSliceの
// export const selectCount = (state: RootState) => state.counter.valueの
// counterと一致させる必要がある。
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
