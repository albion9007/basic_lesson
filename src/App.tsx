// hooksとtypescriptが使用できるようにuseStateとuseEffectをimportしておく。
import React, { useState, useEffect} from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import CleanUp from './CleanUp';

// useEffectを使用し、reactのstateをfunctionalコンポーネントで定義していくことが出来る。
// アローfunctionにする。
// typescriptではあらかじめreactのfunctionalコンポーネントに対する型が決められているため、App: React.FCとする。
const App: React.FC = () => {

// statusと言う名前のステートを作る。
// useStateの場合はstatusの変数名と、それを更新する関数名を定義する。
// useStateを空の文字列にすると、typescriptが推定してstring型を自動でつける。
// 下記で<h4>{status}</h4>と記述したら、空の文字列に何か表示されるように文字を入れる。
// 更新するときに、stringとnumber型のどちらかのタイプを更新させたい場合は、
// useState<string | number>("text")とすると、更新できる。これはユニオンタイプと呼ばれる。
  const [status, setStatus] = useState<string | number>("text");

// useStateに空の文字列を入れておくことで、typescriptが推定してinputにstring型を自動でつけてくれる。
  const [input, setInput] = useState("");
  
// useStateに初期値を0にしておくことで、typescriptが推定してcounterにnumber型を自動でつけてくれる。
  const [counter, setCounter] = useState(0);

// 初期値をtrueにすると、型がboolean型になる。
  const [display, setDisplay] = useState(true);

// 下記で使用するonChangeHanlerを定義していく。
// onChangeHanlerオブジェクトはイベントを受け取ってsetInputを使って、inputステートを更新していく。
// この時にtypescriptはイベント型を指定する必要がある,
// これは下記のoonChangeHanlerをホバーして出てくる、イベントの型をコピペする。
// これでユーザーが何か入力すると、即座に入力内容が反映される。
  const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  };


  useEffect(() => {
// useEffectの処理が実行されたか分かるようにconsole.logで
// ("useEffect in App invoked !")と言うメッセージを出力しておくようにする。
    console.log("useEffect in App invoked !");

// useEffectの処理を記述する。
// ここでは、document（ブラウザ）のタイトルを文字列と&{}を使い変数を割り当てる。
// counterの初期値は0、
// useEffectの第2引数に何も指定しない場合は、レンダリングされる度に、
// document.title = `current value is ${counter}`;が実行される。
// ★これはreactではステートが更新される度にレンダリングされるために行える。
    document.title = `current value is ${counter}`;

// しかし、このままでは各ステートが更新される度にレンダリングされるため、useEffectが実行されてしまう。
// そのため、counterの値が更新された時のみ、useEffectが実行される様にするために、
// 第2引数にcounterを指定する。
  },[counter]);
  
  return (
    <div className="App">
      <header className="App-header">
        
{/* ステートを表示させるため、と<h4>{status}</h4>記述する。 */}
        <h4>{status}</h4>
{/* buttonを作り、setStatusを使いstatusを更新させる。ここでは、onClickを使い、ボタンが押された時にnew textと値を更新させる。
ここでtextではなく、数字を入れるとtypescriptがnumber型では更新できないとエラーで教えてくれる。 */}
        <button onClick={()=>setStatus(5)}>Button</button>

{/* h4タグでinputを出力させる内容を記述する。 */}
        <h4>{input}</h4>
{/* inputのフォームを作る。inputフィールドに表示される値をinputステート内容そのものにする。
onChangeでユーザーが何らかのタイピングをする度に呼び出される関数としてonChangeHanlerを定義しておく。 */}
        <input type="text" value={input} onChange={onChangeHanler}/>
        
{/* h4タグでcounterを出力させる内容を記述する。 */}
        <h4>{counter}</h4>

{/* buttonを作り、setCounterを使いcounterを更新させる。ここでは、onClickを使い、ボタンが押された時にpreCounter(現在のステートの値)に+1した値に更新させる。 */}
        <button onClick={()=>setCounter((preCounter)=>preCounter+1)}>Increment</button>
{/* CleanUpがdisplayがtrueかfalseでマウントかアンマウントを制御する。
CleanUpコンポーネントが条件でdisplayがtrueの時にマウントされる様にする。 */}
        {display && <CleanUp/>}

{/* displayのステートをトグルするためのボタンを作る。setDisplayを使い、現在のdisplayと反転した値で更新する様にしておく。 */}
        <button onClick={()=>setDisplay(!display)}>Toggle display</button>


        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
