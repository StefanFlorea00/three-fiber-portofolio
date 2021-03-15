import { Html } from "@react-three/drei";
import {Navbar} from "./Navbar";

import "./HtmlContent.scss";

export const HtmlContent = ({domContent}) => {
    return (
    <Html portal={domContent} fullscreen>
      <Navbar />
      <div className="front-section">
        <div className="title-div">
          <h1>Hello</h1>
          <p>This is some text </p>
          <p>This is some long long long long long long long long long long long long long long text </p>
          <div className="button-div centered">
            <button className="primary-btn">About me</button>
            <button className="primary-btn">My work</button>
          </div>
        </div>
      </div>
    </Html>
    )
  }

  export default HtmlContent;