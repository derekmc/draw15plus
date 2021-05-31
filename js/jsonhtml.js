
const JsonHtml = {};

(function(){

  JsonHtml.toHtml = jsonToHtml;
  JsonHtml.test = test;

  function escapeAttr(s){
    return escape(s);
  }

  function attrToString(attr, data){
    let s = ""
    let first = true;
    for(let k in attr){
      let v = escapeAttr(attr[k]);
      if(typeof v == "function"){
        v = v(data);
      }
      k = escapeAttr(k);
      if(!first) s += " ";
      s += '"' + k + '"="' + v + '"';
      first = false;
    }
    return s;
  }

  function getAttrs(list){
    let attrs = {};
    for(let i=0; i<list.length; ++i){
      let item = list[i];
      if(typeof item === "object"){
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
      let rest = rest.slice(1);
      let attrs = getAttrs(list);
      let attrstr = attrToString(getAttrs(list), data);
      if(typeof first == "function"){
        // a function in the leading position is a macro
        return jsonToHtml(first(rest, attrs, data));
      } else {
        let open = "<" + tagname 
        let close = "<" + 
        let middle = "";
        for(let i=0; i<rest.length; ++i){
          middle += jsonToHtml(rest[i], data);
        }
        return open + middle + close;
      }
    } else if(typeof root == "string"){
      return root;
    } else if(typeof root == "function"){
      return root(data);
    } else if(){
    }
  }

  function test(){

  }
})()
