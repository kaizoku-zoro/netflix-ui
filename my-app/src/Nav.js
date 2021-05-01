import React,{useEffect,useState} from 'react'
import "./Nav.css"
function Nav() {
    const [show,handleShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true)
            }
            else{
                handleShow(false)
            }
        });
        return ()=>{
            window.removeEventListener("scroll",()=>{
                if(window.scrollY>100){
                    handleShow(true)
                }
                else{
                    handleShow(false)
                }
            });
        };
    },[]);
    return (
        <div className={`nav ${show && "nav_black"}`}>
            
            <img className="nav_logo" src="https://fontmeme.com/permalink/210426/393abcbfab08bb13cd28da5d8ce8f255.png" alt="nikflix-logo" border="0"></img>
            <a href="https://www.linkedin.com/in/nikunj-s-000784191/"><img className="nav_icon" src="https://image.flaticon.com/icons/png/512/174/174857.png"></img></a>
        </div>
    )
}

export default Nav
