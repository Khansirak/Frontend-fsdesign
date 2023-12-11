import { Handle } from 'reactflow';


function ImgNodeController({ data, isConnectable }) {  
  return (
    <div style={{width:"200px"}}>

      <Handle type="target" position="left" id="0" style={{  top: "25%",  left:"0.5%",background: "rgba(0, 0, 0, 0)",opacity: "0"  }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="1" style={{  top: "35%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="2" style={{  top: "37%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="3" style={{  top: "45%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="4" style={{  top: "42%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="5" style={{  top: "50%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="6" style={{  top: "57%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="7" style={{  top: "60%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="8" style={{  top: "74%", left:"0.5%",  background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="9" style={{  top: "78%", left:"0.5%",  background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="10" style={{  top: "87%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} /> 
      <Handle type="target" position="left" id="11" style={{  top: "93%",  left:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} /> 

    <img src={data.image} alt="Node Image" className="img-fluid" />

      <Handle type="source" position="right" id ="12" style={{ top: "44%",  right:"0.5%",background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="13" style={{ top: "60%",  right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="14" style={{ top: "63%",  right:"0.5%",background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="15" style={{ top: "65%",  right:"0.5%",background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="16" style={{ top: "64%",  right:"0.5%",background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />

      <Handle type="source" position="right" id ="17" style={{ top: "70%", right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="18" style={{ top: "78%", right:"0.5%", background: "rgba(0, 0, 0, 0)",opacity: "0" }} isConnectable={isConnectable} />
    </div>
  );
}

export default ImgNodeController;
