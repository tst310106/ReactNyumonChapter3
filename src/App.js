import React, { Component } from 'react';
import './App.css';

let theme = {
  light:{
    backgroundColor:"#eef",
    color:"#006",
    padding:"10px",
  },
  dark:{
    backgroundColor:"#006",
    color:"#eef",
    padding:"10px",
  }
};

// コンテキストオブジェクトを生成する。クラスの外側で宣言する。
// 【書き方】
// const コンテキスト名 = React.createContext(defaultValue);

// このコンテキストオブジェクトが登録されているコンポーネントをレンダーする時は、
// 最も近い上位にあるProviderコンポーネントのvalue属性で指定されたコンテキストの値を読み取る。
// 上位にProviderコンポーネントが存在しない場合は、引数defaultValueで指定された値を読み取る。
const ThemeContext = React.createContext(theme.light);

class App extends Component {
  // クラスのcontextTypeプロパティには、React.createContext()により生成された
  // コンテキストオブジェクトを指定する。
  // contextTypeを静的プロパティとして設定することで、contextTypeの初期化ができる。
  // ※静的プロパティ：クラスやコンストラクタ事態で定義され、インスタンスでは定義されない。
  // →　インスタンスとして用いるものではなく、クラス全体の機能のために使用されるもの
  // 【書き方】
  // static contextType = クラスの外側で宣言したコンテキストオブジェクト名
  static contextType = ThemeContext;

  render() {
    return (
      // this.contextを用いることで、コンテキストで指定された値を利用できる。

      // Providerコンポーネントを用いると、コンテキストの値を一時的に変更することができる。
      // Providerコンポーネントタグの中で指定したコンポーネントタグのコンテキストのみ、
      // Providerコンポーネントタグのvalue属性で指定した値が用いられる。
      // 【書き方】
      // <コンテキストオブジェクト名.Provider value={oneValue}>
      // 　～コンポーネントのタグ～
      // </ コンテキストオブジェクト名.Provider>

      // 「最初のコンポーネント」部分では、上位にProviderコンポーネントが存在しないため、
      // React.createContext(defaultValue)のdefaultValueの値がrender()時に用いられる。
      // 一方で、「次のコンポーネント」部分では、上位にProviderコンポーネントが存在するため、
      // <ThemeContext.Provider value={oneValue}>のoneValueの値がrender()時に用いられる。

      <div style={this.context}>
          <Title value="最初のコンポーネント：Content page" />
          <Message value="最初のコンポーネント：This is Content sample." />
        <ThemeContext.Provider value={theme.dark}>
          <Title value="次のコンポーネント：Content page2" />
          <Message value="この部分の表示文章を変更しました！！！" />
        </ThemeContext.Provider>
        
      </div>
    );
  }

}

class Title extends Component {
  static contextType = ThemeContext;

  render() {
    return (
      <h2 style={this.context}>{this.props.value}</h2>
    );
  }
}

class Message extends Component {
  static contextType = ThemeContext;

  render() {
    return (
      <p style={this.context}>{this.props.value}</p>
    );
  }
}

export default App;