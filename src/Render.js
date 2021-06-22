import { useEffect, useState } from "react";
import emojis from './emojis';


  function autoResize(elem){
    const k = elem.target? elem.target : elem;
    k.style.height='18px';
    k.style.height=(k.scrollHeight) + 'px';
}


let recent_emojis = [];
let setEmojis = new Set();


const Render = () => {

    const [toggler, setToggler] = useState(true); //переключаться между недавними и всеми смайликами
    const [ShowEmojis, setShowEmojis] = useState(false); // нажатие на иконку справа поле ввода
    const [content, setContent] = useState(''); // само сообщение

    useEffect(()=>{
      autoResize(document.querySelector(".text"));
    }, [content]);

   
    function rendering(arr){   //rendering emojis in an emoji div
      return arr.map(l =>{
        return <div className="emoji" onClick={()=> {   // нажатие на смайлик
            setContent(content+l);
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
    }

    const a = emojis.map(obj =>{  // массив смайликов из файла emojis.js
       
        const k = rendering(obj.items);

       return <div className='intro'>
          <div className="objTitle">{obj.title}</div>
          <div class="cont">
              {k}
          </div>
       </div>
    });

    let b = rendering(recent_emojis);  // рендерить смайлики в недавном

    let c = <div className="intro"><div className="objTitle">Недавние</div><div className="cont">{b}</div></div>
    let isGeneral = toggler ? a : c;  // показывать или общие смайлики или недавние



    const emoji_content = 
      <div className='outer-emoji'>
        <div className="scroll">
        {isGeneral} 
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
    const emoji_render  = ShowEmojis? emoji_content: <div className="when-no-emoji"></div> ;  // показывать/не показывать окно смайликов 
    return (
      <>
      {emoji_render}
      <div className="outer-text">  {/*   поле сообщений */}
          <textarea  onChange={(e)=> {handleChange(e); autoResize(e);}} value={content} placeholder="Ваше сообщение" className="text"/>
          <img src="icon-color.png" alt="emoji-button" className="text-area-emojibutton"  onClick={()=>{setShowEmojis(!ShowEmojis); setToggler(true);}}/>
      </div>
      </>
  )
};

export default Render;