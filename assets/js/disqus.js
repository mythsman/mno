function disqus_init(config) {
    let link = config.link;
    let btn = config.btn;

    document.querySelector(btn).addEventListener('click', () =>{
        document.querySelector(btn).classList.add('hidden');
        show_disqus();
    });

    function hide_ads() {
        setInterval(() =>{
            let iframes = document.getElementsByTagName('iframe');
	    for (let idx in iframes) {
                let iframe = iframes[idx];
                if (iframe.title === 'Disqus' && !iframe.src) {
                    iframe.parentElement.removeChild(iframe)
                }
            }
        },
        1000)
    }

    function show_disqus_btn() {
        console.log("Facebook contected , disqus is shown.");
        document.querySelector(btn).classList.remove('hidden');
    }

    function show_disqus() {
        let d = document,
        s = d.createElement('script');
        s.defer = "defer";
	s.src = link;
	s.setAttribute('data-timestamp', +new Date()); 
	(d.head || d.body).appendChild(s);
        hide_ads();
    }

    function hide_disqus_btn() {
        console.log("GFW detected , disqus is hidden.");
    }


    fetchRequest("https://graph.facebook.com/feed?callback=h", {}, 1000)
      .then(res =>{
        if (res.status === 200) {
            show_disqus_btn();
        } else {
            hide_disqus_btn();
        }
      }).catch(e =>{
        hide_disqus_btn();
      })
}
