var e={table:{book_do:"在读",book_wish:"想读",book_collect:"读过",movie_do:"在看",movie_wish:"想看",movie_collect:"看过",game_do:"在玩",game_wish:"想玩",game_collect:"玩过",song_do:"在听",song_wish:"想听",song_collect:"听过",first_page:"首页",prev_page:"上一页",next_page:"下一页",last_page:"末页"},t(e){return this.table[e]}},t={data_user:null,data_items:{do:null,wish:null,collect:null},node:null,options:{selector:"#idouban",type:"book",douban_id:162448367,page_size:10}};function a(e){let t=document.createElement("div");t.className="idouban-item";let a=document.createElement("div");a.className="idouban-picture";let n=document.createElement("img");n.src=e.img,n.loading="lazy",n.referrerPolicy="no-referrer",a.append(n);let i=document.createElement("div");i.className="idouban-info";let o=document.createElement("div");o.className="idouban-title";let s=document.createElement("a");s.href=e.link,s.target="_blank",s.textContent=e.title,o.append(s);let r=document.createElement("div");r.className="idouban-meta",r.textContent=e.meta;let m=document.createElement("div");m.className="idouban-rating",m.textContent=e.rating;let c=document.createElement("div");return c.className="idouban-comment",c.textContent=e.comment,i.append(o,r,m,c),t.append(a,i),t}var n={page_num:0,page_max:0,page_size:0,data:[],action:"",switch_action(e){e!==this.action&&(this.action=e,this.data=t.data_items[e],this.page_size=t.options.page_size,this.page_max=Math.floor((this.data.length-1)/this.page_size)+1,this.render_list(1))},render_list(e){this.page_num=e,document.querySelector(".idouban-page-num").textContent=`${this.page_num} / ${this.page_max}`;let t=document.querySelector(".idouban-items");t.innerHTML="";for(let n=(e-1)*this.page_size;n<Math.min(e*this.page_size,this.data.length);n++)t.append(a(this.data[n],this.action))}};function i(...e){let t=[];for(let a of e)a&&t.push(a);return t.join(" / ")}function o(e){switch(e){case 1:return"★☆☆☆☆ 很差";case 2:return"★★☆☆☆ 较差";case 3:return"★★★☆☆ 还行";case 4:return"★★★★☆ 推荐";case 5:return"★★★★★ 力荐";default:return""}}function s(e,t){switch(t){case"book":return function(e){let t=[];for(let a of e)t.push({img:a.item.thumbnail,link:"https://book.douban.com/subject/"+a.item.douban_id+"/",title:a.item.title,meta:i(a.item.author,a.item.translator,a.item.press,a.item.producer),rating:i(a.mark_date,a.label,o(a.rate)),comment:a.comment});return t}(e);case"movie":return function(e){let t=[];for(let a of e)t.push({img:a.item.thumbnail,link:"https://movie.douban.com/subject/"+a.item.douban_id+"/",title:a.item.title,meta:i(a.item.style,a.item.director,a.item.writer,a.item.actor,a.item.publish_date),rating:i(a.mark_date,a.label,o(a.rate)),comment:a.comment});return t}(e);case"game":return function(e){let t=[];for(let a of e)t.push({img:a.item.thumbnail,link:"https://www.douban.com/game/"+a.item.douban_id+"/",title:a.item.title,meta:i(a.item.platform,a.item.genre,a.item.developer,a.item.publisher),rating:i(a.mark_date,a.label,o(a.rate)),comment:a.comment});return t}(e);case"song":return function(e){let t=[];for(let a of e)t.push({img:a.item.thumbnail,link:"https://music.douban.com/subject/"+a.item.douban_id+"/",title:a.item.title,meta:i(a.item.alias,a.item.musician,a.item.album_type,a.item.genre,a.item.media,a.item.publisher,a.item.publish_date),rating:i(a.mark_date,a.label,o(a.rate)),comment:a.comment});return t}(e)}}var r={request_user:()=>fetch(`https://mouban.mythsman.com/guest/check_user?id=${t.options.douban_id}`).then((e=>e.json())).then((e=>{e.success?t.data_user=e.result:console.error(e.msg)})),request_item:(e,a,n)=>fetch(`https://mouban.mythsman.com/guest/user_${a}?id=${e}&action=${n}`).then((e=>e.json())).then((e=>{e.success?t.data_items[n]=s(e.result.comment,a):console.error(e.msg)}))};const m=["book","movie","game","song"],c=["do","wish","collect"];async function l(e,a){for(let t of e.parentNode.childNodes)t.classList.contains("idouban-tab-"+a)?t.classList.add("idouban-tab-active"):t.classList.remove("idouban-tab-active");t.data_items[a]||await r.request_item(t.options.douban_id,t.options.type,a),n.switch_action(a)}window.idouban={items:t.data_items,user:t.data_user,init:async function(a){t.options=Object.assign(t.options,a),t.options.douban_id?m.includes(t.options.type)?(t.node=document.querySelector(t.options.selector),t.node?(await r.request_user(),t.data_user&&(t.node.append(function(a){let n=document.createElement("div");n.className="idouban-tabs";for(let i of c){let o=document.createElement("a");o.className="idouban-tab",o.href="javascript:",o.classList.add("idouban-tab-"+i),o.onclick=()=>l(o,i),o.text=e.t(a+"_"+i)+`(${t.data_user[a+"_"+i]})`,n.append(o)}return n}(t.options.type)),t.node.append(function(){let e=document.createElement("div");return e.className="idouban-items",e}()),t.node.append(function(){let t=document.createElement("div");t.className="idouban-pagination";let a=document.createElement("a");a.classList.add("idouban-button","idouban-first-page"),a.href="javascript:",a.text=e.t("first_page"),a.onclick=()=>n.render_list(1),t.append(a);let i=document.createElement("a");i.classList.add("idouban-button","idouban-prev-page"),i.href="javascript:",i.text=e.t("prev_page"),i.onclick=()=>n.render_list(Math.max(1,n.page_num-1)),t.append(i);let o=document.createElement("span");o.className="idouban-page-num",o.innerText="1 / 1",t.append(o);let s=document.createElement("a");s.classList.add("idouban-button","idouban-next-page"),s.href="javascript:",s.text=e.t("next_page"),s.onclick=()=>n.render_list(Math.min(n.page_num+1,n.page_max)),t.append(s);let r=document.createElement("a");return r.classList.add("idouban-button","idouban-last-page"),r.href="javascript:",r.text=e.t("last_page"),r.onclick=()=>n.render_list(n.page_max),t.append(r),t}()),document.querySelectorAll(".idouban-tab")[2].click())):console.error("root selector not found")):console.error(`type invalid for ${t.options.type}`):console.error(`douban_id invalid for ${t.options.type}`)}};
