const o = {
  foo: {
    bar: null
  }
};

/*
  na dannij moment optional chaining standartnim babelem ne podderzivaetsa
  nuzdo podkljuchat' plagini:
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-nullish-coalescing-operator']
  ]
*/
//console.log(o?.foo?.bar?.baz ?? 'default');