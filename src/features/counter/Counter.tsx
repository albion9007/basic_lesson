import React, { useState } from 'react';

// useSelectorとuseDispatchが使えるようにimportする。
import { useSelector, useDispatch } from 'react-redux';

// counterSliceから使いたいアクションをimportしている。
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';


export function Counter() {
// useSelectorの引数でselectCountを引数に渡すことで、返り値としてvalueの値を取得する事が出来る。
// そしてそれを、countと言う変数に代入している。
  const count = useSelector(selectCount);

// アクションを実行するためにdispatchが必要になる。
// useDispatchを実行した返り値としてreactのコンポーネントで使えるdispatchが返ってくるため、
// それをローカルのdispatchに入れて使える様にしている。
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"

// onClickした時にdispatchを使って、importしておいたincrementのアクションを実行することで、
// counterSliceのincrementの処理が実行され、reduxの中のvalueの値が更新される。
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}

// onClickされたらdispatchを使ってincrementByAmountのアクションを使う。
          onClick={() =>

// 引数に数字を渡していく事ができる。
// これはuseStateでユーザーが値を実際にinputformで入力できる。
// 入力された値がNumber型で無ければ、"0"として数字がpayloadされる。
// これで入力された値がstring型などを防ぐ事ができる。
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
