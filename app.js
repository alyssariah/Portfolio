
//setting up hamburger navigation
let $nav = $("#nav")

$nav.click(function(){
  $("ul").toggleClass('nav-active')
}
)
$("nav a").click(function(){
  $("ul").removeClass('nav-active')
})

let $projects = $("#projects")
//getting data from json
let url = 'https://docs.google.com/spreadsheets/d/1rSCXAKx7Pvd_FTYy3JIBdVTJTm-KZongre1eOOFiX9Y/edit#gid=0'
let id = '1rSCXAKx7Pvd_FTYy3JIBdVTJTm-KZongre1eOOFiX9Y'


//send form information to me
const scriptURL = 'https://script.google.com/macros/s/AKfycbyjIGR7Ik6C6VjPKEFm3eMPILBxsrusSwrmPP2PfE81vsJ06IjX/exec'
const $form = $('form')

$form.submit(e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData($form[0])})
    .then(response => {console.log('Success!', response);$form[0].reset();alert("Your message has been sent!")})
    .catch(error => console.error('Error!', error.message))
})

let source = `https://spreadsheets.google.com/feeds/list/1rSCXAKx7Pvd_FTYy3JIBdVTJTm-KZongre1eOOFiX9Y/od6/public/values?alt=json`
fetch(source)
  .then( response => response.json() ) // this parses the data from string back into an object
  .then( data => {
   console.log('data', data)
  //data.feed.entry is the array that stores our projects
   let project = data.feed.entry.map( project =>{
     // console.log('project', project.gsx$title.$t)
     return {
       title: project.gsx$title.$t,
       image: project.gsx$image.$t,
       descrip: project.gsx$description.$t,
       url: project.gsx$url.$t
     }
   })
   app(project)
})
function app(project) {
  for(j=0; j<6; j++){
    let $a = $("<a>")
    $a.attr('href', project[j].url).attr('target', '_blank').css('text-decoration', 'none')
    $projects.append($a)
    let $div = $("<div>")
    $div.css("background-image", `url('${project[j].image}')`)
    $div.addClass('background')
    $a.append($div)
    let $divj = $("<section>")
    $divj.addClass('hover')
    let $h3 = $("<h3>")
    $h3.html(project[j].title)
    let $p = $("<p>")
    $p.html(project[j].descrip)
    let $b = $("<button>")
    $b.html("View Project")
    $b.addClass('button')
    $divj.append($h3).append($p).append($b)
    if (window.matchMedia('(max-width: 768px)').matches) {
      $div.prepend($divj)
    }
    $div.hover(function(){
      $div.prepend($divj)

    },
    function(){$div.empty($divj)
    })
  }
}

// the following code is from https://tobiasahlin.com/moving-letters/#6
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline()
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 200
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easein",
    delay: 1000
  });



// the following code is from https://jsfiddle.net/cse_tushar/Dxtyu/141/
  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        // e.preventDefault();
        $(document).off("scroll");

        $('nav a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

