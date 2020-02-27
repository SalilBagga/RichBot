// chatbot
window.addEventListener('load', () => {
  const chatbox = document.getElementById('chatbox'),
    launcher = document.getElementById('launch-button'),
    header = document.getElementById('chatbox-header-id');
  launcher.addEventListener('click', function() {
    console.log(chatbox.classList);
    chatbox.classList.toggle('show');
    setTimeout(function() {
      //header.classList.toggle("show");
    }, 100);
  });
});
