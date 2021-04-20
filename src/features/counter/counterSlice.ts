import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface CounterState {
  value: number;
}

// 各sliceのステートで取り扱うステートをinitialStateで定義する。
const initialState: CounterState = {

// ここでは、valueと言う属性だけをこのsliceで管理するという意味になっている。
// 初期値が0になっている。
  value: 0,
};

// 各sliceを作るために、createSlice関数を使う。
export const counterSlice = createSlice({

// sliceには名前をつけることができるため、ここではname: 'counter'としている。
  name: 'counter',


  initialState,

// reducers（actionとステートを受け取る）を使ってロジックを足していく。
  reducers: {

// 1つ目の引数がstate、アクションがincrementになる。
// state部分には現在のステートが入ってくる。
// incrementとしては、現在のステートに+1した値を更新させるアクションがある。
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`

// ここでは、actionにPayloadを渡している。そしてそれにnumber型を指定して渡している。
// 受け取った値分だけ、現在の値に足してくれる。数字をステートのvalueのところに足す。
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// increment, decrement, incrementByAmountの各アクションをreactのコンポーネントの方から、
// usedispatchを使って実行するためには、exportしておく必要がある。
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// reactのコンポーネントの方からreduxのストアの中のステートを参照するときにuseselectorを使う時に、
// 呼び出す関数を定義しておく。
// reduxのストアの中のステートを引数にして、その中からvalueの値を呼んできて、それを返す様にしている。
export const selectCount = (state: RootState) => state.counter.value;


export default counterSlice.reducer;