var $messages = $('.messages-content');
var serverResponse = 'vola';

var suggession;

function listendom(no) {
  // console.log(no);
  //console.log(document.getElementById(no))
  document.getElementById('MSG').value = no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    serverMessage('Hi Welcome to Bot');
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function insertMessage(msg) {
  hiding_suggestions();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>')
    .appendTo($('.mCSB_container'))
    .addClass('new');
  fetchmsg(msg);
  updateScrollbar();
}

document.getElementById('mymsg').onsubmit = e => {
  e.preventDefault();
  let msg = e.target.firstElementChild.value;
  insertMessage(msg);
  e.target.firstElementChild.value = '';
  // serverMessage("hello");
  // speechSynthesis.speak( new SpeechSynthesisUtterance("hello"))
};

function hiding_suggestions() {
  if (document.getElementById('colaps')) {
    document.getElementById('colaps').remove();
    updateScrollbar();
  }
}

function intent_submission(intent) {
  document.getElementById('MSG').value = intent;
}
{
  /* <a href='${arr[i]}' target=blank> 
                //  </a>
*/
}
function suggestion_submission(intentname) {
  insertMessage(intentname);
  setTimeout(hiding_suggestions, 100);
}
('');
function serverMessage(response2) {
  arr = response2.split('\n');
  let result = '';
  let resto = '';
  console.log(arr);
  for (i = 0; i < arr.length; i++) {
    if (arr[i].includes('.png') == true || arr[i].includes('.jpg') == true) {
      result += `<img class=roundimg src=${arr[i]} width='auto' height=147 />
                 <br>`;
    } else if (arr[i].includes('google.com/maps/embed')) {
      result += `<iframe src=${arr[i]} width='194' height='147' frameborder=0>
                  </iframe>
                  <br>`;
    } else if (arr[i].includes('.youtube')) {
      result += `<iframe src=${arr[i]} width='194' height='147' frameborder=0 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                  </iframe>
                  <br>`;
    } else if (arr[i].includes('linkedin.com')) {
      result += `<a href=${arr[i]}target = _blank > 
      <img src=https://bit.ly/2XxBrhu alt=HTML tutorial style=width:20px;height:20px;border:0>
      </a>
      
                 `;
    } else if (arr[i].includes('#No')) {
      let intent_name = arr[i];
      intent_name = intent_name.replace('#', '');
      // console.log(intent_name);
      resto += `<button id='hide' class='thankyoubutton spacing' onclick='suggestion_submission("${intent_name}")' value='${intent_name}'>${intent_name}</button>`;
    } else if (arr[i].includes('#')) {
      let intent_name = arr[i];
      intent_name = intent_name.replace('#', '');

      let name = intent_name;
      // console.log(intent_name);
      resto += `<button id='hide' class='suggestionbutton spacing' 
        onclick='suggestion_submission("${intent_name}")' value='${intent_name}'>${name}</button>`;
    } else {
      result += `${arr[i]} <br/>`;
    }
  }

  if ($('.message-input').val() != '') {
    return false;
  }

  $(`<div class="message loading new">
         <figure class="avatar">
            <img src="./media/bot.jpg" />
         </figure>
         <span></span>
      </div>`).appendTo($('.mCSB_container'));
  updateScrollbar();
  setTimeout(function() {
    $('.message.loading').remove();
    $(`<div class="message new">
         <figure class="avatar">
            <img src="./media/bot.jpg" />
         </figure>
         ${result}
       `)
      .appendTo($('.mCSB_container'))
      .addClass('new');
    if (resto != '') {
      $(`</div>
         <div id=colaps class="suggesbutton new">
            ${resto}
         </div>`)
        .appendTo($('.mCSB_container'))
        .addClass('new');
    }

    updateScrollbar();
  }, 100 + Math.random() * 20 * 10);
}

function fetchmsg(msg) {
  var url = '/send-msg';
  const data = new URLSearchParams();
  data.append('MSG', msg);
  console.log(data);
  console.log('abc', data);
  fetch(url, {
    method: 'POST',
    body: data
  })
    .then(res => res.json())
    .then(response => {
      console.log('response', response);
      serverMessage(response.Reply);
      console.log(response.Reply);
    })
    .catch(error => console.error('Error :', error));
}
