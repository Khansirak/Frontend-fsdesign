import { Handle } from 'reactflow';


function ImgNode({ data, isConnectable }) {  
  return (
    <div style={{width:"200px"}}>

      {/* <Handle type="target" position="left" id="16" style={{   bottom: "0%", backgroundColor:"black", opacity: "0", left:"0.5%" }} isConnectable={isConnectable} /> */}
      {/* <Handle type="target" position="left" id="18" style={{  top: "10%",  left:"0.5%" }} isConnectable={isConnectable} /> */}
      <Handle type="target" position="left" id="0" style={{  top: "20%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="1" style={{  top: "30%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="2" style={{  top: "39%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="19" style={{  top: "47%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="3" style={{  top: "57%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="3" style={{  top: "60%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />

      {/* <Handle type="target" position="left" id="25" style={{  top: "65%",  left:"0.5%" }} isConnectable={isConnectable} />      */}
      <Handle type="target" position="left" id="4" style={{  top: "70%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="24" style={{  top: "73%", left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      
      <Handle type="target" position="left" id="5" style={{  top: "82%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="6" style={{  top: "85%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="15" style={{  top: "89%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
    <img src={data.image} alt="Node Image" className="img-fluid" />
      {/* <Handle type="source" position="right" id ="7"  style={{ bottom: "0%", right:"0.5%"}} isConnectable={isConnectable} /> */}
      {/* <Handle type="source" position="right" id ="20" style={{ top: "10%",  right:"0.5%" }} isConnectable={isConnectable} /> */}
      <Handle type="source" position="right" id ="8" style={{ top: "23%",  right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="9" style={{ top: "30%",  right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="13" style={{ top: "40%",  right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="21" style={{ top: "48%",  right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="10" style={{ top: "60%",  right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      {/* <Handle type="source" position="right" id ="14" style={{ top: "70%",  right:"0.5%" }} isConnectable={isConnectable} /> */}
      {/* <Handle type="source" position="right" id ="23" style={{ top: "65%",  right:"0.5%" }} isConnectable={isConnectable} /> */}

      {/* <Handle type="source" position="right" id ="22" style={{ top: "77%", right:"0.5%" }} isConnectable={isConnectable} /> */}
      <Handle type="source" position="right" id ="11" style={{ top: "80%",  right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="17" style={{ top: "87%", right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      {/* <Handle type="source" position="right" id ="12" style={{ top: "95%", right:"0.5%" }} isConnectable={isConnectable} />  */}
    </div>
  );
}

export default ImgNode;
