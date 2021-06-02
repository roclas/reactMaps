import context from './Context';

function SearchInput(props) {
  const keypress=(k)=>{
	  if(k.code=="Enter"){ search(k) }
  }
  const search=(e)=>{
	  let el=e.target.parentNode.getElementsByTagName('input')[0];
	  if(!el.value)return;
	  context.searchAddress=el.value+" ,London, UK";
	  el.value="";
	  props.refreshParent(context.nOfRefreshes++);
  }
  return (
    <span style={{zIndex:9999999999, position:"relative", width:"100%",backgroundColor:"red"}}>
	<input type="text" style={{float:"left"}} onKeyPress={keypress} placeholder="search address or postcode"/>
	<button style={{float:"right"}} onClick={search} >Search</button>
    </span>
  );
}

export default SearchInput;
