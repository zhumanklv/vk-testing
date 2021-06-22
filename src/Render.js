//import { from } from "pumpify";
import { useState } from "react";
import emojis from './emojis';


  function autoResize(elem){
    const k = elem.target? elem.target : elem;
    k.style.height='18px';
    k.style.height=(k.scrollHeight) + 'px';
}


let recent_emojis = [];
let setEmojis = new Set();


const Render = () => {

    const [toggler, setToggler] = useState(true);
    const [ShowEmojis, setShowEmojis] = useState(false);
    const [content, setContent] = useState('');



    const a = emojis.map(obj =>{
      
        const k = obj.items.map(l =>{
            return <div className="emoji" onClick={()=> { 
                setContent(content+l);
                const textarea = document.querySelector('.text');
                autoResize(textarea);
                if(!setEmojis.has(l) && (!recent_emojis || recent_emojis.length<25)){
                  recent_emojis.push(l);
                  setEmojis.add(l);
                }else if(!setEmojis.has(l)){
                  setEmojis.delete(recent_emojis[0]);
                  setEmojis.add(l);
                  recent_emojis.shift();
                  recent_emojis.push(l);
                }
              }}>
              <div>{l}</div>
              </div>
        });
       return <div className='intro'>
          <div className="objTitle">{obj.title}</div>
          <div class="cont">
              {k}
          </div>
       </div>
    });
    let b = recent_emojis.map(obj =>{
      return <div className="emoji"><div>{obj}</div></div>
    });

    let c = <div className="intro"><div className="objTitle">Недавние</div><div className="cont">{b}</div></div>
    let to_render = toggler ? a : c;



    const emoji_content = 
      <div className='outer-emoji'>
        <div className="scroll">
        {to_render}
        </div>
        <div className="bottom-bar">
          <div className="emoji-item" onClick={()=> {setToggler(true);}}>
            <img src="icon-color.png" alt="icon-color" className="icon-color"/>
          </div>
          <div className="emoji-item-timer" onClick={()=>{ setToggler(false);}}>
            <img src="icon-color-timer.png" alt="icon-color-timer"/>
          </div>
        </div>
        </div>
    ;
    

    function handleChange(elem){
        const l = elem.target ? elem.target : elem;
        setContent(l.value);
    }
    const emoji_render  = ShowEmojis? emoji_content: <div className="when-no-emoji"></div> ; 
    return (
      <>
      {emoji_render}
      <div className="outer-text">
          <textarea onMouseEnter={(elem)=>{autoResize(elem); handleChange(elem);}}  onChange={(elem)=>{autoResize(elem); handleChange(elem);}}  value={content} placeholder="Ваше сообщение" className="text"/>
          <img src="icon-color.png" alt="emoji-button" className="text-area-emojibutton"  onClick={()=>{setShowEmojis(!ShowEmojis); setToggler(true);}}/>
      </div>
      </>
  )
};

export default Render;