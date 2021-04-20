// rafceのテンプレートのショートカットを使い、reactのアロー関数のFCコンポーネントの形を呼び出す。
import React, { useState, useEffect } from 'react'
import { increment } from './features/counter/counterSlice';

// CleanUp関数もTSなのでReact.FCと型を付けておく。
const CleanUp: React.FC = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const incrementNum = () =>{

// イベントが呼び出されたことが分かる様にメッセージを出力させる。
    console.log("Mouse Event invoked !");

// イベントが呼び出される度にsetCurrentNumを使い、currentNumを+1させる。
    setCurrentNum((preNumber) => preNumber + 1);
  };

  useEffect(() => {
    console.log("useEffect in CleanUp invoked !")
    
// addEventListenerを使い、ユーザーがマウスをクリックした時に起こるイベントを設定。
// ここでは、incrementNumと言う関数が実行される。
    window.addEventListener("mousedown", incrementNum);


    return() => {
// CleanUpが実行されたことがわかる様に、メッセージを出力。
      console.log("Cleanup invoked !");

// アンマウントされた時にイベントが実行されない様に、removeEventListenerを定義する。
      window.removeEventListener("mousedown", incrementNum);
    };

// addEventListenerは1回だけイベントが起こればいいので、第2引数は空の[]のまま。
  }, [])
  return <div>{currentNum}</div>;
};

export default CleanUp
