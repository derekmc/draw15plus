
const JsonHtml = {};
// macros transform the rest of the list macro(rest, attr, data);

(function(){

  JsonHtml.toHtml = jsonToHtml;
  JsonHtml.test = test;

  function escapeAttr(s){
    return escape(s);
  }

  function attrToString(attr, data){
    let s = ""
    for(let k in attr){
      let v = escapeAttr(attr[k]);
      if(typeof v == "function"){
        v = v(data);
      }
      k = escapeAttr(k);
      s += ' "' + k + '"="' + v + '"';
      first = false;
    }
    return s;
  }

  function getAttrs(list){
    let attrs = {};
    for(let i=0; i<list.length; ++i){
      let item = list[i];
      if(typeof item === "object" && !Array.isArray(item)){
        for(let k in item){
          attrs[k] = item[k];
        }
      }
    }
    return attrs;
  }

  // TODO attributes
  function jsonToHtml(root, data){
    if(Array.isArray(root)){
      let first = root[0];
      let rest = root.slice(1);
      let attrs = getAttrs(rest);
      if(typeof first == "function"){
        // a function in the leading position is a macro
        return jsonToHtml(first(rest, attrs, data));
      } else {
        let attrstr = attrToString(attrs, data);
        let tagname = first;
        if(rest.length == 0){
          return "<" + tagname + attrstr + "/>";
        } else {
          let open = "<" + tagname + attrstr + ">";
          let close = "</" + tagname + ">";
          let middle = "";
          for(let i=0; i<rest.length; ++i){
            middle += jsonToHtml(rest[i], data);
          }
          return open + middle + close;
        }
      }
    } else if(typeof root == "string"){
      return root;
    } else if(typeof root == "function"){
      return root(data);
    } else if(typeof root == "object"){
      //skip attributes and null
      return "";
    } else if(root === undefined){
      return "";
    } else {
      return "" + root;
    }
  }

  function test(){
    let testsnippet = 
      ['div',
        ['h1', (data)=>`Hello, ${data.name}.`],
        ['hr'],
        ['button', "Click me."]];
    console.log(JsonHtml.toHtml(testsnippet, {name: "Test User"}));
  }

  if (typeof require !== 'undefined' && require.main === module) {
    test();
  }
})()
